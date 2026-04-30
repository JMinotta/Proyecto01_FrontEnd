import { useNavigate } from "react-router";

function N404() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-[#0f172a] to-[#0f2444] min-h-[calc(100vh-85px)] flex flex-col justify-center items-center text-white gap-4 text-center px-4">
      <h2 className="text-7xl text-[#e94560] font-bold">
        404
      </h2>
      <p className="text-lg text-[#aaaaaa]">
        La página que buscas no existe.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-6 py-2 bg-[#e94560] rounded-full font-semibold hover:opacity-90 transition"
      >
        Volver al inicio
      </button>
    </section>
  );
}

export default N404;