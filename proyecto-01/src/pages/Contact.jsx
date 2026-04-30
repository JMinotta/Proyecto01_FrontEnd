import { useForm } from "react-hook-form";
import { useRef } from "react";

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isValid },
  } = useForm();
  const modalRef = useRef(null);

  const onSubmit = (data) => {
    console.log(data);
    modalRef.current?.showModal();
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="bg-[#1a1a2e] p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          Contacto
        </h2>

        <p className="text-gray-400 text-sm text-center mb-6">
          Formulario con validaciones
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm text-gray-300 mb-1"
            >
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-[#0f172a] text-white border border-gray-700 focus:outline-none focus:border-[#e94560]"
              {...register("nombre", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 2,
                  message: "Mínimo 2 caracteres",
                },
              })}
            />
            {errors.nombre && (
              <span className="text-red-400 text-xs">
                {errors.nombre.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="correo"
              className="block text-sm text-gray-300 mb-1"
            >
              Correo
            </label>
            <input
              id="correo"
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-[#0f172a] text-white border border-gray-700 focus:outline-none focus:border-[#e94560]"
              {...register("correo", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^\S+@\S+$/,
                  message: "Correo inválido",
                },
              })}
            />
            {errors.correo && (
              <span className="text-red-400 text-xs">
                {errors.correo.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="comentario"
              className="block text-sm text-gray-300 mb-1"
            >
              Comentario
            </label>
            <textarea
              id="comentario"
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-[#0f172a] text-white border border-gray-700 focus:outline-none focus:border-[#e94560]"
              {...register("comentario", {
                required: "El comentario es obligatorio",
                minLength: {
                  value: 10,
                  message: "Mínimo 10 caracteres",
                },
              })}
            />
            {errors.comentario && (
              <span className="text-red-400 text-xs">
                {errors.comentario.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full py-2 rounded-full font-semibold bg-[#e94560] hover:bg-[#ff2e63] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enviar
          </button>

          {isSubmitSuccessful && (
            <p className="text-green-400 text-sm text-center">
              Formulario enviado correctamente ✅
            </p>
          )}
        </form>

        <dialog
          ref={modalRef}
          className="rounded-xl p-6 w-[320px] text-center shadow-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed"
        >
          <h3 className="text-lg font-bold mb-3">Confirmar envío</h3>
          <p className="text-gray-600 mb-6">
            ¿Seguro que deseas enviar el formulario?
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => modalRef.current?.close()}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                modalRef.current?.close();
                console.log("Formulario confirmado y enviado");
              }}
              className="px-4 py-2 rounded bg-[#e94560] hover:bg-[#ff2e63] text-white text-sm font-semibold"
            >
              Sí, enviar
            </button>
          </div>
        </dialog>
      </div>
    </section>
  );
}

export default ContactForm;
