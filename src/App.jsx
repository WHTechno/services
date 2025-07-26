import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
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

function ProjectLayout() {
  return (
    <div className="flex flex-1 container max-w-screen-2xl mx-auto">
      <Sidebar />
      <main className="flex-grow md:pl-8 py-6 w-full overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <Routes>
        {/* Redirect root to default project */}
        <Route path="/" element={<Navigate to="/services/testnet/airchains" replace />} />
        <Route path="/services/:network/:project/*" element={<ProjectLayout />}>
          <Route index element={<ManualInstallationPage />} />
          <Route path="api-sync" element={<ApiSyncPage />} />
          <Route path="automatic-installation" element={<AutomaticInstallationPage />} />
          <Route path="create-wallet" element={<CreateWalletPage />} />
          <Route path="create-validator" element={<CreateValidatorPage />} />
          <Route path="monitoring" element={<MonitoringPage />} />
          <Route path="security" element={<SecurityPage />} />
          <Route path="delete-node" element={<DeleteNodePage />} />
          <Route path="upgrade" element={<UpgradePage />} />
          <Route path="cheat-sheet" element={<CheatSheetPage />} />
          <Route path="public-rpc-scanner" element={<PublicRpcScannerPage />} />
        </Route>
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
