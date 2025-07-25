import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
            {/* Redirect root to default project */}
            <Route path="/" element={<Navigate to="/services/testnet/airchains" replace />} />
            
            {/* Dynamic routes using :project parameter */}
            <Route path="/services/testnet/:project" element={<ManualInstallationPage />} />
            <Route path="/services/testnet/:project/api-sync" element={<ApiSyncPage />} />
            <Route path="/services/testnet/:project/automatic-installation" element={<AutomaticInstallationPage />} />
            <Route path="/services/testnet/:project/create-wallet" element={<CreateWalletPage />} />
            <Route path="/services/testnet/:project/create-validator" element={<CreateValidatorPage />} />
            <Route path="/services/testnet/:project/monitoring" element={<MonitoringPage />} />
            <Route path="/services/testnet/:project/security" element={<SecurityPage />} />
            <Route path="/services/testnet/:project/delete-node" element={<DeleteNodePage />} />
            <Route path="/services/testnet/:project/upgrade" element={<UpgradePage />} />
            <Route path="/services/testnet/:project/cheat-sheet" element={<CheatSheetPage />} />
            <Route path="/services/testnet/:project/public-rpc-scanner" element={<PublicRpcScannerPage />} />
          </Routes>
        </main>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
