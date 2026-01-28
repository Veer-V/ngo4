"use client";

import React from "react";
import { FileText, Download, ExternalLink } from "lucide-react";

// Mock Data - In real app, fetch from specific contract events or Subgraph
const documents = [
    { id: 1, name: "Donation Receipt #1024", type: "Tax Benefit", date: "2024-10-15", cid: "QmHash123...", status: "Verified" },
    { id: 2, name: "Project Blueprint: School", type: "Project Plan", date: "2024-11-01", cid: "QmHash456...", status: "Pending Audit" },
    { id: 3, name: "Cement Purchase Invoice", type: "Expense", date: "2024-11-20", cid: "QmHash789...", status: "Verified" },
];

export default function DocumentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">My Impact Usage Assets</h2>
                    <p className="text-muted-foreground">Soulbound tokens representing your secured documentation.</p>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Sync Wallet
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents.map((doc) => (
                    <div key={doc.id} className="bg-card border border-border rounded-xl overflow-hidden group hover:border-emerald-500/50 transition-all">
                        <div className="h-32 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border-b border-border group-hover:from-emerald-900/20 group-hover:to-slate-900">
                            <FileText className="w-12 h-12 text-slate-600 group-hover:text-emerald-500 transition-colors" />
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-white truncate">{doc.name}</h3>
                                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">{doc.type}</span>
                                </div>
                                {doc.status === "Verified" && (
                                    <span className="text-emerald-500 text-xs font-bold border border-emerald-500/30 px-2 py-0.5 rounded-full bg-emerald-500/10">✓ On-Chain</span>
                                )}
                            </div>

                            <p className="text-xs text-gray-500 mb-4">Minted: {doc.date}</p>

                            <div className="flex gap-2">
                                <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-sm py-2 rounded flex items-center justify-center gap-2 transition-colors">
                                    <Download className="w-4 h-4" /> Download
                                </button>
                                <button className="flex-1 border border-slate-700 hover:bg-slate-800 text-gray-300 text-sm py-2 rounded flex items-center justify-center gap-2 transition-colors">
                                    <ExternalLink className="w-4 h-4" /> View IPFS
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
