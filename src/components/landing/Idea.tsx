export default function Idea() {
  return (
    <section id="idea" className="bg-[#111] border-b-2 border-[#111]">
      <div className="px-5 py-14 md:px-10 md:py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 md:gap-16 items-start">
          {/* Section number */}
          <div>
            <div className="text-[9px] font-bold tracking-[3px] uppercase text-[#555] mb-1">
              Section
            </div>
            <div
              className="text-7xl font-black text-[#222] leading-none"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              01
            </div>
          </div>

          {/* Body */}
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#fafaf8] leading-snug mb-5"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Every city has thousands of interesting people. The problem is
              they rarely know each other.
            </h2>
            <p className="text-sm md:text-base text-[#aaa] leading-relaxed mb-5">
              Index Dhaka exists to create a living index of the city&apos;s
              most exceptional people — across every field. The common trait is
              not profession. It&apos;s agency. Not a startup community. Not a
              networking club. Not a business association.
            </p>
            <p className="text-sm md:text-base text-[#aaa] leading-relaxed">
              A curated network of people who are actually doing things.
            </p>
            <blockquote className="mt-8 border-l-4 border-[#c0392b] pl-5 py-3 bg-[#1a1a1a]">
              <p
                className="text-lg md:text-xl text-[#fafaf8] italic"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                &ldquo;High Signal. Low Noise.&rdquo;
              </p>
              <p className="text-[10px] tracking-[2px] uppercase text-[#555] mt-2">
                The core principle
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
