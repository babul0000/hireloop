"use client"; // Brief: Ensures client-side state rendering compatibility

import React from "react";
import { Card } from "@heroui/react";

// =========================================================
// 1. IMAGE IMPORT (আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী সঠিক পাথ)
// =========================================================
import bgImage from "../../public/images/globe.png";

// =========================================================
// 2. DATA CONFIGURATION (কার্ডের তথ্যাদি ও গ্র্যাভিটি এসভিজি আইকন)
// =========================================================
const STATS_DATA = [
    {
        id: "active-jobs",
        value: "50K",
        label: "Active Jobs",
        // Brief: SVG icon structure for Active Jobs card
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
        // Brief: SVG icon structure for Companies card
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
        // Brief: SVG icon structure for Job Seekers card
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
        // Brief: SVG icon structure for Satisfaction Rate card
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.172-.34.686-.34.858 0l2.353 4.83 5.317.773c.372.054.52.51.248.773l-3.85 3.75 1.005 5.295c.07.37-.318.652-.652.478L12 16.89l-4.757 2.502c-.334.174-.722-.108-.652-.478l1.005-5.295-3.85-3.75c-.272-.263-.124-.719.248-.773l5.317-.773 2.353-4.83Z" />
            </svg>
        ),
    },
];

// =========================================================
// 3. MAIN COMPONENT (প্রধান ব্যানার কম্পোনেন্ট)
// =========================================================
export default function HeroBanner() {
    return (
        // Brief: Background setup pulling from dynamic imported globe object
        <section
            className="relative w-full min-h-[650px] bg-black text-white flex flex-col justify-between items-center px-6 py-5 overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImage.src})` }}
        >

            {/* Brief: Overlapping layout shade to prevent low text contrast */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] pointer-events-none" />

            {/* Brief: Main headings display with balanced typography parameters */}
            <div className="relative z-10 text-center max-w-3xl mt-12 space-y-2">
                <h1 className="text-3xl md:text-5xl font-normal tracking-tight text-slate-100">
                    Assisting over <span className="font-semibold text-indigo-400">15,000 job seekers</span>
                </h1>
                <p className="text-2xl md:text-4xl font-normal text-slate-300">
                    find their dream positions.
                </p>
            </div>

            {/* Brief: Dynamic loop maps grid system distributing structured HeroUI data items */}
            <div className="relative z-10 w-full max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-20">
                {STATS_DATA.map(({ id, value, label, icon }) => (
                    <Card
                        key={id}
                        className="bg-zinc-950/50 backdrop-blur-md border border-zinc-800/60 rounded-2xl shadow-2xl transition-all duration-300 hover:border-zinc-700"
                    >
                        <div className="flex flex-col justify-between items-start gap-8 p-5 md:p-6">

                            {/* Brief: Icon element block holder */}
                            <div className="p-2 rounded-lg bg-[#222222] border border-zinc-800">
                                {icon}
                            </div>

                            {/* Brief: Text box styling displaying individual analytic value headers */}
                            <div className="space-y-1">
                                <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                                    {value}
                                </h3>
                                <p className="text-sm md:text-base text-zinc-400 font-medium">
                                    {label}
                                </p>
                            </div>

                        </div>
                    </Card>
                ))}
            </div>

        </section>
    );
}