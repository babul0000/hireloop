'use client';

import React, { useState } from 'react';
import { Card, Button, Switch, TextField, Label, Input } from '@heroui/react';
import { Gear, ShieldKeyhole, Globe, Bell } from '@gravity-ui/icons';

export default function AdminSettingsPage() {
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [publicSignups, setPublicSignups] = useState(true);

    const handleSave = (e) => {
        e.preventDefault();
        alert("Platform settings saved successfully!");
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6 text-white min-h-screen">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                    <Gear className="w-8 h-8 text-fuchsia-400" /> Platform Settings
                </h1>
                <p className="text-zinc-400 text-sm">
                    Configure general application parameters and platform features.
                </p>
            </div>

            <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                {/* General Settings */}
                <Card className="p-6 bg-zinc-900 border border-white/5 rounded-[28px] shadow-2xl space-y-6">
                    <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2 border-b border-zinc-800 pb-3">
                        <Globe className="w-5 h-5 text-indigo-400" /> General Configuration
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm font-semibold text-zinc-200">Maintenance Mode</span>
                                <p className="text-xs text-zinc-500">Temporarily restrict access to all users during updates.</p>
                            </div>
                            <Switch isSelected={maintenanceMode} onChange={setMaintenanceMode} />
                        </div>
                        <hr className="border-zinc-800" />
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm font-semibold text-zinc-200">Allow Public Registrations</span>
                                <p className="text-xs text-zinc-500">Allow new seeker or recruiter signups organic.</p>
                            </div>
                            <Switch isSelected={publicSignups} onChange={setPublicSignups} />
                        </div>
                    </div>
                </Card>

                {/* Notifications & System Settings */}
                <Card className="p-6 bg-zinc-900 border border-white/5 rounded-[28px] shadow-2xl space-y-6">
                    <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2 border-b border-zinc-800 pb-3">
                        <Bell className="w-5 h-5 text-indigo-400" /> Notifications & Limits
                    </h2>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                        <TextField name="maxJobsFree" className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Free Recruiter Active Jobs Limit</Label>
                            <Input
                                type="number"
                                defaultValue="3"
                                className="w-full bg-[#121214] border border-zinc-800 text-white rounded-xl h-11 px-4 text-sm"
                            />
                        </TextField>

                        <TextField name="maxApplicationsFree" className="flex flex-col gap-1.5">
                            <Label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Free Seeker Monthly Applications Limit</Label>
                            <Input
                                type="number"
                                defaultValue="3"
                                className="w-full bg-[#121214] border border-zinc-800 text-white rounded-xl h-11 px-4 text-sm"
                            />
                        </TextField>
                    </div>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="submit" className="bg-white text-black font-semibold rounded-xl px-6 h-11">
                        Save Configuration
                    </Button>
                </div>
            </form>
        </div>
    );
}
