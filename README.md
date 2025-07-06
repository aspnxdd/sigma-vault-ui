# Sigma Vault UI

A modern DeFi vault management interface built for **ETHGlobal Hackathon** with **Euler** sponsorship. This application provides users with an intuitive way to deposit, withdraw, and monitor their crypto assets across various liquidity strategies using Euler's infrastructure.

> 🏆 **ETHGlobal Hackathon Project** - Built with Euler Protocol integration for advanced DeFi vault management

## 🎯 Hackathon Challenge

This project addresses the need for a user-friendly interface to interact with complex DeFi protocols, specifically focusing on:
- **Euler Protocol Integration**: Leveraging Euler's lending and borrowing capabilities
- **Vault Management**: Simplified interface for managing multi-token positions
- **Real-time Analytics**: Live data from Euler's pools and lending markets
- **User Experience**: Making DeFi accessible to both beginners and advanced users

## 🚀 Features

- **Euler Protocol Integration**: Direct integration with Euler's lending pools and markets
- **Multi-Token Vault Management**: Support for dual-token vaults with comprehensive deposit/withdrawal interfaces
- **Real-Time Balance Integration**: Live token balance fetching using wagmi and viem
- **Modern Wallet Integration**: Seamless connection with RainbowKit supporting multiple wallet providers
- **Responsive Dashboard**: Clean, modern UI with vault performance metrics and portfolio overview
- **Live Contract Interaction**: Direct integration with Euler and token vault smart contracts
- **Real-Time Data**: Live vault statistics including volumes, amounts, and swap counts from Euler pools

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS with custom gradients and animations
- **Blockchain**: wagmi v2 + viem for Ethereum interaction
- **DeFi Protocol**: Euler Protocol for lending and borrowing
- **Wallet**: RainbowKit for wallet connection management
- **TypeScript**: Full type safety throughout the application
- **State Management**: React hooks with real-time contract data
- **Data Sources**: tRPC for type-safe API calls to Euler data

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sigma-vault-ui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Dashboard homepage
│   ├── providers.tsx      # Wagmi & RainbowKit providers
│   └── vault/[id]/        # Dynamic vault detail pages
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation with wallet connect
│   ├── VaultTable.tsx     # Main vault listing table
│   ├── VaultDetail.tsx    # Vault detail page container
│   ├── DepositInterface.tsx # Deposit/withdraw interface
│   ├── TokenInput.tsx     # Token amount input component
│   └── ...               # Other vault-related components
├── lib/                   # Utilities and configurations
│   ├── types.ts          # TypeScript type definitions
│   ├── utils.ts          # Helper functions
│   ├── tokenVaultAbi.ts  # Smart contract ABI
│   └── vaultData.ts      # Mock vault data
└── styles/               # Global styles
```

## 🔧 Key Components

### Dashboard (`/`)
- **VaultTable**: Displays all available vaults with real-time data
- **Summary Cards**: Portfolio overview with total value and statistics
- **Interactive Rows**: Click-through navigation to individual vault pages

### Vault Detail (`/vault/[id]`)
- **VaultHeader**: Vault name, strategy, and key metrics
- **VaultMetrics**: TVL, APR, risk level, and performance indicators
- **VaultAssets**: Shows user's deposited assets (when available)
- **DepositInterface**: Tabbed interface for deposits and withdrawals
- **Performance Chart**: Visual representation of vault performance

### Deposit/Withdraw Interface
- **Dual-Token Input**: Always shows both token inputs with validation
- **Real-Time Balances**: Fetches live ERC20 token balances
- **Smart Validation**: Prevents overdrafts and invalid amounts
- **Readonly Withdrawals**: Shows withdrawable amounts in withdraw mode
- **Contract Integration**: Handles token approvals and vault transactions

## 🔐 Smart Contract Integration

The application integrates with Euler Protocol and token vault smart contracts supporting:

- **Euler Pool Data**: Real-time data from Euler's lending pools
- **Multi-token deposits**: Deposit pairs of ERC20 tokens into vaults
- **Withdrawal management**: Withdraw deposited assets from Euler-backed vaults
- **Balance tracking**: Real-time balance and deposit monitoring via Euler's infrastructure
- **Allowance handling**: Automatic token approval management for Euler interactions

## 🎨 Design Features

- **Modern Glass-morphism**: Backdrop blur effects and gradients
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Dark Theme**: Professional dark mode interface
- **Smooth Animations**: Hover effects and transitions
- **Loading States**: Skeleton loading and loading indicators
- **Visual Feedback**: Success/error states and validation messages

## 🏗️ Euler Integration

This hackathon project showcases innovative use of Euler Protocol:

### Key Integrations:
- **Pool Data Fetching**: Real-time data from Euler's lending pools using tRPC
- **Vault Strategies**: Integration with Euler's lending/borrowing mechanisms
- **Token Analytics**: Display of volume, amounts, and swap data from Euler pools
- **Smart Contract Interface**: Direct interaction with Euler's smart contracts

### Euler Features Utilized:
- **Multi-asset Support**: Leveraging Euler's support for various ERC-20 tokens
- **Risk Management**: Utilizing Euler's risk assessment for vault strategies
- **Yield Optimization**: Building on Euler's efficient capital utilization
- **Permissionless Listing**: Taking advantage of Euler's open token listing

## 🚀 Getting Started for Development

1. **Environment Setup**: Ensure you have Node.js 18+ installed
2. **Wallet Setup**: Install MetaMask or another supported wallet
3. **Network Configuration**: The app is configured for Ethereum mainnet with Euler Protocol
4. **Euler Integration**: The app connects to Euler's pools and lending markets
5. **Contract Addresses**: Euler contract addresses are pre-configured

### ETHGlobal Hackathon Setup:
- Fork this repository for your hackathon submission
- The project is ready for demonstration with Euler integration
- All Euler-specific features are documented and functional

## 📖 Usage

1. **Connect Wallet**: Use the connect button in the header
2. **Browse Vaults**: View available vaults on the dashboard
3. **Select Strategy**: Click on a vault to see detailed information
4. **Deposit Assets**: Use the deposit tab to add liquidity
5. **Monitor Performance**: Track your positions and returns
6. **Withdraw**: Use the withdraw tab to remove liquidity

## 🔮 Future Enhancements

- [ ] Advanced Euler yield strategies and automated rebalancing
- [ ] Multi-chain support (Polygon, Arbitrum, etc.) with Euler expansion
- [ ] Advanced portfolio analytics with Euler risk metrics
- [ ] Integration with Euler's governance features
- [ ] Mobile app development for Euler vault management
- [ ] Advanced charting with Euler pool performance data

## 🏆 Hackathon Submission

**ETHGlobal Hackathon Project**
- **Sponsor**: Euler Protocol
- **Category**: DeFi Infrastructure & User Experience
- **Innovation**: Simplified interface for complex DeFi operations using Euler's robust infrastructure

### What Makes This Special:
1. **User-Centric Design**: Makes Euler's powerful features accessible to all users
2. **Real-Time Integration**: Live data from Euler pools and markets
3. **Modern Tech Stack**: Cutting-edge web3 technologies with Euler integration
4. **Comprehensive Solution**: Full vault management lifecycle using Euler Protocol

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **[Euler Protocol](https://euler.finance)** for sponsoring this ETHGlobal hackathon project
- **[ETHGlobal](https://ethglobal.com)** for organizing the hackathon
- [RainbowKit](https://rainbowkit.com) for wallet integration
- [wagmi](https://wagmi.sh) for Ethereum React hooks
- [Next.js](https://nextjs.org) for the React framework
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Viem](https://viem.sh) for Ethereum utilities

---

*Built with ❤️ for ETHGlobal Hackathon using Euler Protocol*
