import { Link } from "react-router";

export default function Home() {
  return (
    <main>
      <section className="bg-gradient-to-br from-[#0f172a] via-[#0f2444] to-[#0a3060] text-white min-h-[80vh] flex items-center">
        <div className="max-w-6xl mx-auto px-4 text-center">
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Descubre el{" "}
            <span className="text-[#e94560]">Universo</span> Anime
          </h1>

          <p className="text-[#aaaaaa] text-lg max-w-xl mx-auto mb-8">
            Explora miles de series, busca tus favoritas y guárdalas en un solo lugar.
            Datos en tiempo real desde la API de Jikan.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/explorar"
              className="bg-[#e94560] px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
            >
              Explorar ahora
            </Link>

            <Link
              to="/favoritos"
              className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition"
            >
              Mis favoritos
            </Link>
          </div>

        </div>
      </section>

      <section className="bg-[#111] text-center py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          
          <div>
            <p className="text-3xl text-[#e94560] font-bold">30,000+</p>
            <p className="text-[#777] text-sm">Series disponibles</p>
          </div>

          <div>
            <p className="text-3xl text-[#e94560] font-bold">30+</p>
            <p className="text-[#777] text-sm">Géneros</p>
          </div>

          <div>
            <p className="text-3xl text-[#e94560] font-bold">Jikan</p>
            <p className="text-[#777] text-sm">Fuente de datos</p>
          </div>

          <div>
            <p className="text-3xl text-[#e94560] font-bold">Gratis</p>
            <p className="text-[#777] text-sm">Acceso</p>
          </div>

        </div>
      </section>

      <section className="bg-[#f8f9fa] py-16">
        <h2 className="text-3xl text-center mb-10 font-bold">
          ¿Qué puedes hacer?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          
          <div className="bg-white p-6 rounded-lg shadow flex flex-col gap-3">
            <span className="text-3xl">🔍</span>
            <h3 className="font-semibold">Buscar y filtrar</h3>
            <p className="text-sm text-gray-500">
              Encuentra cualquier anime por nombre en tiempo real.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow flex flex-col gap-3">
            <span className="text-3xl">❤️</span>
            <h3 className="font-semibold">Guardar favoritos</h3>
            <p className="text-sm text-gray-500">
              Agrega series a tu lista personal fácilmente.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow flex flex-col gap-3">
            <span className="text-3xl">📊</span>
            <h3 className="font-semibold">Ver detalles</h3>
            <p className="text-sm text-gray-500">
              Score, episodios, géneros y sinopsis completa.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}