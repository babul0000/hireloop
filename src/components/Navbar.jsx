"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@heroui/react";

import {
    Code,
    Bars,
    Xmark,
} from "@gravity-ui/icons";

const navLinks = [
    {
        label: "Browse Jobs",
        href: "/browse-jobs",
    },
    {
        label: "Company",
        href: "/company",
    },
    {
        label: "Pricing",
        href: "/pricing",
    },
];

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full border border-[#1E90FF] rounded-xl bg-[#111111] px-4 md:px-6 py-3">

            <div className="flex items-center justify-between">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 border border-dashed border-[#1E90FF] px-2 py-1 rounded-md"
                >
                    <div className="w-9 h-9 rounded-md bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                        <Code className="text-white w-5 h-5" />
                    </div>

                    <div className="leading-[1]">
                        <h2 className="text-white text-[18px] font-semibold">
                            Programming
                        </h2>

                        <p className="text-white text-[15px] font-medium">
                            Hero
                        </p>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 border border-dashed border-[#1E90FF] px-8 py-4 rounded-md">

                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-gray-300 text-sm hover:text-white transition"
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Divider */}
                    <div className="w-[1px] h-5 bg-gray-600" />

                    <Link
                        href="/signin"
                        className="text-[#7C3AED] text-sm font-medium hover:text-purple-400 transition"
                    >
                        Sign In
                    </Link>

                    <Button
                        radius="md"
                        className="bg-white text-black font-semibold px-5"
                    >
                        Get Started
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white"
                >
                    {
                        isOpen
                            ? <Xmark className="w-6 h-6" />
                            : <Bars className="w-6 h-6" />
                    }
                </button>
            </div>

            {/* Mobile Menu */}
            {
                isOpen && (
                    <div className="md:hidden mt-4 border border-dashed border-[#1E90FF] rounded-xl p-5 space-y-5">

                        {
                            navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block text-gray-300 hover:text-white transition"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))
                        }

                        <div className="w-full h-[1px] bg-gray-700" />

                        <Link
                            href="/signin"
                            className="block text-[#7C3AED] font-medium hover:text-purple-400 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Sign In
                        </Link>

                        <Button
                            radius="md"
                            className="w-full bg-white text-black font-semibold"
                        >
                            Get Started
                        </Button>
                    </div>
                )
            }
        </nav>
    );
};

export default Navbar;