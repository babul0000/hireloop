"use client";

import React from "react";

export default function CtaSection() {
    return (
        <section
            className="relative flex min-h-[600px] w-full flex-col items-center justify-center overflow-hidden bg-black px-6 text-white"
            style={{
                backgroundImage: "url('/images/cta-bg.png')", // ✅ FIXED PATH
                backgroundSize: "cover",
                backgroundPosition: "center top",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />

            {/* Content */}
            <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">

                {/* Heading */}
                <h2 className="mb-5 max-w-2xl text-4xl font-normal leading-[1.15] tracking-tight text-white sm:text-5xl md:text-[56px]">
                    Your next role is <br /> already looking for you
                </h2>

                {/* Subtitle */}
                <p className="mb-10 max-w-xl text-sm leading-relaxed tracking-wide text-zinc-400 opacity-90 sm:text-base">
                    Build a profile in three minutes. The matches start arriving tomorrow morning.
                </p>

                {/* Buttons */}
                <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">

                    {/* Primary Button */}
                    <button className="w-full rounded-xl bg-white px-7 py-3.5 text-sm font-medium text-black transition-all duration-200 hover:bg-zinc-100 active:scale-[0.98] sm:w-auto">
                        Create a free account
                    </button>

                    {/* Secondary Button */}
                    <button className="w-full rounded-xl border border-zinc-800/60 bg-[#0a0a0c]/40 px-7 py-3.5 text-sm font-medium text-zinc-300 backdrop-blur-md transition-all duration-200 hover:border-zinc-700/80 hover:bg-[#16161a]/70 hover:text-white active:scale-[0.98] sm:w-auto">
                        View pricing
                    </button>

                </div>
            </div>
        </section>
    );
}