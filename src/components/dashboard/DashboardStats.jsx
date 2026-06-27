"use client";
import { Card } from "@heroui/react";

import {
    FileText,
    Persons,
    Thunderbolt,
    CircleCheck,
} from "@gravity-ui/icons";

export default function DashboardStats() {
    const statsData = [
        {
            id: 1,
            title: "Total Job Posts",
            value: 48,
            icon: <FileText className="w-6 h-6 text-blue-400" />,
        },
        {
            id: 2,
            title: "Total Applicants",
            value: "1,284",
            icon: <Persons className="w-6 h-6 text-purple-400" />,
        },
        {
            id: 3,
            title: "Active Jobs",
            value: 18,
            icon: <Thunderbolt className="w-6 h-6 text-green-400" />,
        },
        {
            id: 4,
            title: "Jobs Closed",
            value: 32,
            icon: <CircleCheck className="w-6 h-6 text-orange-400" />,
        },
    ];

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 m-5">
                {statsData.map((stat) => (
                    <Card
                        key={stat.id}
                        className="bg-[#4447485a] border border-white/10 rounded-2xl shadow-lg"
                    >
                        <div className="p-6">
                            {/* Icon Box */}
                            <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                {stat.icon}
                            </div>

                            {/* Title & Value */}
                            <div className="mt-4 space-y-1">
                                <p className="text-xs font-medium text-gray-400 tracking-wide">
                                    {stat.title}
                                </p>

                                <h3 className="text-2xl font-bold text-white tracking-tight">
                                    {stat.value}
                                </h3>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}