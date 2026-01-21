import Image from "next/image";
import Link from "next/link";

export default function QRPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-white/60 hover:text-white transition-colors"
        >
          ← Volver a la página principal
        </Link>

        <div className="mt-8 bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              📱 Código QR - Registro de Guardianes
            </h1>
            <p className="text-lg text-gray-600">
              Escanea este código para acceder directamente al formulario de registro
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-8 rounded-3xl shadow-lg">
              <Image
                src="/qr-registro-guardian.png"
                alt="Código QR para registro de guardianes"
                width={500}
                height={500}
                className="rounded-xl"
                priority
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              🌟 Usos del QR
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-2xl">🖨️</span>
                <div>
                  <strong>Imprimir en carteles</strong>
                  <p className="text-sm text-gray-600">Coloca este QR en lugares públicos, escuelas, centros comunitarios</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <strong>Compartir en redes sociales</strong>
                  <p className="text-sm text-gray-600">Descarga la imagen y compártela en Instagram, Facebook, WhatsApp</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <strong>Presentaciones</strong>
                  <p className="text-sm text-gray-600">Incluye el QR en tus presentaciones y charlas educativas</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <strong>Emails y documentos</strong>
                  <p className="text-sm text-gray-600">Agrega el QR en comunicaciones oficiales</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
              ✅ ¿Cómo funciona?
            </h3>
            <p className="text-green-800 text-sm">
              Al escanear el QR con cualquier celular, la persona será llevada directamente
              a la página de registro con el formulario ya abierto, listo para completar sus datos
              y convertirse en Guardián de Fauna.
            </p>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/qr-registro-guardian.png"
              download="QR-Registro-Guardian-Fauna.png"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform"
            >
              ⬇️ Descargar QR en Alta Calidad
            </a>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              URL: <span className="font-mono bg-gray-100 px-2 py-1 rounded">https://fauna-comunidad.onrender.com/registro</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
