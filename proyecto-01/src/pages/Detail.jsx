import { useParams, useNavigate } from "react-router";
import { useFetch } from "../hooks/useFetch";
import { useFavorites } from "../context/FavoritesContext";
import { useToast } from "../context/ToastContext";
import { useState } from "react";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    `https://api.jikan.moe/v4/anime/${id}`
  );

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { addToast } = useToast();

  const [showModal, setShowModal] = useState(false);

  const anime = data?.data;
  const fav = anime ? isFavorite(anime.mal_id) : false;

 
  const handleFavClick = () => {
    if (!anime) return;

    if (fav) {
      setShowModal(true); 
    } else {
      addFavorite(anime);
      addToast(`"${anime.title}" agregado a favoritos`);
    }
  };

  const confirmRemove = () => {
    removeFavorite(anime.mal_id);
    addToast(`"${anime.title}" eliminado de favoritos`);
    setShowModal(false);
  };

  return (
    <section className="bg-[#0f172a] text-white py-16 px-4 min-h-screen">

      <button
        onClick={() => navigate("/explorar")}
        className="bg-[#e94560] px-6 py-2 rounded-full font-semibold hover:opacity-90 transition mb-6"
      >
        ← Volver
      </button>

      {loading && <p className="text-center">Cargando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && anime && (
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          <div>
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="w-full max-w-[280px] mx-auto object-cover rounded-xl"
            />

            <button
              onClick={handleFavClick}
              className={`mt-4 w-full py-2 rounded-lg font-semibold transition ${
                fav
                  ? "bg-gray-600 hover:bg-gray-500"
                  : "bg-[#e94560] hover:bg-[#ff2e63]"
              }`}
            >
              {fav ? "Quitar de favoritos" : "Agregar a favoritos"}
            </button>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">
              {anime.title}
            </h1>

            <p className="text-sm text-gray-400 mb-4">
              {anime.title_english}
            </p>

            <div className="flex gap-4 flex-wrap mb-6">
              <span className="bg-[#1a1a2e] px-3 py-1 rounded">
                ⭐ {anime.score || "N/A"}
              </span>
              <span className="bg-[#1a1a2e] px-3 py-1 rounded">
                📺 {anime.episodes || "?"} eps
              </span>
              <span className="bg-[#1a1a2e] px-3 py-1 rounded">
                🏆 #{anime.rank || "?"}
              </span>
            </div>

            <div className="text-sm text-gray-300 space-y-2 mb-6">
              <p><strong>Estado:</strong> {anime.status}</p>
              <p><strong>Tipo:</strong> {anime.type}</p>
              <p><strong>Año:</strong> {anime.year}</p>
              <p><strong>Duración:</strong> {anime.duration}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {anime.genres.map((g) => (
                <span
                  key={g.mal_id}
                  className="bg-[#1a1a2e] px-2 py-1 rounded text-xs"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              {anime.synopsis}
            </p>
          </div>
        </div>
      )}

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-white text-black rounded-lg p-6 w-[300px] text-center">
            <h2 className="font-bold text-lg mb-3">
              ¿Eliminar favorito?
            </h2>

            <p className="text-sm text-gray-600 mb-5">
              ¿Seguro que quieres quitar "{anime?.title}"?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 rounded bg-gray-300"
              >
                Cancelar
              </button>

              <button
                onClick={confirmRemove}
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Sí, quitar
              </button>
            </div>
          </div>

        </div>
      )}

    </section>
  );
}

export default Detail;