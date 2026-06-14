import { ArrowRight } from "lucide-react";

const inList = [
  "Researchers & academics",
  "Founders & business owners",
  "Engineers & designers",
  "Writers & journalists",
  "Artists & filmmakers",
  "Investors & operators",
  "Community builders",
  "Exceptional students",
  "Anyone doing remarkable work",
];

const outList = [
  "Idea guys with no execution",
  "Passive consumers",
  "Serial event attendees",
  "People looking only to sell",
  "Status-seekers without contribution",
];

export default function WhoBelongs() {
  return (
    <section id="who" className="bg-[#fafaf8] border-b-2 border-[#111]">
      <div className="px-5 py-14 md:px-10 md:py-20 max-w-6xl mx-auto">
        <div className="text-[9px] font-bold tracking-[3px] uppercase text-[#888] mb-10">
          02 — Who Belongs
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Who's in */}
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#111] mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              People who have done something real.
            </h2>
            <ul className="space-y-0">
              {inList.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 py-3 border-b border-[#e5e2dc] text-sm text-[#333]"
                >
                  <ArrowRight size={13} className="text-[#c0392b] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* The filter */}
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold text-[#111] mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The common trait is not profession. It&apos;s agency.
            </h2>

            <div className="bg-[#111] text-[#fafaf8] p-6 mb-6">
              <div className="text-[9px] font-bold tracking-[2px] uppercase text-[#aaa] mb-3">
                The filter
              </div>
              <p
                className="text-lg italic leading-snug"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                &ldquo;What have you built, led, published, created, grown, or
                achieved?&rdquo;
              </p>
            </div>

            <div className="text-[9px] font-bold tracking-[3px] uppercase text-[#888] mb-3">
              Who doesn&apos;t belong
            </div>
            <ul className="space-y-0">
              {outList.map((item) => (
                <li
                  key={item}
                  className="py-3 border-b border-[#e5e2dc] text-sm text-[#888] line-through decoration-[#c0392b]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
