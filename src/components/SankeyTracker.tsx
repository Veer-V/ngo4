"use client";

import React from "react";
import { Sankey, Tooltip, ResponsiveContainer } from "recharts";

const data = {
    nodes: [
        { name: "Donor Pool" },
        { name: "Impact Escrow" },
        { name: "Project A (Planning)" },
        { name: "Project B (Construction)" },
        { name: "Vendor: Cement" },
        { name: "Vendor: Labor" },
        { name: "Returned Funds" },
    ],
    links: [
        { source: 0, target: 1, value: 1000000 },
        { source: 1, target: 2, value: 200000 },
        { source: 1, target: 3, value: 500000 },
        { source: 2, target: 5, value: 50000 },
        { source: 3, target: 4, value: 300000 },
        { source: 3, target: 5, value: 150000 },
        { source: 1, target: 6, value: 300000 }, // Remaining/Returned
    ],
};

export default function SankeyTracker() {
    return (
        <div className="w-full h-[400px] bg-card/50 rounded-xl border border-border p-4">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Real-Time Fund Flow</h3>
            <ResponsiveContainer width="100%" height="100%">
                <Sankey
                    data={data}
                    node={{ stroke: "none", fill: "#10b981" }} // emerald-500
                    link={{ stroke: "#059669", opacity: 0.3 }} // emerald-600
                >
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#334155", color: "#fff" }} />
                </Sankey>
            </ResponsiveContainer>
        </div>
    );
}
