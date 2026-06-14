import { ArrowRight, ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-[#fafaf8] border-b-2 border-[#111]">
      <div className="px-5 py-14 md:px-10 md:py-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-end">
          {/* Left */}
          <div>
            <div className="text-[10px] font-bold tracking-[3px] text-[#c0392b] uppercase mb-4">
              Dhaka&apos;s Builder Network
            </div>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.02] tracking-tight text-[#111]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The people
              <br />
              building this
              <br />
              city&apos;s future.
            </h1>
            <p className="mt-5 text-sm md:text-base text-[#555] leading-relaxed max-w-sm">
              A curated network of founders, builders, researchers, operators,
              and high-agency people in Dhaka.{" "}
              <strong className="text-[#111]">High signal. Low noise.</strong>
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 items-start">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 bg-[#111] text-[#fafaf8] text-[10px] font-bold tracking-[2px] uppercase px-6 py-4 border-2 border-[#111] hover:bg-[#c0392b] hover:border-[#c0392b] transition-colors"
              >
                Apply to Join <ArrowRight size={12} />
              </a>
              <a
                href="#idea"
                className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[2px] uppercase text-[#111] underline underline-offset-4 py-4 hover:text-[#c0392b] transition-colors"
              >
                Learn more <ArrowDown size={12} />
              </a>
            </div>
          </div>

          {/* Right: stats */}
          <div className="border-t-2 md:border-t-0 md:border-l-2 border-[#111] pt-8 md:pt-0 md:pl-10">
            <div className="grid grid-cols-3 md:grid-cols-1 gap-6 md:gap-0">
              <div className="md:pb-6 md:border-b md:border-[#e5e2dc]">
                <div
                  className="text-4xl md:text-5xl font-black text-[#111]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  120+
                </div>
                <div className="text-[9px] font-bold tracking-[2px] uppercase text-[#888] mt-1">
                  Members
                </div>
              </div>
              <div className="md:py-6 md:border-b md:border-[#e5e2dc]">
                <div
                  className="text-4xl md:text-5xl font-black text-[#111]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Weekly
                </div>
                <div className="text-[9px] font-bold tracking-[2px] uppercase text-[#888] mt-1">
                  Meetups
                </div>
              </div>
              <div className="md:pt-6">
                <div
                  className="text-3xl md:text-4xl font-black text-[#111]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Curated
                </div>
                <div className="text-[9px] font-bold tracking-[2px] uppercase text-[#888] mt-1">
                  Not Collected
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
