export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t-2 border-[#222]">
      <div className="px-5 py-6 md:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-6xl mx-auto">
        <div
          className="text-sm font-bold text-[#777]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          INDEX DHAKA
        </div>
        <p className="text-[10px] text-[#555]">
          &copy; 2025 · Dhaka, Bangladesh
        </p>
      </div>
    </footer>
  );
}
