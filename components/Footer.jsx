import Link from "next/link";
import Image from "next/image";
import logoWhite from "@/app/assets/images/logo-white.png";
import { FaCamera, FaCode, FaGlobe, FaPenNib } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-slate-100">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4">
              <Image
                src={logoWhite}
                alt="Property Market"
                className="h-9 w-auto"
              />
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-300 md:max-w-none">
              Property Market helps people rent, buy, and sell properties across
              Gaya, Bihar, and India.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">MJX Studios</h3>
            <div className="rounded-xl border border-slate-600 bg-white/5 p-4">
              <p className="flex items-center justify-center gap-2 font-semibold text-cyan-300 md:justify-start">
                <FaCode /> MJX WEB STUDIO
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Website design, development, and SEO services.
              </p>
            </div>
            <div className="rounded-xl border border-slate-600 bg-white/5 p-4">
              <p className="flex items-center justify-center gap-2 font-semibold text-amber-300 md:justify-start">
                <FaCamera /> MJX CINEMATIX STUDIO
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Professional photography and cinematic visual work.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Explore</h3>
            <ul className="space-y-2 text-slate-200">
              <li>
                <Link className="hover:text-white" href="/properties">
                  Properties
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="https://mj.ideas.build"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-400/60 bg-cyan-500/10 px-3 py-2 text-center font-medium text-cyan-200 transition hover:bg-cyan-500/20 md:justify-start md:text-left"
                >
                  <FaGlobe />
                  Visit mj.ideas.build for your business optimization needs
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-700 pt-6 text-center text-sm text-slate-300 md:flex-row md:items-center md:text-left">
          <p>&copy; {currentYear} Property Market. All rights reserved.</p>
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-white/5 px-4 py-2 font-medium text-slate-100">
            <FaPenNib className="text-cyan-300" />
            Designed &amp; Developed by Mosanna Jalal
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
