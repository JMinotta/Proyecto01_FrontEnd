import { useState, useEffect } from "react";
import { Link } from "react-router";

const GENRES = [
  { id: "", label: "Todos" },
  { id: "1", label: "Action" },
  { id: "4", label: "Comedy" },
  { id: "8", label: "Drama" },
  { id: "22", label: "Romance" },
];

function Explore() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);

  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasNext, setHasNext] = useState(true);

  const fetchAnimes = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = `https://api.jikan.moe/v4/anime?limit=12&page=${page}`;

      if (query) url += `&q=${query}`;
      if (genre) url += `&genres=${genre}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Error al cargar datos");

      const data = await res.json();

      setAnimes(data.data || []);
      setHasNext(data.pagination?.has_next_page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimes();
  }, [query, genre, page]);

  return (
    <section className="bg-[#f8f9fa] py-16 px-4 text-center">
      
      <h2 className="text-3xl font-bold text-[#0f172a]">
        Explorar Anime
      </h2>

      <p className="text-sm text-[#777] mt-3">
        Busca y filtra animes en tiempo real
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


      {loading && (
        <p className="mt-10 text-[#777]">Cargando...</p>
      )}

      {error && (
        <p className="mt-10 text-red-500">{error}</p>
      )}

      {!loading && !error && animes.length === 0 && (
        <p className="mt-10 text-[#777]">Sin resultados</p>
      )}

   
      <div className="flex flex-wrap justify-center gap-6 mt-12">
        
        {!loading && !error && animes.map((anime) => (
          
          <Link
            key={anime.mal_id}
            to={`/anime/${anime.mal_id}`}
            className="bg-white w-[200px] rounded-lg shadow overflow-hidden hover:scale-105 hover:shadow-lg transition block"
          >
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className="w-full h-[250px] object-cover"
            />

            <div className="p-3">
              <h3 className="text-sm font-semibold">
                {anime.title}
              </h3>

              <p className="text-xs text-[#777] mt-1">
                ⭐ {anime.score || "N/A"}
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

          <span className="font-semibold text-[#0f172a]">
            Página {page}
          </span>

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