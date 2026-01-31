import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex justify-center min-h-screen m-auto">
      <div className="flex flex-col items-center justify-center text-sm max-md:px-4">
        <h1 className="text-8xl md:text-9xl font-bold text-indigo-500">404</h1>
        <div className="h-1 w-16 rounded bg-indigo-500 my-5 md:my-7"></div>
        <p className="text-2xl md:text-3xl font-bold text-gray-800">
          Page Non Trouvée
        </p>
        <p className="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex items-center gap-4 mt-6">
          <Link
            href="/dashboard"
            className="bg-gray-800 hover:bg-black px-7 py-2.5 text-white rounded-md active:scale-95 transition-all"
          >
            Vers le tableau de bord
          </Link>
        </div>
      </div>
    </div>
  );
}
