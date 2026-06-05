import { Separator } from "@/components/ui/separator";
import packageJson from "../package.json";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-700 bg-slate-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="flex items-center gap-4 text-xs text-slate-500 font-mono">
              <a href="#">[ Talha Khan ]</a>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
            <span>© {new Date().getFullYear()} All rights reserved</span>
            <Separator orientation="vertical" className="h-4" />
            <span>
              Design & Developed by{" "}
              <Link
                href={packageJson.author.url}
                className="hover:underline"
                target="_blank"
              >
                {packageJson.author.name}
              </Link>
            </span>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="text-center text-xs text-slate-600 font-mono">
          <p>
            System Version: v{packageJson.version} | Last Updated:{" "}
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </footer>
  );
}
