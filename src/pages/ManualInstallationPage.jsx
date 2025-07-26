import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import CodeBlock from '@/components/CodeBlock';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from '@/components/PageHeader';
import { useParams } from 'react-router-dom';
import { getProjectConfig } from '@/config/projects/getProjectConfig';

const ManualInstallationPage = () => {
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

    const [nodeName, setNodeName] = useState("test");
    const [walletName, setWalletName] = useState("wallet");
    const [port, setPort] = useState("19");
    const [pruning, setPruning] = useState("custom");
    const [pruningKeepRecent, setPruningKeepRecent] = useState("100");
    const [pruningInterval, setPruningInterval] = useState("19");

    // Generate dynamic commands using configuration and user inputs
    const { commands, urls, name, chainId, blockHeight, rpcStatus } = currentConfig;
    const installDependenciesCmd = commands.installDependenciesCmd;
    const installGoCmd = commands.installGoCmd;
    const downloadBinaryCmd = commands.downloadBinaryCmd;
    const initNodeCmd = typeof commands.initNodeCmd === 'function' 
        ? commands.initNodeCmd(nodeName) 
        : commands.initNodeCmd;
    const configNodeCmd = commands.configNodeCmd;
    const setPruningCmd = typeof commands.setPruningCmd === 'function'
        ? commands.setPruningCmd(pruning, pruningKeepRecent, pruningInterval)
        : commands.setPruningCmd;
    const createServiceCmd = typeof commands.createServiceCmd === 'function'
        ? commands.createServiceCmd(port)
        : commands.createServiceCmd;
    const startNodeCmd = commands.startNodeCmd;

    return (
        <>
            <Helmet>
                <title>{name} Installation | NodeServices</title>
                <meta name="description" content={`Panduan instalasi manual untuk node ${name} Testnet.`} />
            </Helmet>
            
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 md:p-8">
                <PageHeader 
                    title="Manual Installation"
                    subtitle="Recommended Hardware: 4 Cores, 8GB RAM, 200GB of storage (NVME)"
                    docsUrl={urls?.docsUrl || "#"}
                    chainId={chainId}
                    blockHeight={blockHeight}
                    rpcStatus={rpcStatus}
                    explorerUrl={urls?.explorerUrl || "#"}
                />

                <CodeBlock title="# install dependencies, if needed">
                    {installDependenciesCmd}
                </CodeBlock>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6 items-end">
                    <div className="space-y-2">
                        <Label htmlFor="node-name">Node Name</Label>
                        <Input id="node-name" value={nodeName} onChange={(e) => setNodeName(e.target.value)} placeholder="test" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="wallet-name">Wallet</Label>
                        <Input id="wallet-name" value={walletName} onChange={(e) => setWalletName(e.target.value)} placeholder="wallet" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="port">Port</Label>
                        <Input id="port" value={port} onChange={(e) => setPort(e.target.value)} placeholder="19" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pruning">Pruning</Label>
                        <Select value={pruning} onValueChange={setPruning}>
                            <SelectTrigger id="pruning">
                                <SelectValue placeholder="Select pruning" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="custom">custom</SelectItem>
                                <SelectItem value="default">default</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pruning-keep-recent">Pruning Keep Recent</Label>
                        <Input id="pruning-keep-recent" value={pruningKeepRecent} onChange={(e) => setPruningKeepRecent(e.target.value)} placeholder="100" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pruning-interval">Pruning Interval</Label>
                        <Input id="pruning-interval" value={pruningInterval} onChange={(e) => setPruningInterval(e.target.value)} placeholder="19" />
                    </div>
                </div>

                <CodeBlock title="# install go, if needed">
                    {installGoCmd}
                </CodeBlock>

                <CodeBlock title="# download and build binary">
                    {downloadBinaryCmd}
                </CodeBlock>

                <CodeBlock title="# initialize the node">
                    {initNodeCmd}
                </CodeBlock>

                <CodeBlock title="# set seeds and peers">
                    {configNodeCmd}
                </CodeBlock>

                <CodeBlock title="# set pruning">
                    {setPruningCmd}
                </CodeBlock>

                <CodeBlock title="# create a service file">
                    {createServiceCmd}
                </CodeBlock>

                <CodeBlock title="# start the node">
                    {startNodeCmd}
                </CodeBlock>
            </div>
        </>
    );
};

export default ManualInstallationPage;
