import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div
      data-testid="notfound-page"
      className="min-h-screen flex items-center justify-center bg-zinc-950 text-white px-6"
    >
      <div className="text-center max-w-md">
        <div className="font-display uppercase tracking-tighter text-7xl text-red-500 spark-glow">
          404
        </div>
        <h1 className="mt-4 font-display uppercase tracking-tight text-3xl">
          Page Not Found
        </h1>
        <p className="mt-3 text-zinc-400">
          The page you're looking for isn't part of the workshop yet.
        </p>
        <Button
          asChild
          className="mt-8 rounded-none bg-red-600 hover:bg-red-500 uppercase font-bold tracking-widest"
        >
          <Link to="/" data-testid="notfound-home-link">
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
