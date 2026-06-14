"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Users,
  CalendarDays,
  Star,
  ExternalLink,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/members", label: "Members", icon: Users },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/featured", label: "Featured", icon: Star },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 bg-[#111] flex flex-col min-h-screen">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#222]">
        <div
          className="text-sm font-black text-[#fafaf8] tracking-wide"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          INDEX DHAKA
        </div>
        <div className="text-[9px] tracking-[2px] uppercase text-[#555] mt-0.5">
          Admin Panel
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4">
        <div className="px-5 py-2 text-[9px] font-bold tracking-[3px] uppercase text-[#444]">
          Manage
        </div>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-5 py-3 text-xs font-semibold border-l-2 transition-colors ${
                active
                  ? "border-[#c0392b] text-[#fafaf8] bg-[#1a1a1a]"
                  : "border-transparent text-[#777] hover:text-[#ccc] hover:border-[#444]"
              }`}
            >
              <Icon size={14} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom links */}
      <div className="border-t border-[#222] py-3">
        <Link
          href="/"
          className="flex items-center gap-3 px-5 py-3 text-xs font-semibold text-[#555] hover:text-[#ccc] transition-colors"
          target="_blank"
        >
          <ExternalLink size={13} />
          View Site
        </Link>
        <Link
          href="/admin/logout"
          className="flex items-center gap-3 px-5 py-3 text-xs font-semibold text-[#555] hover:text-[#c0392b] transition-colors"
        >
          <LogOut size={13} />
          Log Out
        </Link>
      </div>
    </aside>
  );
}
