"use client";

import React from "react";
import { ArrowRight, CheckCircle, Lock, Coins, FileText, Database } from "lucide-react";

const steps = [
    {
        title: "Donation Initiated",
        description: "Donor contributes funds (Fiat/Crypto). Identity is hashed via ZK-Shield.",
        icon: Coins,
        color: "bg-blue-500",
    },
    {
        title: "Smart Contract Escrow",
        description: "Funds are locked in the ChainTrust Contract. Programmable release conditions are set.",
        icon: Lock,
        color: "bg-purple-500",
    },
    {
        title: "Token Minting",
        description: "An 'Impact Certificate' (ERC-1155 NFT) is minted to the donor's wallet as proof.",
        icon: FileText,
        color: "bg-emerald-500",
    },
    {
        title: "Milestone Verified",
        description: "Auditors or IoT sensors verify project progress (e.g. 'Foundation Laid').",
        icon: CheckCircle,
        color: "bg-orange-500",
    },
    {
        title: "Funds Released",
        description: "Smart Contract unlocks the next tranche of funds to the NGO/Vendor.",
        icon: ArrowRight,
        color: "bg-green-600",
    },
];

export default function TrackerPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Impact Lifecycle Tracker</h2>
                <p className="text-muted-foreground">Visualizing how every cent travels from donor to impact.</p>
            </div>

            <div className="relative border-l-2 border-emerald-500/30 ml-6 md:ml-12 space-y-12 py-4">
                {steps.map((step, index) => (
                    <div key={index} className="relative pl-8 md:pl-16">
                        {/* Timeline Dot */}
                        <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-slate-900 ${step.color} shadow-[0_0_10px_rgba(16,185,129,0.5)]`} />

                        <div className="bg-card border border-border rounded-xl p-6 transition-all hover:border-emerald-500/50">
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-lg ${step.color}/10 shrink-0`}>
                                    <step.icon className={`w-6 h-6 ${step.color.replace('bg-', 'text-')}`} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">
                                        {index + 1}. {step.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Technical View Box */}
            <div className="mt-12 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    On-Chain Technical Flow
                </h3>
                <div className="font-mono text-sm text-gray-400 space-y-2">
                    <p><span className="text-purple-400">TransactionHash:</span> 0x8f2...a91 (Funds Locked)</p>
                    <p><span className="text-blue-400">ZKP_Proof:</span> zk-snark-proof-valid (Donor Privacy)</p>
                    <p><span className="text-emerald-400">TokenID:</span> #4021 (Minted to 0xDonor)</p>
                    <p><span className="text-orange-400">ContractState:</span> Awaiting Milestone 2 Approval...</p>
                </div>
            </div>
        </div>
    );
}
