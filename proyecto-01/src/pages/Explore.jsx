import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import {
  MdSearch,
  MdStar,
  MdAutorenew,
  MdErrorOutline,
  MdSearchOff,
} from "react-icons/md";

const GENRES = [
  { id: "", label: "Todos los géneros" },
  { id: "1", label: "Action" },
  { id: "2", label: "Adventure" },
  { id: "4", label: "Comedy" },
  { id: "8", label: "Drama" },
  { id: "10", label: "Fantasy" },
  { id: "22", label: "Romance" },
  { id: "24", label: "Sci-Fi" },
  { id: "37", label: "Supernatural" },
  { id: "7", label: "Mystery" },
];
function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [genre, setGenre] = useState(searchParams.get("genre") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [total, setTotal] = useState(0);

  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  useEffect(() => {
    setSearchParams({
      q: query,
      genre: genre,
      page: page,
    });
  }, [query, genre, page]);
  const fetchAnimes = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = `https://api.jikan.moe/v4/anime?page=${page}`;

      if (query) url += `&q=${query}`;
      if (genre) url += `&genres=${genre}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Error al cargar datos");

      const data = await res.json();
      setTotal(data.pagination?.items?.total || 0);
      setAnimes(data.data || []);
      setHasNext(data.pagination?.has_next_page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchAnimes();
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, genre, page]);

  return (
    <section className="bg-[#f8f9fa] py-20 px-4 text-center">
      <h2 className="text-3xl font-bold text-[#0f172a]">Explorar Anime</h2>
      <p className="text-sm text-[#777] mt-3 flex items-center justify-center gap-1">
        Busca y filtra animes en tiempo real <MdSearch size={16} />
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
        <input
          type="text"
          placeholder="Buscar anime..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className="p-2 px-4 rounded-lg border w-[250px]"
        />
        <select
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            setPage(1);
          }}
          className="p-2 px-4 rounded-lg border"
        >
          {GENRES.map((g) => (
            <option key={g.id} value={g.id}>
              {g.label}
            </option>
          ))}
        </select>
      </div>
      {!loading && !error && total > 0 && (
        <p className="mt-4 text-sm text-[#777]">
          Mostrando {(page - 1) * animes.length + 1} - {page * animes.length} de{" "}
          {total}
        </p>
      )}
      {loading && (
        <div className="mt-10 text-[#777]  min-h-[calc(100vh-480px)] flex flex-col items-center gap-2">
          <MdAutorenew size={32} className="animate-spin" />
          <p>Cargando...</p>
        </div>
      )}

      {error && (
        <div className="mt-10 text-[#e94560] p-3 rounded min-h-[calc(100vh-480px)] flex flex-col items-center justify-center">
          <MdErrorOutline size={48} />
          <p className="mt-2">{error}</p>
        </div>
      )}
      {!loading && !error && animes.length === 0 && (
        <div className="mt-10 text-center text-[#777] min-h-[calc(100vh-480px)] flex flex-col items-center justify-center">
          <MdSearchOff size={48} />
          <p className="mt-2">Sin resultados</p>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-6 mt-12">
        {!loading &&
          !error &&
          animes.map((anime) => (
            <Link
              key={anime.mal_id}
              to={`/explorar/${anime.mal_id}`}
              className="bg-white w-[200px] rounded-lg shadow overflow-hidden hover:scale-105 hover:shadow-lg transition block"
            >
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-[250px] object-cover"
              />

              <div className="p-3">
                <h3 className="text-sm font-semibold">{anime.title}</h3>

                <p className="text-xs text-[#777] mt-1 flex items-center gap-1">
                  <MdStar size={12} color="#fbbf24" /> {anime.score || "N/A"}
                </p>
              </div>
            </Link>
          ))}
      </div>

      {!loading && !error && animes.length > 0 && (
        <div className="mt-12 flex justify-center items-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="font-semibold text-[#0f172a]">Página {page}</span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasNext}
            className="px-4 py-2 bg-[#e94560] text-white rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </section>
  );
}

export default Explore;
