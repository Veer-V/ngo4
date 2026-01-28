# ChainTrust: Secure Loan & Grant Documentation

ChainTrust is a blockchain-based platform ensuring transparent, tamper-proof tracking of donations and grants using **Polygon** and **Zero-Knowledge Proof** concepts.

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** (v18+)
- **MetaMask Wallet** (Add "Polygon Amoy Testnet")

### 2. Deploy Smart Contract
The logic lives in `contracts/ImpactPassport.sol`. To deploy it to the blockchain:

```bash
# From project root
npx thirdweb deploy
```
1.  Select `contracts/ImpactPassport.sol`.
2.  Follow the link to the Thirdweb Dashboard.
3.  Connect MetaMask and click **Deploy Now**.
4.  **COPY the Contract Address** after deployment.

### 3. Configure App
Create a `.env.local` file in the `chaintrust` folder:
```env
NEXT_PUBLIC_TEMPLATE_CLIENT_ID=<Your Thirdweb Client ID>
NEXT_PUBLIC_CONTRACT_ADDRESS=<Deployed Contract Address from Step 2>
NEXT_PUBLIC_PINATA_JWT=<Your Pinata JWT>
```

### 4. Run Frontend
Start the "Mission Control" dashboard to interact with the blockchain:
```bash
cd chaintrust
npm run dev
```
Visit [http://localhost:3000/dashboard](http://localhost:3000/dashboard).

### 5. Testing & Verification
To run the automated test suite:
```bash
npm test
```

### 6. Production Build
To build and start the application for production:
```bash
npm run build
npm start
```

## 🛠️ How to "See" the Tokens
1.  **Minting**: Go to **Dashboard** -> Upload a file -> Click "Secure & Mint". This creates the token on-chain.
2.  **Viewing**: Go to **Documents** (`/dashboard/documents`). Your soulbound tokens will appear here.
3.  **On-Chain**: Copy your wallet address and paste it into [PolygonScan Amoy](https://amoy.polygonscan.com/) to see the raw token transactions.
