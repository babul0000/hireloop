"use client";

import React from "react";

import { Button, Card } from "@heroui/react";

import {
  Pin,
  Briefcase,
  CircleDollar,
  ArrowUpRight,
} from "@gravity-ui/icons";

export default function JobDiscoverySection() {
  const jobs = [
    {
      title: "Frontend Developer",
      description:
        "Lead product experiences and craft web interfaces that delight millions.",
      location: "New York, USA",
      type: "Hybrid",
      salary: "€25–€40/hour",
    },
    {
      title: "UI/UX Designer",
      description:
        "Design polished digital products with strong visual storytelling.",
      location: "London, UK",
      type: "Remote",
      salary: "€20–€35/hour",
    },
    {
      title: "Backend Developer",
      description:
        "Build reliable APIs and scale backend systems with confidence.",
      location: "Berlin, Germany",
      type: "Full Time",
      salary: "€30–€45/hour",
    },
    {
      title: "Mobile App Developer",
      description:
        "Create fast, accessible apps for modern iOS and Android users.",
      location: "Toronto, Canada",
      type: "Remote",
      salary: "€28–€42/hour",
    },
    {
      title: "Product Designer",
      description:
        "Shape end-to-end experiences and bring product visions to life.",
      location: "Amsterdam, Netherlands",
      type: "Hybrid",
      salary: "€22–€38/hour",
    },
    {
      title: "Software Engineer",
      description:
        "Solve complex problems with clean code and production-grade systems.",
      location: "San Francisco, USA",
      type: "Onsite",
      salary: "€40–€60/hour",
    },
  ];

  return (
    <section className="bg-[#050507] text-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-violet-300 shadow-sm shadow-violet-500/10">
            <span className="block h-2.5 w-2.5 rounded-full bg-violet-400" />
            Smart Job Discovery
            <span className="block h-2.5 w-2.5 rounded-full bg-violet-400" />
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            The roles you&apos;d never find by searching.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Discover premium opportunities tailored to your skills with a polished, modern hiring experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job, index) => (
            <Card
              key={index}
              shadow="none"
              className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/10"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-white">{job.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{job.description}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 text-xs text-slate-300">
                    <Pin width={14} height={14} className="text-violet-400" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 text-xs text-slate-300">
                    <Briefcase width={14} height={14} className="text-violet-400" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 text-xs text-slate-300">
                    <CircleDollar width={14} height={14} className="text-violet-400" />
                    {job.salary}
                  </div>
                </div>
                <div>
                  <Button
                    variant="light"
                    className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-500/20 hover:text-white"
                  >
                    Apply Now
                    <ArrowUpRight width={16} height={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button
            radius="lg"
            className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-slate-100"
          >
            View all job openings
          </Button>
        </div>
      </div>
    </section>
  );
}
