"use client";

import { Card } from "@heroui/react";

import {
  FileText,
  Persons,
  Thunderbolt,
  CircleCheck,
} from "@gravity-ui/icons";

export default function DashboardStats({ statsData }) {
  const defaultStats = [
    {
      id: 1,
      title: "Total Job Posts",
      value: 48,
      icon: <FileText className="w-6 h-6 text-sky-400" />,
    },
    {
      id: 2,
      title: "Total Applicants",
      value: "1,284",
      icon: <Persons className="w-6 h-6 text-violet-400" />,
    },
    {
      id: 3,
      title: "Active Jobs",
      value: 18,
      icon: <Thunderbolt className="w-6 h-6 text-emerald-400" />,
    },
    {
      id: 4,
      title: "Jobs Closed",
      value: 32,
      icon: <CircleCheck className="w-6 h-6 text-orange-400" />,
    },
  ];

  const displayStats = statsData ? statsData.map((s, idx) => {
    let IconNode = s.icon;
    if (typeof s.icon === 'function') {
      const IconComponent = s.icon;
      let colorClass = "text-sky-400";
      if (s.title.toLowerCase().includes("applicant")) colorClass = "text-violet-400";
      else if (s.title.toLowerCase().includes("active")) colorClass = "text-emerald-400";
      else if (s.title.toLowerCase().includes("closed")) colorClass = "text-orange-400";
      IconNode = <IconComponent className={`w-6 h-6 ${colorClass}`} />;
    }
    return {
      id: idx + 1,
      title: s.title,
      value: s.value,
      icon: IconNode
    };
  }) : defaultStats;

  return (
    <div className="w-full">
      <div className="grid gap-5 p-5 sm:grid-cols-2 xl:grid-cols-4">
        {displayStats.map((stat) => (
          <Card
            key={stat.id}
            className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20"
          >
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-white">
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  {stat.title}
                </p>
                <h3 className="mt-4 text-3xl font-bold text-white">{stat.value}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
