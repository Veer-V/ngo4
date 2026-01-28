"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/client";
import { LayoutDashboard, FileText, Activity, ShieldCheck, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
        { name: "Documents", icon: FileText, href: "/dashboard/documents" },
        { name: "Impact Tracker", icon: Activity, href: "/dashboard/tracker" },
        { name: "Auditor Panel", icon: ShieldCheck, href: "/dashboard/auditor" },
    ];

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {/* Sidebar */}
            <aside
                className={cn(
                    "bg-card border-r border-border transition-all duration-300",
                    sidebarOpen ? "w-64" : "w-16"
                )}
            >
                <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                    {sidebarOpen && <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">ChainTrust</span>}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-muted rounded">
                        <Menu className="w-5 h-5" />
                    </button>
                </div>

                <nav className="mt-4 px-2 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors"
                        >
                            <item.icon className="w-5 h-5" />
                            {sidebarOpen && <span>{item.name}</span>}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-8">
                    <h1 className="text-lg font-medium text-emerald-500">Mission Control</h1>
                    <div>
                        <ConnectButton client={client} theme="dark" />
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
