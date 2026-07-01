"use client";

import React from "react";

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#02020a] px-6 py-20 text-white sm:px-8 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.12),transparent_22%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/95" />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center rounded-[32px] border border-white/10 bg-white/5 p-10 text-center shadow-2xl shadow-black/30 backdrop-blur-xl">
        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Your next role is already looking for you.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          Build a profile in minutes and start receiving better job matches tomorrow morning.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a href="/signup" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-slate-100">
            Create a free account
          </a>
          <a href="/plans" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10">
            View pricing
          </a>
        </div>
      </div>
    </section>
  );
}
