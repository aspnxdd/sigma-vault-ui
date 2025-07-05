import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-zinc-900 via-slate-900 to-zinc-900 border-b border-zinc-700/50 sticky top-0 z-50 backdrop-blur-xl shadow-lg shadow-black/20">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 lg:h-20">
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg lg:text-xl">
                  Σ
                </span>
              </div>
              <h2 className="text-xl lg:text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                Sigma Vault
              </h2>
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <ConnectButton showBalance={false} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
