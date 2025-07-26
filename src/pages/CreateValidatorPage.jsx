import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import CodeBlock from '@/components/CodeBlock';
import PageHeader from '@/components/PageHeader';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useParams } from 'react-router-dom';
import { getProjectConfig } from '@/config/projects/getProjectConfig';

const CreateValidatorPage = () => {
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

  const [moniker, setMoniker] = useState("MyNode");
  const [wallet, setWallet] = useState("MyWallet");
  const [commissionRate, setCommissionRate] = useState("0.1");
  const [commissionMaxRate, setCommissionMaxRate] = useState("0.2");
  const [commissionMaxChange, setCommissionMaxChange] = useState("0.01");
  const [minSelfDelegation, setMinSelfDelegation] = useState("1");
  const [amount, setAmount] = useState("1000000");

  // Use binary name and chainId from config if available
  const binary = currentConfig?.commands?.binaryName || 'junctiond';
  const chainId = currentConfig?.chainId || 'junction';
  const denom = currentConfig?.denom || 'amf';

  const createValidatorCmd = `${binary} tx staking create-validator \\
--amount="${amount}${denom}" \\
--pubkey=$(${binary} tendermint show-validator) \\
--moniker="${moniker}" \\
--chain-id="${chainId}" \\
--commission-rate="${commissionRate}" \\
--commission-max-rate="${commissionMaxRate}" \\
--commission-max-change-rate="${commissionMaxChange}" \\
--min-self-delegation="${minSelfDelegation}" \\
--from="${wallet}" \\
--gas-prices="0.025${denom}" \\
--gas-adjustment="1.5" \\
--gas="auto" -y`;

  return (
    <>
      <Helmet>
        <title>Create Validator | NodeServices</title>
        <meta name="description" content={`Panduan untuk membuat validator di jaringan ${currentConfig.name}.`} />
      </Helmet>
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 md:p-8">
        <PageHeader title="Create Validator" subtitle="Setelah node Anda tersinkronisasi, Anda dapat membuat validator." />
        
        <p className="text-slate-300 mb-4">
          Pastikan Anda memiliki cukup token <code data-code-block>{denom}</code> di wallet Anda untuk membuat validator.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="space-y-2">
            <Label htmlFor="moniker">Moniker</Label>
            <Input id="moniker" value={moniker} onChange={e => setMoniker(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wallet">Wallet Name</Label>
            <Input id="wallet" value={wallet} onChange={e => setWallet(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ({denom})</Label>
            <Input id="amount" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="commission-rate">Commission Rate</Label>
            <Input id="commission-rate" value={commissionRate} onChange={e => setCommissionRate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="commission-max-rate">Commission Max Rate</Label>
            <Input id="commission-max-rate" value={commissionMaxRate} onChange={e => setCommissionMaxRate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="commission-max-change">Commission Max Change</Label>
            <Input id="commission-max-change" value={commissionMaxChange} onChange={e => setCommissionMaxChange(e.target.value)} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="min-self-delegation">Min Self Delegation</Label>
            <Input id="min-self-delegation" value={minSelfDelegation} onChange={e => setMinSelfDelegation(e.target.value)} />
          </div>
        </div>

        <CodeBlock title="Run this command to create your validator">
          {createValidatorCmd}
        </CodeBlock>
      </div>
    </>
  );
};

export default CreateValidatorPage;