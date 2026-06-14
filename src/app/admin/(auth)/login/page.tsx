"use client";
import { useState } from "react";
import { Lock, ArrowRight, Loader } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = "/admin/applications";
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div
            className="text-xl font-black text-[#fafaf8] tracking-wide mb-1"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            INDEX DHAKA
          </div>
          <div className="text-[9px] tracking-[3px] uppercase text-[#555]">
            Admin Panel
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-[#222] p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={14} className="text-[#555]" />
            <span className="text-xs font-bold text-[#555] tracking-[1px] uppercase">
              Sign In
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="password"
              placeholder="Password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#111] border border-[#333] text-[#fafaf8] placeholder-[#555] px-4 py-3 text-sm focus:outline-none focus:border-[#c0392b] transition-colors"
            />
            {error && (
              <p className="text-[#c0392b] text-xs">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-[#c0392b] text-[#fafaf8] text-[10px] font-bold tracking-[2px] uppercase px-6 py-4 hover:bg-[#a93226] transition-colors disabled:opacity-60"
            >
              {loading ? (
                <Loader size={13} className="animate-spin" />
              ) : (
                <>
                  Enter <ArrowRight size={13} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
