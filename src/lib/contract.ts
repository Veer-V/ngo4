import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { client } from "./client";

// Local Hardhat Network
export const chain = defineChain(1337);

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000"; // Replace after deployment

export const contract = getContract({
    client,
    chain,
    address: contractAddress,
});
