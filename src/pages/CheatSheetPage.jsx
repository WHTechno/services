import React from 'react';
import { Helmet } from 'react-helmet';
import CodeBlock from '@/components/CodeBlock';
import PageHeader from '@/components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CheatSheetPage = () => {
  return (
    <>
      <Helmet>
        <title>Cheat Sheet | NodeServices</title>
        <meta name="description" content="Kumpulan perintah berguna untuk mengelola node Airchains." />
      </Helmet>
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 md:p-8">
        <PageHeader title="Cheat Sheet" subtitle="Kumpulan perintah yang sering digunakan untuk manajemen node." />
        
        <Tabs defaultValue="service" className="w-full">
          <TabsList>
            <TabsTrigger value="service">Service Management</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="node">Node Info</TabsTrigger>
            <TabsTrigger value="validator">Validator</TabsTrigger>
          </TabsList>
          <TabsContent value="service">
            <CodeBlock title="Check logs">{`sudo journalctl -u junctiond -f -o cat`}</CodeBlock>
            <CodeBlock title="Start service">{`sudo systemctl start junctiond`}</CodeBlock>
            <CodeBlock title="Stop service">{`sudo systemctl stop junctiond`}</CodeBlock>
            <CodeBlock title="Restart service">{`sudo systemctl restart junctiond`}</CodeBlock>
          </TabsContent>
          <TabsContent value="wallet">
            <CodeBlock title="Create new wallet">{`junctiond keys add MyWallet`}</CodeBlock>
            <CodeBlock title="Restore existing wallet">{`junctiond keys add MyWallet --recover`}</CodeBlock>
            <CodeBlock title="List all wallets">{`junctiond keys list`}</CodeBlock>
            <CodeBlock title="Check wallet balance">{`junctiond query bank balances $(junctiond keys show MyWallet -a)`}</CodeBlock>
            <CodeBlock title="Delete wallet">{`junctiond keys delete MyWallet`}</CodeBlock>
          </TabsContent>
          <TabsContent value="node">
            <CodeBlock title="Check node status">{`junctiond status 2>&1 | jq`}</CodeBlock>
            <CodeBlock title="Check sync status">{`junctiond status 2>&1 | jq .SyncInfo`}</CodeBlock>
            <CodeBlock title="Get node ID">{`junctiond tendermint show-node-id`}</CodeBlock>
          </TabsContent>
          <TabsContent value="validator">
            <CodeBlock title="Check validator info">{`junctiond query staking validator $(junctiond keys show MyWallet --bech val -a)`}</CodeBlock>
            <CodeBlock title="Delegate tokens">{`junctiond tx staking delegate $(junctiond keys show MyWallet --bech val -a) 1000000amf --from MyWallet --chain-id junction --gas-prices 0.025amf --gas-adjustment 1.5 --gas auto -y`}</CodeBlock>
            <CodeBlock title="Unjail validator">{`junctiond tx slashing unjail --from MyWallet --chain-id junction --gas-prices 0.025amf -y`}</CodeBlock>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default CheatSheetPage;