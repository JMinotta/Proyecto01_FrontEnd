import { useParams, useNavigate } from "react-router";
import {
  MdArrowBack,
  MdStar,
  MdTv,
  MdEmojiEvents,
} from "react-icons/md";
import { useFavorites } from "../context/favoritesContext";
import { useToast } from "../context/toastContext";
import { useRef, useState, useEffect } from "react";
import ConfirmModal from "../components/confirmModal";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { addToast } = useToast();

  const modalRef = useRef(null);

  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fav = anime ? isFavorite(anime.mal_id) : false;

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        if (!res.ok) throw new Error("Error al cargar el anime");

        const data = await res.json();
        setAnime(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  const handleFavClick = () => {
    if (!anime) return;

    if (fav) {
      modalRef.current?.open(); 
    } else {
      addFavorite(anime);
      addToast(`"${anime.title}" agregado a favoritos`, "success");
    }
  };

  const confirmRemove = () => {
    removeFavorite(anime.mal_id);
    addToast(`"${anime.title}" eliminado de favoritos`, "info");
  };

  return (
    <section className="bg-[#0f172a] text-white py-16 px-4 min-h-screen">
      
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 bg-[#e94560] px-6 py-2 rounded-full font-semibold hover:opacity-90 transition mb-6"
        aria-label="Volver a explorar"
      >
        <MdArrowBack size={18} /> Volver
      </button>

      {loading && <p className="text-center">Cargando...</p>}

      {error && (
        <p className="text-center text-red-500">{error}</p>
      )}

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
              aria-label="Agregar o quitar de favoritos"
            >
              {fav ? "Quitar de favoritos" : "Agregar a favoritos"}
            </button>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">
              {anime.title}
            </h1>

            <p className="text-sm text-gray-400 mb-4">
              {anime.title_english || anime.title}
            </p>

            <div className="flex gap-4 flex-wrap mb-6">
              <span className="bg-[#1a1a2e] px-3 py-1 rounded flex items-center gap-1">
                <MdStar size={16} /> {anime.score || "N/A"}
              </span>
              <span className="bg-[#1a1a2e] px-3 py-1 rounded flex items-center gap-1">
                <MdTv size={16} /> {anime.episodes || "?"} eps
              </span>
              <span className="bg-[#1a1a2e] px-3 py-1 rounded flex items-center gap-1">
                <MdEmojiEvents size={16} /> #{anime.rank || "?"}
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

      <ConfirmModal
        ref={modalRef}
        title="¿Eliminar favorito?"
        message={`¿Seguro que quieres quitar "${anime?.title ?? ""}"?`}
        confirmLabel="Sí, quitar"
        cancelLabel="Cancelar"
        onConfirm={confirmRemove}
      />
    </section>
  );
}

export default Detail;