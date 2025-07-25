import React from 'react';
import { Helmet } from 'react-helmet';
import CodeBlock from '@/components/CodeBlock';
import PageHeader from '@/components/PageHeader';
import { useParams } from 'react-router-dom';
import projects from '@/config/projects';

const ApiSyncPage = () => {
  const { project } = useParams();
  const currentConfig = projects[project] || projects.airchains;

  // If project configuration is not found, display an error
  if (!currentConfig) {
    return (
      <div className="p-6 text-red-500 bg-red-900/20 border border-red-800 rounded-xl">
        <h2 className="text-xl font-bold mb-2">Project Not Found</h2>
        <p>The project configuration for "{project}" was not found. Please select a valid network.</p>
      </div>
    );
  }

  const { apiEndpoints, urls, name, chainId, blockHeight, rpcStatus } = currentConfig;

  return (
    <>
      <Helmet>
        <title>API & Sync | NodeServices</title>
        <meta name="description" content={`Informasi API, RPC, gRPC dan sinkronisasi untuk node ${name}.`} />
      </Helmet>
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 md:p-8">
        <PageHeader 
          title="API & Sync" 
          subtitle={`Gunakan endpoint ini untuk terhubung ke jaringan ${name}.`}
          docsUrl={urls?.docsUrl || "#"}
          chainId={chainId}
          blockHeight={blockHeight}
          rpcStatus={rpcStatus}
          explorerUrl={urls?.explorerUrl || "#"}
        />
        
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Public Endpoints</h2>
        <CodeBlock title="RPC">{apiEndpoints?.rpc || 'No RPC endpoints configured'}</CodeBlock>
        <CodeBlock title="API">{apiEndpoints?.api || 'No API endpoints configured'}</CodeBlock>
        <CodeBlock title="gRPC">{apiEndpoints?.grpc || 'No gRPC endpoints configured'}</CodeBlock>

        {apiEndpoints?.stateSync && (
          <>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Sync with State-Sync</h2>
            <p className="text-slate-400 mb-4">State-sync memungkinkan node baru untuk sinkronisasi dengan cepat.</p>
            <CodeBlock title="Enable State-Sync">{apiEndpoints.stateSync.enableCmd}</CodeBlock>
            <CodeBlock title="Configure RPC Servers">{apiEndpoints.stateSync.rpcServersCmd}</CodeBlock>
            <CodeBlock title="Set Trust Height and Hash">{apiEndpoints.stateSync.trustHeightCmd}</CodeBlock>
            <CodeBlock title="Restart Node">{`sudo systemctl restart ${project}d`}</CodeBlock>
          </>
        )}
      </div>
    </>
  );
};

export default ApiSyncPage;
