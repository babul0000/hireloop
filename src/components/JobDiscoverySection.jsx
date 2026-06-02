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
        "Showcase your commitment to diversity and inclusion by highlighting initiatives.",
      location: "New York, USA",
      type: "Hybrid",
      salary: "€25–€40/hour",
    },
    {
      title: "UI/UX Designer",
      description:
        "Design beautiful and user-friendly interfaces for modern applications.",
      location: "London, UK",
      type: "Remote",
      salary: "€20–€35/hour",
    },
    {
      title: "Backend Developer",
      description:
        "Build scalable APIs and maintain secure server-side applications.",
      location: "Berlin, Germany",
      type: "Full Time",
      salary: "€30–€45/hour",
    },
    {
      title: "Mobile App Developer",
      description:
        "Create high-performance mobile applications for Android and iOS.",
      location: "Toronto, Canada",
      type: "Remote",
      salary: "€28–€42/hour",
    },
    {
      title: "Product Designer",
      description:
        "Collaborate with teams to craft engaging digital experiences.",
      location: "Amsterdam, Netherlands",
      type: "Hybrid",
      salary: "€22–€38/hour",
    },
    {
      title: "Software Engineer",
      description:
        "Develop and optimize scalable systems for enterprise applications.",
      location: "San Francisco, USA",
      type: "Onsite",
      salary: "€40–€60/hour",
    },
  ];

  return (
    <section className="bg-black text-white min-h-screen py-20 px-4 flex flex-col items-center justify-center">
      {/* Header */}
      <div className="text-center max-w-3xl mb-14">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-violet-500 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500"></span>
          Smart Job Discovery
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500"></span>
        </div>

        <h2 className="text-4xl md:text-6xl font-semibold leading-tight">
          The roles you'd never <br /> find by searching
        </h2>

        <p className="text-gray-400 mt-5 text-sm md:text-base">
          Discover premium opportunities tailored to your skills and future
          career goals.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {jobs.map((job, index) => (
          <Card
            key={index}
            shadow="none"
            className="bg-[#111111] border border-[#1f1f1f] rounded-3xl p-6 hover:border-violet-500/40 transition-all duration-300"
          >
            <div className="space-y-5">
              {/* Content */}
              <div>
                <h3 className="text-2xl font-semibold mb-3">
                  {job.title}
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#262626] px-3 py-2 rounded-full text-xs text-gray-300">
                  <Pin width={14} height={14} className="text-violet-400" />
                  {job.location}
                </div>

                <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#262626] px-3 py-2 rounded-full text-xs text-gray-300">
                  <Briefcase
                    width={14}
                    height={14}
                    className="text-violet-400"
                  />
                  {job.type}
                </div>

                <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#262626] px-3 py-2 rounded-full text-xs text-gray-300">
                  <CircleDollar
                    width={14}
                    height={14}
                    className="text-violet-400"
                  />
                  {job.salary}
                </div>
              </div>

              {/* Button */}
              <div className="pt-4">
                <Button
                  variant="light"
                  className="p-0 h-auto bg-transparent hover:bg-transparent text-white hover:text-violet-400 text-sm font-medium flex items-center gap-1"
                >
                  Apply Now
                  <ArrowUpRight width={16} height={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Button */}
      <div className="mt-14">
        <Button
          radius="lg"
          className="bg-white text-black hover:bg-gray-200 font-medium px-7 py-6 text-sm rounded-2xl"
        >
          View all job openings
        </Button>
      </div>
    </section>
  );
}