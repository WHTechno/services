import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/PageHeader';
import { CheckCircle, XCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getProjectConfig } from '@/config/projects/getProjectConfig';

function useRpcHeights(rpcEndpoints) {
  const [heights, setHeights] = useState(() => rpcEndpoints.map(() => null));

  useEffect(() => {
    let cancelled = false;
    async function fetchAllHeights() {
      const results = await Promise.all(
        rpcEndpoints.map(async (rpc) => {
          const baseUrl = rpc.url.replace(/\/$/, '');
          const url = `${baseUrl}/block`;
          try {
            const res = await fetch(url);
            const data = await res.json();
            return data.result?.block?.header?.height || 'N/A';
          } catch {
            return null;
          }
        })
      );
      if (!cancelled) setHeights(results);
    }
    fetchAllHeights();
    const interval = setInterval(fetchAllHeights, 10000);
    return () => { cancelled = true; clearInterval(interval); };
  }, [rpcEndpoints]);

  return heights;
}

function useLiveBlockHeight(config) {
  const [height, setHeight] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchHeight() {
      let url = null;
      if (config.apiEndpoints?.lcd) {
        url = config.apiEndpoints.lcd.replace(/\/$/, '') + '/cosmos/base/tendermint/v1beta1/blocks/latest';
      } else if (config.rpcEndpoints && config.rpcEndpoints.length > 0) {
        url = config.rpcEndpoints[0].url.replace(/\/$/, '') + '/block';
      }
      if (!url) return;
      try {
        const res = await fetch(url);
        const data = await res.json();
        let h = null;
        if (data.block?.header?.height) h = data.block.header.height;
        else if (data.result?.block?.header?.height) h = data.result.block.header.height;
        if (!cancelled) setHeight(h);
      } catch {
        if (!cancelled) setHeight(null);
      }
    }
    fetchHeight();
    const interval = setInterval(fetchHeight, 10000);
    return () => { cancelled = true; clearInterval(interval); };
  }, [config]);

  return height;
}

const PublicRpcScannerPage = () => {
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

  const { rpcEndpoints, urls, name, chainId, blockHeight: staticBlockHeight, rpcStatus } = currentConfig;
  const heights = useRpcHeights(rpcEndpoints || []);
  // Ambil block height pertama yang valid dari daftar heights
  const firstValidHeight = heights.find(h => h !== null && !isNaN(Number(h)));

  return (
    <>
      <Helmet>
        <title>Public RPC Scanner | NodeServices</title>
        <meta name="description" content={`Daftar RPC publik untuk jaringan ${name} beserta statusnya.`} />
      </Helmet>
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 md:p-8">
        <PageHeader 
          title="Public RPC Scanner" 
          subtitle={`Status RPC publik yang tersedia untuk jaringan ${name}.`}
          docsUrl={urls?.docsUrl || "#"}
          chainId={chainId}
          blockHeight={firstValidHeight ? Number(firstValidHeight).toLocaleString() : '—'}
          rpcStatus={rpcStatus}
          explorerUrl={urls?.explorerUrl || "#"}
        />
        
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
              {rpcEndpoints && rpcEndpoints.length > 0 ? (
                rpcEndpoints.map((rpc, index) => (
                  <tr key={index} className="hover:bg-slate-800/40">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-300">{rpc.url}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {rpc.status === 'active' ? (
                        <span className="flex items-center gap-2 text-green-400"><CheckCircle className="w-4 h-4" /> Active</span>
                      ) : (
                        <span className="flex items-center gap-2 text-red-400"><XCircle className="w-4 h-4" /> Inactive</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-300">
                      {heights[index] !== null && !isNaN(Number(heights[index]))
                        ? Number(heights[index]).toLocaleString()
                        : ''}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-slate-400">
                    No RPC endpoints configured for this network
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PublicRpcScannerPage;
