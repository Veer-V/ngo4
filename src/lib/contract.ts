import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { client } from "./client";

// Local Hardhat Network
export const chain = defineChain({
    id: 1337,
    rpc: "http://127.0.0.1:8545",
    cancelCompute: false, // Legacy override just in case
});

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000"; // Replace after deployment

export const contract = getContract({
    client,
    chain,
    address: contractAddress,
});
