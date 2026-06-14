import { Calendar, UtensilsCrossed, Presentation } from "lucide-react";

const rhythms = [
  {
    freq: "Weekly",
    title: "Index Meetup",
    icon: Calendar,
    desc: "Small group. Each member shares what they're building, their biggest win, biggest challenge, and one thing they need. No presentations. No icebreakers. No motivational talks.",
  },
  {
    freq: "Monthly",
    title: "Index Dinner",
    icon: UtensilsCrossed,
    desc: "10–12 curated attendees. Goal: build deeper relationships, exchange ideas, and create collaborations over a shared meal.",
  },
  {
    freq: "Monthly",
    title: "Index Showcase",
    icon: Presentation,
    desc: "Members present their startup, research, business, or creative work. Focus is on feedback, learning, and real opportunities — not applause.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-[#f0ede6] border-b-2 border-[#111]">
      <div className="px-5 py-14 md:px-10 md:py-20 max-w-6xl mx-auto">
        <div className="text-[9px] font-bold tracking-[3px] uppercase text-[#888] mb-3">
          03 — How It Works
        </div>
        <h2
          className="text-2xl md:text-3xl font-bold text-[#111] mb-10"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          A rhythm built for builders.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#111]">
          {rhythms.map(({ freq, title, icon: Icon, desc }) => (
            <div key={title} className="bg-[#fafaf8] p-6 md:p-8">
              <div className="text-[9px] font-bold tracking-[3px] uppercase text-[#c0392b] mb-4">
                {freq}
              </div>
              <Icon size={20} className="text-[#111] mb-3" />
              <h3
                className="text-xl font-bold text-[#111] mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {title}
              </h3>
              <p className="text-sm text-[#555] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
