"use client";

import React, { useState } from "react";
import { useReadContract, useSendTransaction, useActiveAccount } from "thirdweb/react";
import { prepareContractCall, toWei } from "thirdweb";
import { contract } from "@/lib/contract";
import { Loader2, Heart, ExternalLink } from "lucide-react";

export default function DonatePage() {
    const account = useActiveAccount();
    const { mutate: sendTransaction, isPending } = useSendTransaction();
    const [amount, setAmount] = useState<string>("");
    const [selectedProject, setSelectedProject] = useState<number | null>(null);

    // TODO: Ideally verify this matches your contract's "projects" mapping structure
    // Since simple mappings are hard to iterate in Solidity without a helper, 
    // we often use an event indexinger. For now, we'll try to fetch project #1 as a demo
    // or you could add a 'getProject(id)' helper to your contract.
    // For this prototype, let's assume Project ID 1 exists.

    // In a real app, you'd use a subgraph or loop through IDs 1..projectCounter
    const { data: project1, isLoading, error } = useReadContract({
        contract,
        method: "function projects(uint256) view returns (uint256 id, string name, address wallet, uint256 totalFunds, uint256 currentBalance, uint256 releasedFunds, uint256 milestoneCount)",
        params: [1n]
    });

    if (error) {
        console.error("Read Error:", error);
    }

    const handleDonate = () => {
        if (!selectedProject || !amount || !account) return;

        try {
            const transaction = prepareContractCall({
                contract,
                method: "function donate(uint256 projectId) payable",
                params: [BigInt(selectedProject)],
                value: toWei(amount),
            });

            sendTransaction(transaction, {
                onSuccess: () => {
                    alert("Thank you for your donation!");
                    setAmount("");
                    setSelectedProject(null);
                },
                onError: (err) => {
                    console.error(err);
                    alert("Donation failed. See console.");
                }
            });
        } catch (error) {
            console.error("Preparation error:", error);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <header>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    Support a Cause
                </h1>
                <p className="text-gray-400 mt-2">
                    Directly fund verified projects on the blockchain. 100% transparency.
                </p>
            </header>

            {isLoading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Demo Project Card */}
                    {project1 && project1[0] !== 0n ? (
                        <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-pink-500/50 transition-all group">
                            <div className="h-48 bg-slate-800 relative">
                                {/* Placeholder Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                                    [Project Image]
                                </div>
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs font-mono text-emerald-400 border border-emerald-500/30">
                                    VERIFIED
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{project1[1]}</h3>
                                    <p className="text-sm text-gray-400 font-mono truncate">Wallet: {project1[2]}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 bg-slate-900/50 p-4 rounded-lg">
                                    <div>
                                        <p className="text-xs text-gray-500">Raised</p>
                                        <p className="text-lg font-mono text-emerald-400">
                                            {/* Need a helper provided by thirdweb or ethers to format this, mostly likely it is in wei */}
                                            {project1[4].toString()} WEI
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Released</p>
                                        <p className="text-lg font-mono text-blue-400">
                                            {project1[5].toString()} WEI
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-border">
                                    <label className="text-sm font-medium text-gray-300">Donate Amount (ETH)</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            placeholder="0.01"
                                            step="0.01"
                                            value={selectedProject === Number(project1[0]) ? amount : ""}
                                            onChange={(e) => {
                                                setSelectedProject(Number(project1[0]));
                                                setAmount(e.target.value);
                                            }}
                                            className="bg-background border border-border rounded-lg px-4 py-2 w-full focus:outline-none focus:border-pink-500 transition-colors"
                                        />
                                        <button
                                            onClick={handleDonate}
                                            disabled={isPending || !amount || selectedProject !== Number(project1[0])}
                                            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-bold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {isPending && selectedProject === Number(project1[0]) ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <Heart className="w-5 h-5 fill-current" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="col-span-2 text-center py-12 text-gray-500">
                            <p>No projects found. Please deploy the contract and create a project (ID: 1).</p>
                            {error && (
                                <p className="text-red-500 text-sm mt-2">
                                    Debug Error: {error.message}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
