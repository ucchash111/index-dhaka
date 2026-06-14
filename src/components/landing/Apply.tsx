"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle, Loader } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export default function Apply() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    building: "",
    link: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setState("success");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  const inputClass =
    "w-full bg-[#1a1a1a] border border-[#333] text-[#fafaf8] placeholder-[#555] px-4 py-3 text-sm focus:outline-none focus:border-[#c0392b] transition-colors";

  return (
    <section id="apply" className="bg-[#111] border-b-2 border-[#111]">
      <div className="px-5 py-14 md:px-10 md:py-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left */}
          <div>
            <div className="text-[9px] font-bold tracking-[3px] uppercase text-[#aaa] mb-4">
              05 — Join
            </div>
            <h2
              className="text-3xl md:text-4xl font-black text-[#fafaf8] leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Are you building something?
            </h2>
            <p className="text-sm text-[#aaa] leading-relaxed">
              Applications are reviewed manually. We&apos;re looking for people
              with demonstrated action — not just ambition. If you&apos;re the
              right fit, you&apos;ll hear back within a week.
            </p>
          </div>

          {/* Right: form */}
          <div>
            {state === "success" ? (
              <div className="flex flex-col items-start gap-4 py-4">
                <CheckCircle size={36} className="text-[#44c87a]" />
                <div>
                  <p className="text-[#fafaf8] font-bold text-lg mb-1">
                    Application submitted.
                  </p>
                  <p className="text-[#aaa] text-sm">
                    We&apos;ll review it and get back to you within a week.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  className={inputClass}
                  placeholder="Full name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  className={inputClass}
                  placeholder="Email address"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <textarea
                  className={`${inputClass} resize-none`}
                  placeholder="What are you building / working on?"
                  rows={3}
                  required
                  value={form.building}
                  onChange={(e) =>
                    setForm({ ...form, building: e.target.value })
                  }
                />
                <input
                  className={inputClass}
                  placeholder="Link to your work (GitHub, site, project...)"
                  value={form.link}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                />

                {state === "error" && (
                  <p className="text-[#c0392b] text-xs">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="mt-1 flex items-center justify-center gap-2 bg-[#c0392b] text-[#fafaf8] text-[10px] font-bold tracking-[2px] uppercase px-6 py-4 hover:bg-[#a93226] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === "loading" ? (
                    <Loader size={13} className="animate-spin" />
                  ) : (
                    <>
                      Submit Application <ArrowRight size={13} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
