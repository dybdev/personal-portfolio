import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-[1600px] px-gutter py-28">
      <p className="text-sm text-foreground/70">404 / Page not found</p>
      <h1 className="mt-5 text-section font-medium tracking-[-0.06em]">
        A little off course.
      </h1>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center border-b border-foreground"
      >
        Back to the portfolio →
      </Link>
    </main>
  );
}
