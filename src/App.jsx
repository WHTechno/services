import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import Sidebar from '@/components/Sidebar';
import ManualInstallationPage from '@/pages/ManualInstallationPage';
import AutomaticInstallationPage from '@/pages/AutomaticInstallationPage';
import CreateWalletPage from '@/pages/CreateWalletPage';
import CreateValidatorPage from '@/pages/CreateValidatorPage';
import MonitoringPage from '@/pages/MonitoringPage';
import SecurityPage from '@/pages/SecurityPage';
import DeleteNodePage from '@/pages/DeleteNodePage';
import UpgradePage from '@/pages/UpgradePage';
import CheatSheetPage from '@/pages/CheatSheetPage';
import PublicRpcScannerPage from '@/pages/PublicRpcScannerPage';
import ApiSyncPage from '@/pages/ApiSyncPage';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1 container max-w-screen-2xl mx-auto">
        <Sidebar />
        <main className="flex-grow md:pl-8 py-6 w-full overflow-x-hidden">
          <Routes>
            <Route path="/" element={<ManualInstallationPage />} />
            <Route path="/services/testnet/airchains" element={<ManualInstallationPage />} />
            <Route path="/services/testnet/airchains/api-sync" element={<ApiSyncPage />} />
            <Route path="/services/testnet/airchains/automatic-installation" element={<AutomaticInstallationPage />} />
            <Route path="/services/testnet/airchains/create-wallet" element={<CreateWalletPage />} />
            <Route path="/services/testnet/airchains/create-validator" element={<CreateValidatorPage />} />
            <Route path="/services/testnet/airchains/monitoring" element={<MonitoringPage />} />
            <Route path="/services/testnet/airchains/security" element={<SecurityPage />} />
            <Route path="/services/testnet/airchains/delete-node" element={<DeleteNodePage />} />
            <Route path="/services/testnet/airchains/upgrade" element={<UpgradePage />} />
            <Route path="/services/testnet/airchains/cheat-sheet" element={<CheatSheetPage />} />
            <Route path="/services/testnet/airchains/public-rpc-scanner" element={<PublicRpcScannerPage />} />
          </Routes>
        </main>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;