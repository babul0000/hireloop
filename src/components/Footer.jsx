"use client";

import Link from "next/link";

import {
    Code,
    LogoFacebook,
    LogoLinkedin,
    LogoGithub,
} from "@gravity-ui/icons";

const productLinks = [
    "Job discovery",
    "Worker AI",
    "Companies",
    "Salary data",
];

const navigationLinks = [
    "Help center",
    "Career library",
    "Contact",
];

const resourceLinks = [
    "Brand Guideline",
    "Newsroom",
];

const Footer = () => {
    return (
        <footer className="w-full bg-black px-6 md:px-12 lg:px-16 py-14 text-white">

            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* Left Side */}
                <div className="space-y-6">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2"
                    >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                            <Code className="w-5 h-5 text-white" />
                        </div>

                        <div className="leading-[1]">
                            <h2 className="text-white text-[20px] font-semibold">
                                Hiring
                            </h2>

                            <p className="text-white text-[17px] font-medium">
                                Loop
                            </p>
                        </div>
                    </Link>

                    {/* Description */}
                    <p className="text-[#8B8B8B] text-[15px] leading-7 max-w-[300px]">
                        The AI-native career platform. Built for
                        people who take their work seriously.
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-3 pt-10">

                        <Link
                            href="https://facebook.com"
                            target="_blank"
                            className="w-10 h-10 rounded-lg bg-[#111111] hover:bg-[#1A1A1A] transition flex items-center justify-center"
                        >
                            <LogoFacebook className="w-5 h-5 text-white" />
                        </Link>

                        <Link
                            href="https://pinterest.com"
                            target="_blank"
                            className="w-10 h-10 rounded-lg bg-[#5B4CF0] hover:opacity-90 transition flex items-center justify-center"
                        >
                            <LogoGithub className="w-5 h-5 text-white" />
                        </Link>

                        <Link
                            href="https://linkedin.com"
                            target="_blank"
                            className="w-10 h-10 rounded-lg bg-[#111111] hover:bg-[#1A1A1A] transition flex items-center justify-center"
                        >
                            <LogoLinkedin className="w-5 h-5 text-white" />
                        </Link>
                    </div>
                </div>

                {/* Product */}
                <div>
                    <h3 className="text-[#5B4CF0] font-medium mb-6">
                        Product
                    </h3>

                    <div className="space-y-4">
                        {productLinks.map((item) => (
                            <Link
                                key={item}
                                href="/"
                                className="block text-[#8B8B8B] hover:text-white transition"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Navigations */}
                <div>
                    <h3 className="text-[#5B4CF0] font-medium mb-6">
                        Navigations
                    </h3>

                    <div className="space-y-4">
                        {navigationLinks.map((item) => (
                            <Link
                                key={item}
                                href="/"
                                className="block text-[#8B8B8B] hover:text-white transition"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-[#5B4CF0] font-medium mb-6">
                        Resources
                    </h3>

                    <div className="space-y-4">
                        {resourceLinks.map((item) => (
                            <Link
                                key={item}
                                href="/"
                                className="block text-[#8B8B8B] hover:text-white transition"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-[#111111] mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-5">

                <p className="text-[#777777] text-sm text-center">
                    Copyright 2024 —Programming Hero
                </p>

                <div className="flex items-center gap-3 text-sm text-[#777777]">
                    <Link
                        href="/"
                        className="hover:text-white transition"
                    >
                        Terms & Policy
                    </Link>

                    <span>-</span>

                    <Link
                        href="/"
                        className="hover:text-white transition"
                    >
                        Privacy Guideline
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;