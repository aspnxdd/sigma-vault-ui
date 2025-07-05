export interface VaultData {
  id: string;
  vault: string;
  strategy: string;
  tvl: string;
  totalApr: string;
  balance: string;
  icon: string;
  description: string;
  tokens: {
    primary: {
      name: string;
      symbol: string;
      image: string;
    };
    secondary: {
      name: string;
      symbol: string;
      image: string;
    };
  };
  riskLevel: 'Low' | 'Medium' | 'High';
  protocolInfo: {
    name: string;
    website: string;
    audit: boolean;
  };
}

export interface VaultDetailProps {
  vaultId: string;
}
