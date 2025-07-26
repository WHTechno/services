import React from 'react';
import { Helmet } from 'react-helmet';
import CodeBlock from '@/components/CodeBlock';
import PageHeader from '@/components/PageHeader';
import { useParams } from 'react-router-dom';
import { getProjectConfig } from '@/config/projects/getProjectConfig';

const CreateWalletPage = () => {
  const { network, project } = useParams();
  const currentConfig = getProjectConfig(network, project);

  if (!currentConfig) {
    return (
      <div className="p-6 text-red-500 bg-red-900/20 border border-red-800 rounded-xl">
        <h2 className="text-xl font-bold mb-2">Project Not Found</h2>
        <p>The project configuration for "{network}/{project}" was not found. Please select a valid network.</p>
      </div>
    );
  }

  // Use binary name from config if available, fallback to 'junctiond'
  const binary = currentConfig?.commands?.binaryName || 'junctiond';

  return (
    <>
      <Helmet>
        <title>Create Wallet | NodeServices</title>
        <meta name="description" content={`Panduan untuk membuat atau memulihkan wallet di jaringan ${currentConfig.name}.`} />
      </Helmet>
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 md:p-8">
        <PageHeader title="Create Wallet" subtitle="Anda dapat membuat wallet baru atau memulihkan yang sudah ada." />
        
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Create a New Wallet</h2>
        <p className="text-slate-300 mb-4">
          Ganti <code data-code-block>MyWallet</code> dengan nama yang Anda inginkan. Simpan mnemonic phrase yang muncul dengan aman.
        </p>
        <CodeBlock title="Create new wallet">{`${binary} keys add MyWallet`}</CodeBlock>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Restore an Existing Wallet</h2>
        <p className="text-slate-300 mb-4">
          Gunakan perintah ini jika Anda sudah memiliki mnemonic phrase.
        </p>
        <CodeBlock title="Restore wallet">{`${binary} keys add MyWallet --recover`}</CodeBlock>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Check Wallet Balance</h2>
        <p className="text-slate-300 mb-4">
          Setelah membuat atau memulihkan, Anda bisa memeriksa saldo.
        </p>
        <CodeBlock title="Check balance">{`${binary} query bank balances $(${binary} keys show MyWallet -a)`}</CodeBlock>
      </div>
    </>
  );
};

export default CreateWalletPage;