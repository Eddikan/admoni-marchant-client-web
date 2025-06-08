import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen p-10 flex-col items-center justify-center bg-gray-100">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-xl text-gray-600">Oops! Page not found.</p>
      <p className="mt-2 text-gray-500">
        The page you are looking for might have been removed or temporarily
        unavailable.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
      >
        Go Back Home
      </Link>
    </div>
  );
}
