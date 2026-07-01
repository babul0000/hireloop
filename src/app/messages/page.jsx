'use client';

import React, { useState } from 'react';
import { Card, Button, Avatar } from '@heroui/react';
import { Envelope, Person, At, Compass } from '@gravity-ui/icons';

const mockConversations = [
    {
        id: 1,
        name: 'Sarah Connor',
        role: 'Recruiter at Acme Corp',
        avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=4',
        lastMessage: 'We reviewed your profile and would love to schedule a technical screening.',
        time: '2h ago',
        messages: [
            { sender: 'them', text: 'Hi! Thanks for applying to our Senior Frontend Engineer opening.', time: '10:15 AM' },
            { sender: 'me', text: 'Hello Sarah! Thank you for reaching out. I would be happy to discuss details.', time: '10:30 AM' },
            { sender: 'them', text: 'Great! We reviewed your profile and would love to schedule a technical screening.', time: '10:45 AM' }
        ]
    },
    {
        id: 2,
        name: 'David Lightman',
        role: 'Engineering Manager at Supabase',
        avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=5',
        lastMessage: 'Got the link to your project. I will check it out and sync back by Friday.',
        time: '1d ago',
        messages: [
            { sender: 'me', text: 'Hi David, here is the repo link with my implementation.', time: 'Yesterday' },
            { sender: 'them', text: 'Got the link to your project. I will check it out and sync back by Friday.', time: 'Yesterday' }
        ]
    }
];

export default function MessagesPage() {
    const [conversations, setConversations] = useState(mockConversations);
    const [activeConvId, setActiveConvId] = useState(1);
    const [newMessage, setNewMessage] = useState('');

    const activeConv = conversations.find(c => c.id === activeConvId);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const updated = conversations.map(c => {
            if (c.id === activeConvId) {
                return {
                    ...c,
                    lastMessage: newMessage,
                    time: 'Just now',
                    messages: [
                        ...c.messages,
                        { sender: 'me', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
                    ]
                };
            }
            return c;
        });

        setConversations(updated);
        setNewMessage('');
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6 text-white min-h-screen py-12">
            <div className="flex flex-col gap-2 border-b border-zinc-900 pb-6">
                <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                    <Envelope className="w-8 h-8 text-fuchsia-400" /> Messages
                </h1>
                <p className="text-zinc-400 text-sm">
                    Communicate directly with hiring companies and recruiter networks.
                </p>
            </div>

            {/* Chat layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 border border-zinc-800 rounded-3xl overflow-hidden bg-zinc-950/40 h-[600px] shadow-2xl">
                
                {/* Conversations Sidebar List */}
                <div className="border-r border-zinc-800/80 p-4 space-y-4 overflow-y-auto">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block px-2">Conversations</span>
                    <div className="space-y-2">
                        {conversations.map((conv) => (
                            <button
                                key={conv.id}
                                onClick={() => setActiveConvId(conv.id)}
                                className={`w-full text-left p-3.5 rounded-2xl flex gap-3 transition-colors ${
                                    activeConvId === conv.id
                                        ? 'bg-white/5 border border-white/10'
                                        : 'hover:bg-zinc-900/40 border border-transparent'
                                }`}
                            >
                                <Avatar src={conv.avatar} alt={conv.name} className="w-10 h-10 shrink-0 bg-zinc-800" />
                                <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="font-semibold text-sm text-zinc-200 block truncate">{conv.name}</span>
                                        <span className="text-[10px] text-zinc-500 shrink-0">{conv.time}</span>
                                    </div>
                                    <span className="text-xs text-zinc-400 block truncate">{conv.lastMessage}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Chat Box area */}
                {activeConv ? (
                    <div className="flex flex-col h-full bg-[#0d0d0f]/60">
                        {/* Conversation Header */}
                        <div className="p-4 border-b border-zinc-800/80 flex items-center gap-3 bg-zinc-900/20">
                            <Avatar src={activeConv.avatar} alt={activeConv.name} className="w-10 h-10 bg-zinc-800" />
                            <div>
                                <h3 className="font-bold text-sm text-zinc-200 leading-tight">{activeConv.name}</h3>
                                <span className="text-xs text-zinc-500 mt-0.5">{activeConv.role}</span>
                            </div>
                        </div>

                        {/* Messages List Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {activeConv.messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex flex-col max-w-[70%] space-y-1 ${
                                        msg.sender === 'me' ? 'ml-auto items-end' : 'mr-auto items-start'
                                    }`}
                                >
                                    <div
                                        className={`p-3 rounded-2xl text-sm ${
                                            msg.sender === 'me'
                                                ? 'bg-purple-600 text-white rounded-br-none'
                                                : 'bg-zinc-800 text-zinc-200 rounded-bl-none'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                    <span className="text-[9px] text-zinc-500 px-1">{msg.time}</span>
                                </div>
                            ))}
                        </div>

                        {/* Input Footer Form */}
                        <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-800/80 bg-zinc-900/20 flex gap-3">
                            <input
                                type="text"
                                placeholder="Type your message here..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1 bg-[#121214] border border-zinc-800 text-white rounded-xl h-11 px-4 text-sm placeholder:text-zinc-500 focus:border-zinc-700 outline-none transition"
                            />
                            <Button type="submit" className="bg-white text-black font-semibold rounded-xl h-11 px-6">
                                Send
                            </Button>
                        </form>
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center text-zinc-500 h-full">
                        <Compass className="w-12 h-12 text-zinc-600 mb-2" />
                        <span>Select a conversation to start chatting</span>
                    </div>
                )}
            </div>
        </div>
    );
}
