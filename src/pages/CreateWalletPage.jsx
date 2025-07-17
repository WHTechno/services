import React from 'react';
import { Helmet } from 'react-helmet';
import CodeBlock from '@/components/CodeBlock';
import PageHeader from '@/components/PageHeader';

const CreateWalletPage = () => {
  return (
    <>
      <Helmet>
        <title>Create Wallet | NodeServices</title>
        <meta name="description" content="Panduan untuk membuat atau memulihkan wallet di jaringan Airchains." />
      </Helmet>
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 md:p-8">
        <PageHeader title="Create Wallet" subtitle="Anda dapat membuat wallet baru atau memulihkan yang sudah ada." />
        
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Create a New Wallet</h2>
        <p className="text-slate-300 mb-4">
          Ganti <code data-code-block>MyWallet</code> dengan nama yang Anda inginkan. Simpan mnemonic phrase yang muncul dengan aman.
        </p>
        <CodeBlock title="Create new wallet">{`junctiond keys add MyWallet`}</CodeBlock>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Restore an Existing Wallet</h2>
        <p className="text-slate-300 mb-4">
          Gunakan perintah ini jika Anda sudah memiliki mnemonic phrase.
        </p>
        <CodeBlock title="Restore wallet">{`junctiond keys add MyWallet --recover`}</CodeBlock>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Check Wallet Balance</h2>
        <p className="text-slate-300 mb-4">
          Setelah membuat atau memulihkan, Anda bisa memeriksa saldo.
        </p>
        <CodeBlock title="Check balance">{`junctiond query bank balances $(junctiond keys show MyWallet -a)`}</CodeBlock>
      </div>
    </>
  );
};

export default CreateWalletPage;