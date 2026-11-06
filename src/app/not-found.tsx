import Link from "next/link";
export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-display text-4xl text-silver">This page is out of bounds.</h1>
        <Link href="/" className="btn-primary mt-8">Back to home</Link>
      </div>
    </main>
  );
}
