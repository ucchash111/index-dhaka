"use client";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#fafaf8] border-b-2 border-[#111]">
      <div className="flex items-center justify-between px-5 py-4 md:px-10">
        <div>
          <div
            className="font-black text-base tracking-wide text-[#111]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            INDEX DHAKA
          </div>
          <div className="text-[9px] tracking-[3px] text-[#999] uppercase mt-0.5">
            Est. 2025
          </div>
        </div>

        <a
          href="#apply"
          className="hidden md:inline-flex items-center gap-2 bg-[#111] text-[#fafaf8] text-[10px] font-bold tracking-[2px] uppercase px-5 py-3 border-2 border-[#111] hover:bg-[#c0392b] hover:border-[#c0392b] transition-colors"
        >
          Apply to Join <ArrowRight size={11} />
        </a>

        <button
          className="md:hidden p-1 text-[#111]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t-2 border-[#111] bg-[#fafaf8] px-5 py-4">
          {["#idea", "#who", "#how", "#members"].map((href, i) => {
            const labels = ["The Idea", "Who Belongs", "How It Works", "The Network"];
            return (
              <a
                key={href}
                href={href}
                className="block py-3 text-sm font-semibold border-b border-[#e5e2dc] hover:text-[#c0392b] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {labels[i]}
              </a>
            );
          })}
          <a
            href="#apply"
            className="mt-4 flex items-center justify-center gap-2 bg-[#111] text-[#fafaf8] text-[10px] font-bold tracking-[2px] uppercase px-5 py-3 hover:bg-[#c0392b] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Apply to Join <ArrowRight size={11} />
          </a>
        </div>
      )}
    </nav>
  );
}
