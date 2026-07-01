"use client"; // Brief: Ensures client-side state rendering compatibility

import React from "react";
import { Card } from "@heroui/react";

// =========================================================
// 1. DATA CONFIGURATION (কার্ডের তথ্যাদি ও গ্র্যাভিটি এসভিজি আইকন)
// =========================================================
const STATS_DATA = [
    {
        id: "active-jobs",
        value: "50K",
        label: "Active Jobs",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .414-.336.75-.75.75H4.5a.75.75 0 0 1-.75-.75V14.15M20.25 14.15a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25M20.25 14.15M4.5 14.15" />
            </svg>
        ),
    },
    {
        id: "companies",
        value: "12K",
        label: "Companies",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18" />
            </svg>
        ),
    },
    {
        id: "job-seekers",
        value: "2M",
        label: "Job Seekers",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
        ),
    },
    {
        id: "satisfaction",
        value: "97%",
        label: "Satisfaction Rate",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.172-.34.686-.34.858 0l2.353 4.83 5.317.773c.372.054.52.51.248.773l-3.85 3.75 1.005 5.295c.07.37-.318.652-.652.478L12 16.89l-4.757 2.502c-.334.174-.722-.108-.652-.478l1.005-5.295-3.85-3.75c-.272-.263-.124-.719.248-.773l5.317-.773 2.353-4.83Z" />
            </svg>
        ),
    },
];

export default function HeroBanner() {
    return (
        <section className="relative overflow-hidden bg-[#020209] px-6 py-14 text-white md:px-8 lg:px-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.24),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_22%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/95" />

            <div className="relative mx-auto max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-fuchsia-300 shadow-inner shadow-white/5">
                            Trusted by over 15,000 professionals
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
                                Find better roles faster with AI-powered hiring.
                            </h1>
                            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                                HiringLoop delivers modern job discovery, ranked applications, and recruiter-ready career tools in one beautifully polished experience.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <a href="/signup" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-slate-100">
                                Create account
                            </a>
                            <a href="/plans" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10">
                                View pricing
                            </a>
                        </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {STATS_DATA.map(({ id, value, label, icon }) => (
                            <Card key={id} className="glass-card rounded-[28px] border-white/10 p-6 shadow-2xl shadow-black/20 transition hover:-translate-y-1">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/5 text-slate-200">
                                        {icon}
                                    </div>
                                    <span className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</span>
                                </div>
                                <h3 className="mt-6 text-4xl font-semibold text-white">{value}</h3>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
