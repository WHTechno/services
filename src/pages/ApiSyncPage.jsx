import React from 'react';
import { Helmet } from 'react-helmet';
import CodeBlock from '@/components/CodeBlock';
import PageHeader from '@/components/PageHeader';

const ApiSyncPage = () => {
  return (
    <>
      <Helmet>
        <title>API & Sync | NodeServices</title>
        <meta name="description" content="Informasi API, RPC, gRPC dan sinkronisasi untuk node Airchains." />
      </Helmet>
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 md:p-8">
        <PageHeader title="API & Sync" subtitle="Gunakan endpoint ini untuk terhubung ke jaringan Airchains." />
        
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Public Endpoints</h2>
        <CodeBlock title="RPC">{`https://rpc-airchains.d-stake.xyz/
https://airchains-rpc.s.chainbase.online/`}</CodeBlock>
        <CodeBlock title="API">{`https://api-airchains.d-stake.xyz/
https://airchains-api.s.chainbase.online/`}</CodeBlock>
        <CodeBlock title="gRPC">{`grpc-airchains.d-stake.xyz:29090`}</CodeBlock>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Sync with State-Sync</h2>
        <p className="text-slate-400 mb-4">State-sync memungkinkan node baru untuk sinkronisasi dengan cepat.</p>
        <CodeBlock title="Enable State-Sync">{`sed -i -e "s|^enable *=.*|enable = true|" $HOME/.junction/config/config.toml`}</CodeBlock>
        <CodeBlock title="Configure RPC Servers">{`RPC_SERVERS="https://rpc-airchains.d-stake.xyz:443,https://rpc-airchains.d-stake.xyz:443"
sed -i -e "s|^rpc_servers *=.*|rpc_servers = \\"$RPC_SERVERS\\"|" $HOME/.junction/config/config.toml`}</CodeBlock>
        <CodeBlock title="Set Trust Height and Hash">{`LATEST_HEIGHT=$(curl -s https://rpc-airchains.d-stake.xyz/block | jq -r .result.block.header.height)
TRUST_HEIGHT=$((LATEST_HEIGHT - 1000))
TRUST_HASH=$(curl -s "https://rpc-airchains.d-stake.xyz/block?height=$TRUST_HEIGHT" | jq -r .result.block_id.hash)
sed -i -e "s|^trust_height *=.*|trust_height = $TRUST_HEIGHT|" $HOME/.junction/config/config.toml
sed -i -e "s|^trust_hash *=.*|trust_hash = \\"$TRUST_HASH\\"|" $HOME/.junction/config/config.toml`}</CodeBlock>
        <CodeBlock title="Restart Node">{`sudo systemctl restart junctiond`}</CodeBlock>
      </div>
    </>
  );
};

export default ApiSyncPage;