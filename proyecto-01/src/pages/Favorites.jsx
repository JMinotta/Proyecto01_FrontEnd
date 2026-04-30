import { useState, useRef } from "react";
import { Link } from "react-router";
import { MdStarBorder, MdStar } from "react-icons/md";
import { useFavorites } from "../context/FavoritesContext";
import { useToast } from "../context/ToastContext";
import ConfirmModal from "../components/ConfirmModal";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();
  const { addToast } = useToast();

  const modalRef = useRef(null);
  const [pendingAnime, setPendingAnime] = useState(null);

  const handleOpenModal = (anime) => {
    setPendingAnime(anime);
    modalRef.current?.open();
  };

  const handleRemove = () => {
    if (!pendingAnime) return;

    removeFavorite(pendingAnime.mal_id);
    addToast(`"${pendingAnime.title}" eliminado de favoritos`, "info");
    setPendingAnime(null);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-6">
        Mis <span className="text-red-500">Favoritos</span>
      </h1>
      {favorites.length === 0 && (
        <div className="text-center mt-20">
          <div className="flex justify-center mb-4">
            <MdStarBorder size={100} color="gray" />
          </div>
          <p className="text-gray-400 mb-4">No tienes favoritos aún</p>
          <Link
            to="/explorar"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
          >
            Explorar animes
          </Link>
        </div>
      )}
      {favorites.length > 0 && (
        <>
          <p className="text-gray-600 mt-4">
            Tienes {favorites.length}{" "}
            {favorites.length === 1 ? "anime favorito" : "animes favoritos"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favorites.map((anime) => (
              <div
                key={anime.mal_id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <Link to={`/explorar/${anime.mal_id}`}>
                  <img
                    src={anime.images?.jpg?.image_url}
                    alt={anime.title}
                    className="w-full h-[250px] object-cover"
                  />
                </Link>

                <div className="p-3 text-center">
                  <h3 className="text-sm font-semibold">{anime.title}</h3>

                  <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
                    <MdStar size={14} /> {anime.score || "N/A"}
                  </p>

                  <button
                    onClick={() => handleOpenModal(anime)}
                    className="mt-3 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-full"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <ConfirmModal
        ref={modalRef}
        title="¿Eliminar favorito?"
        message={`¿Seguro que quieres quitar "${pendingAnime?.title ?? ""}"?`}
        confirmLabel="Sí, quitar"
        cancelLabel="Cancelar"
        onConfirm={handleRemove}
      />
    </section>
  );
}
