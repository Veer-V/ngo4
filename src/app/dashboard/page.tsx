"use client";

import React, { useState } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { contract } from "@/lib/contract";
import { uploadToPinata } from "@/lib/pinata";
import SankeyTracker from "@/components/SankeyTracker";
import { Upload, CheckCircle, Shield, FileText } from "lucide-react";

// Inline components if shadcn not fully set up
const SimpleCard = ({ title, value, icon: Icon }: { title: string, value: string, icon: React.ElementType }) => (
    <div className="bg-card border border-border p-6 rounded-xl flex items-center justify-between">
        <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
        </div>
        <div className="p-3 bg-emerald-500/10 rounded-full">
            <Icon className="w-6 h-6 text-emerald-500" />
        </div>
    </div>
);

export default function DashboardPage() {
    const account = useActiveAccount();
    const { mutate: sendTransaction, isPending } = useSendTransaction();
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string>("");

    const handleMint = async () => {
        if (!file || !account) return;
        setStatus("Uploading to Pinata...");

        try {
            const cid = await uploadToPinata(file);
            setStatus("Minting NFT...");

            const transaction = prepareContractCall({
                contract,
                method: "function mintDocument(address to, string memory cid)",
                params: [account.address, cid],
            });

            sendTransaction(transaction, {
                onSuccess: () => {
                    setStatus("Success! Document Minted.");
                    setFile(null);
                },
                onError: (err) => {
                    console.error(err);
                    setStatus("Error minting document.");
                }
            });
        } catch (error) {
            console.error(error);
            setStatus("Upload failed.");
        }
    };

    return (
        <div className="space-y-8">
            {/* Header Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <SimpleCard title="Total Funds Locked" value="$2,450,000" icon={Shield} />
                <SimpleCard title="Active Projects" value="12" icon={CheckCircle} />
                <SimpleCard title="Documents Secured" value="1,284" icon={FileText} />
                <SimpleCard title="Verified Impact" value="$1.8M" icon={CheckCircle} />
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-8 md:grid-cols-2">

                {/* Sankey Tracker */}
                <div className="md:col-span-2">
                    <SankeyTracker />
                </div>

                {/* Upload & Mint */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4 text-emerald-400">Mint Impact Document</h3>
                    <p className="text-sm text-gray-400 mb-4">Upload grant receipts or project evidence. This will mint a Soulbound NFT.</p>

                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:border-emerald-500/50 transition-colors">
                            <Upload className="w-10 h-10 text-gray-500 mb-2" />
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="hidden"
                                id="file-upload"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer text-emerald-500 font-medium hover:underline">
                                {file ? file.name : "Choose a file"}
                            </label>
                            <p className="text-xs text-gray-500 mt-2">PDF, PNG, JPG (Max 50MB)</p>
                        </div>

                        <button
                            onClick={handleMint}
                            disabled={!file || !account || isPending}
                            className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition-opacity ${!file || !account || isPending ? "bg-gray-700 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"
                                }`}
                        >
                            {isPending ? "Processing..." : "Secure & Mint"}
                        </button>

                        {status && <p className="text-sm text-center text-emerald-400">{status}</p>}
                    </div>
                </div>

                {/* Recent Activity Mock */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4 text-emerald-400">Recent Audit Logs</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <div>
                                        <p className="text-sm font-medium text-white">Milestone Released: Water Well</p>
                                        <p className="text-xs text-gray-500">2 hours ago • By Auditor 0x12..34</p>
                                    </div>
                                </div>
                                <span className="text-emerald-500 text-sm font-mono">+ $50,000</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
