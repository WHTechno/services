import React from 'react';
import { Helmet } from 'react-helmet';
import CodeBlock from '@/components/CodeBlock';
import PageHeader from '@/components/PageHeader';
import { useParams } from 'react-router-dom';
import { getProjectConfig } from '@/config/projects/getProjectConfig';

const AutomaticInstallationPage = () => {
  const { network, project } = useParams();
  const currentConfig = getProjectConfig(network, project);

  // If project configuration is not found, display an error
  if (!currentConfig) {
    return (
      <div className="p-6 text-red-500 bg-red-900/20 border border-red-800 rounded-xl">
        <h2 className="text-xl font-bold mb-2">Project Not Found</h2>
        <p>The project configuration for "{network}/{project}" was not found. Please select a valid network.</p>
      </div>
    );
  }

  const { commands, urls, name, chainId, blockHeight, rpcStatus } = currentConfig;
  const autoInstallCmd = commands.autoInstallCmd;

  return (
    <>
      <Helmet>
        <title>Automatic Installation | NodeServices</title>
        <meta name="description" content={`Instalasi otomatis node ${name} menggunakan skrip.`} />
      </Helmet>
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 md:p-8">
        <PageHeader 
          title="Automatic Installation" 
          subtitle="Gunakan skrip ini untuk instalasi cepat dan mudah."
          docsUrl={urls?.docsUrl || "#"}
          chainId={chainId}
          blockHeight={blockHeight}
          rpcStatus={rpcStatus}
          explorerUrl={urls?.explorerUrl || "#"}
        />
        <p className="text-slate-300 mb-4">
          Skrip berikut akan menginstal semua dependensi yang diperlukan, membangun binary, dan mengkonfigurasi node {name} Anda secara otomatis.
        </p>
        <CodeBlock title="Run this command to start automatic installation">
          {autoInstallCmd}
        </CodeBlock>
        <p className="text-slate-400 mt-4">
          Setelah menjalankan skrip, Anda akan diminta untuk memasukkan nama node (moniker) Anda. Ikuti petunjuk di layar untuk menyelesaikan instalasi {name}.
        </p>
      </div>
    </>
  );
};

export default AutomaticInstallationPage;
