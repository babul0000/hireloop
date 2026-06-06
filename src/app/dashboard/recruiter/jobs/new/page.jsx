"use client";

import { useRef, useState } from "react";

const mockCompany = {
    isApproved: true, 
};

export default function CompanyPage() {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("Upload logo");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!mockCompany.isApproved) {
            alert("Your company profile must be approved before you can post jobs.");
            return;
        }

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log("Submitted Company Data:", data);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="min-h-screen bg-[#090a0c] flex items-center justify-center p-4 antialiased text-[#e2e8f0]">
            {/* Modal Container */}
            <div className="w-full max-w-[560px] bg-[#121214] border border-[#222224] rounded-xl shadow-2xl relative overflow-hidden">
                
                {/* Header */}
                <div className="pt-6 px-6 pb-4 flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-semibold text-white tracking-tight">
                            Register New Company
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">
                            Enter your business details to start hiring on HireLoop.
                        </p>
                    </div>
                    <button type="button" className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-[#1c1c1e]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="px-6 pb-6 space-y-4">
                        
                        {/* Row 1: Name & Industry */}
                        <div className="grid grid-cols-2 gap-x-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-gray-300">Company Name</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    placeholder="e.g. Acme Corp"
                                    className="w-full px-3 py-2 bg-[#1c1c1e] border border-[#2e2e30] rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-gray-300">Industry / Category</label>
                                <div className="relative">
                                    <select
                                        name="industry"
                                        defaultValue="Technology"
                                        className="w-full px-3 py-2 bg-[#1c1c1e] border border-[#2e2e30] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="Technology">Technology</option>
                                        <option value="Garments">Garments</option>
                                        <option value="Startup">Startup</option>
                                        <option value="Agency">Agency</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Row 2: Website & Location */}
                        <div className="grid grid-cols-2 gap-x-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-gray-300">Website URL</label>
                                <div className="flex rounded-lg overflow-hidden border border-[#2e2e30] bg-[#1c1c1e] focus-within:border-blue-500 transition-colors">
                                    <span className="bg-[#2a2a2c] text-xs font-medium text-gray-400 px-3 flex items-center select-none border-r border-[#2e2e30]">
                                        https://
                                    </span>
                                    <input
                                        type="text"
                                        name="website"
                                        placeholder="www.company.com"
                                        className="w-full px-3 py-2 bg-transparent text-sm text-white placeholder-gray-600 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-gray-300">Location</label>
                                <div className="relative flex items-center">
                                    <span className="absolute left-3 text-gray-400 pointer-events-none">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="City, Country"
                                        className="w-full pl-9 pr-3 py-2 bg-[#1c1c1e] border border-[#2e2e30] rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Row 3: Employee Count & Company Logo */}
                        <div className="grid grid-cols-2 gap-x-4 items-end">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-gray-300">Employee Count Range</label>
                                <div className="relative">
                                    <select
                                        name="employeeRange"
                                        defaultValue="1-10 employees"
                                        className="w-full px-3 py-2 bg-[#1c1c1e] border border-[#2e2e30] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                                    >
                                        <option value="1-10 employees">1-10 employees</option>
                                        <option value="10-50 employees">10-50 employees</option>
                                        <option value="50-200 employees">50-200 employees</option>
                                        <option value="200+ employees">200+ employees</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-gray-300">Company Logo</label>
                                <input
                                    type="file"
                                    name="logo"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/png, image/jpeg"
                                    className="hidden"
                                />
                                <div 
                                    onClick={triggerFileSelect}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    {/* Upload Square Box */}
                                    <div className="w-11 h-11 bg-[#1c1c1e] border border-[#2e2e30] border-dashed rounded-lg text-gray-400 flex items-center justify-center flex-shrink-0 group-hover:bg-[#252528] group-hover:border-gray-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                        </svg>
                                    </div>
                                    <div className="text-left leading-tight overflow-hidden">
                                        <p className="text-xs font-medium text-gray-200 truncate">{fileName}</p>
                                        <p className="text-[10px] text-gray-500 mt-0.5">PNG, JPG, Max 5MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Row 4: Full Width Brief Description */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-gray-300">Brief Description</label>
                            <textarea
                                name="description"
                                rows={4}
                                placeholder="Tell us about your company's mission and culture..."
                                className="w-full px-3 py-2 bg-[#1c1c1e] border border-[#2e2e30] rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            />
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 bg-[#121214] border-t border-[#1c1c1e] flex justify-end gap-2.5">
                        <button
                            type="button"
                            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 border border-[#2e2e30] hover:bg-[#1c1c1e] hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#1d61f2] hover:bg-[#1652cf] text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                        >
                            Register Company
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}