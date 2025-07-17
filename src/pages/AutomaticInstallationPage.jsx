import React from 'react';
import { Helmet } from 'react-helmet';
import CodeBlock from '@/components/CodeBlock';
import PageHeader from '@/components/PageHeader';

const AutomaticInstallationPage = () => {
  const autoInstallCmd = `wget -O airchains.sh https://api.nodes.guru/airchains.sh && chmod +x airchains.sh && ./airchains.sh`;

  return (
    <>
      <Helmet>
        <title>Automatic Installation | NodeServices</title>
        <meta name="description" content="Instalasi otomatis node Airchains menggunakan skrip." />
      </Helmet>
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 md:p-8">
        <PageHeader title="Automatic Installation" subtitle="Gunakan skrip ini untuk instalasi cepat dan mudah." />
        <p className="text-slate-300 mb-4">
          Skrip berikut akan menginstal semua dependensi yang diperlukan, membangun binary, dan mengkonfigurasi node Anda secara otomatis.
        </p>
        <CodeBlock title="Run this command to start automatic installation">
          {autoInstallCmd}
        </CodeBlock>
        <p className="text-slate-400 mt-4">
          Setelah menjalankan skrip, Anda akan diminta untuk memasukkan nama node (moniker) Anda. Ikuti petunjuk di layar untuk menyelesaikan instalasi.
        </p>
      </div>
    </>
  );
};

export default AutomaticInstallationPage;