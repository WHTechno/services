import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/PageHeader';
import { CheckCircle, XCircle } from 'lucide-react';

const PublicRpcScannerPage = () => {
  const rpcList = [
    { url: 'https://rpc-airchains.d-stake.xyz/', status: 'active', height: '1,763,801' },
    { url: 'https://airchains-rpc.s.chainbase.online/', status: 'active', height: '1,763,801' },
    { url: 'https://airchains-testnet-rpc.itrocket.net/', status: 'active', height: '1,763,800' },
    { url: 'https://rpc.airchains.test.rpc.org/', status: 'inactive', height: 'N/A' },
    { url: 'https://rpc-t-airchains.nodine.id/', status: 'active', height: '1,763,799' },
  ];

  return (
    <>
      <Helmet>
        <title>Public RPC Scanner | NodeServices</title>
        <meta name="description" content="Daftar RPC publik untuk jaringan Airchains beserta statusnya." />
      </Helmet>
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 md:p-8">
        <PageHeader title="Public RPC Scanner" subtitle="Status RPC publik yang tersedia untuk jaringan Airchains." />
        
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-800/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">RPC Endpoint</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Block Height</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {rpcList.map((rpc, index) => (
                <tr key={index} className="hover:bg-slate-800/40">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-300">{rpc.url}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {rpc.status === 'active' ? (
                      <span className="flex items-center gap-2 text-green-400"><CheckCircle className="w-4 h-4" /> Active</span>
                    ) : (
                      <span className="flex items-center gap-2 text-red-400"><XCircle className="w-4 h-4" /> Inactive</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-300">{rpc.height}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PublicRpcScannerPage;