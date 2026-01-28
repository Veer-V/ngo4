"use client";

import React, { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction, useActiveAccount } from "thirdweb/react";
import { contract } from "@/lib/contract";

// Mock Projects
const projects = [
    { id: 1, name: "Community School Build", total: 50000, released: 10000, nextMilestone: "Foundation Complete", requestAmount: 15000 },
    { id: 2, name: "Clean Water Initiative", total: 25000, released: 5000, nextMilestone: "Equipment Procurement", requestAmount: 8000 },
];

export default function AuditorPage() {
    const { mutate: sendTransaction, isPending } = useSendTransaction();
    const account = useActiveAccount();
    const [processingId, setProcessingId] = useState<number | null>(null);

    const handleApprove = (projectId: number) => {
        if (!account) {
            alert("Please connect your wallet first!");
            return;
        }
        setProcessingId(projectId);

        // In real app, we pass the milestone index and percentage
        const transaction = prepareContractCall({
            contract,
            method: "function releaseMilestone(uint256 projectId, uint256 milestoneIndex, uint256 releasePercent)",
            // Mocking: ProjectId, Milestone 1, 20% release
            params: [BigInt(projectId), BigInt(1), BigInt(20)]
        });

        sendTransaction(transaction, {
            onSuccess: () => {
                alert("Milestone Approved! Funds Released.");
                setProcessingId(null);
            },
            onError: (err) => {
                console.error(err);
                setProcessingId(null);
            }
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white">Auditor Control Panel</h2>
                <p className="text-muted-foreground">Review evidence and release grant tranches.</p>
            </div>

            <div className="grid gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                                <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                                <span className="bg-orange-500/10 text-orange-400 text-xs px-2 py-0.5 rounded border border-orange-500/20">Action Required</span>
                            </div>

                            <div className="flex gap-8 text-sm text-gray-400">
                                <p>Total Fund: <span className="text-white font-mono">${project.total.toLocaleString()}</span></p>
                                <p>Released: <span className="text-emerald-400 font-mono">${project.released.toLocaleString()}</span></p>
                            </div>

                            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 mt-2">
                                <p className="text-sm text-gray-300 font-medium">Milestone Request: <span className="text-white">{project.nextMilestone}</span></p>
                                <p className="text-xs text-gray-500 mt-1">Evidence: verified by IoT Sensor #8841 (GPS: 12.97, 77.59)</p>
                                <p className="text-sm text-emerald-400 font-bold mt-2">Unlocking: ${project.requestAmount.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-full md:w-auto">
                            <button
                                onClick={() => handleApprove(project.id)}
                                disabled={isPending}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
                            >
                                {processingId === project.id && isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                                Approve & Release
                            </button>
                            <button className="bg-transparent border border-destructive/50 text-destructive hover:bg-destructive/10 px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                                Reject Evidence
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
