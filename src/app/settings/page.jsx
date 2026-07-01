'use client';

import React, { useState } from 'react';
import { Card, Button, Switch, TextField, Label, Input } from '@heroui/react';
import { Gear, Bell, ShieldKeyhole, Eye } from '@gravity-ui/icons';
import { authClient } from '@/lib/auth-client';

export default function SettingsPage() {
    const { data: session, isPending } = authClient.useSession();
    const [pushNotif, setPushNotif] = useState(true);
    const [emailNotif, setEmailNotif] = useState(true);
    const [marketingNotif, setMarketingNotif] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        alert("Account settings saved successfully!");
    };

    if (isPending) {
        return (
            <div className="flex min-h-screen justify-center items-center text-zinc-400">
                Loading settings...
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="flex min-h-screen justify-center items-center text-zinc-400">
                Please sign in to access settings.
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6 text-white min-h-screen py-12">
            <div className="flex flex-col gap-2 border-b border-zinc-900 pb-6">
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                    <Gear className="w-8 h-8 text-fuchsia-400" /> Account Settings
                </h1>
                <p className="text-zinc-400 text-sm">
                    Configure notifications preferences, platform privacy, and system security flags.
                </p>
            </div>

            <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                {/* Notification Settings */}
                <Card className="p-6 bg-zinc-900 border border-white/5 rounded-[28px] shadow-2xl space-y-6">
                    <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2 border-b border-zinc-800 pb-3">
                        <Bell className="w-5 h-5 text-indigo-400" /> Notification Preferences
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm font-semibold text-zinc-200">Push Notifications</span>
                                <p className="text-xs text-zinc-500">Get alerts on application status change immediately.</p>
                            </div>
                            <Switch isSelected={pushNotif} onChange={setPushNotif} />
                        </div>
                        <hr className="border-zinc-800" />
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm font-semibold text-zinc-200">Email Updates</span>
                                <p className="text-xs text-zinc-500">Receive weekly digests and marketing alerts.</p>
                            </div>
                            <Switch isSelected={emailNotif} onChange={setEmailNotif} />
                        </div>
                    </div>
                </Card>

                {/* Privacy and Security Settings */}
                <Card className="p-6 bg-zinc-900 border border-white/5 rounded-[28px] shadow-2xl space-y-6">
                    <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2 border-b border-zinc-800 pb-3">
                        <ShieldKeyhole className="w-5 h-5 text-indigo-400" /> Privacy & Visibility
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-sm font-semibold text-zinc-200">Public Profile visibility</span>
                                <p className="text-xs text-zinc-500">Allow employers to search and view your credentials organic.</p>
                            </div>
                            <Switch isSelected={marketingNotif} onChange={setMarketingNotif} />
                        </div>
                    </div>
                </Card>

                <div className="flex justify-end gap-3">
                    <Button type="submit" className="bg-white text-black font-semibold rounded-xl px-6 h-11">
                        Save Settings
                    </Button>
                </div>
            </form>
        </div>
    );
}
