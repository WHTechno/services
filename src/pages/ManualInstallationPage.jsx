import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import CodeBlock from '@/components/CodeBlock';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from '@/components/PageHeader';

const ManualInstallationPage = () => {
    const [nodeName, setNodeName] = useState("test");
    const [walletName, setWalletName] = useState("wallet");
    const [port, setPort] = useState("19");
    const [pruning, setPruning] = useState("custom");
    const [pruningKeepRecent, setPruningKeepRecent] = useState("100");
    const [pruningInterval, setPruningInterval] = useState("19");

    const installDependenciesCmd = `sudo apt update && sudo apt upgrade -y
sudo apt install curl git wget htop tmux build-essential jq make lz4 gcc unzip -y`;

    const installGoCmd = `ver="1.21.6"
cd $HOME
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"
[ ! -f ~/.bash_profile ] && touch ~/.bash_profile
echo "export PATH=$PATH:/usr/local/go/bin:~/go/bin" >> ~/.bash_profile
source ~/.bash_profile`;

    const downloadBinaryCmd = `cd $HOME
git clone https://github.com/airchains-network/junction.git
cd junction
git checkout v0.0.3
go mod tidy
go build -o junctiond cmd/junctiond/main.go
chmod +x junctiond
sudo mv junctiond /usr/local/bin/`;

    const initNodeCmd = `junctiond init ${nodeName || "<YOUR_NODE_NAME>"} --chain-id junction
wget -O $HOME/.junction/config/genesis.json "https://raw.githubusercontent.com/airchains-network/junction/main/genesis.json"`;

    const configNodeCmd = `SEEDS="e2c07e8e6e808fb147d12de0183bfe0e527ba447@seed2.airchains.io:26656,cde9c447d259201c6235430cf4c3a0359f429514@seed3.airchains.io:26656"
PEERS="d2113f3640b6e9278a87604cb249156b17631333@135.181.5.86:26656,863a3dcb1980a373305b380299d255755b76b328@37.27.32.13:16656"
sed -i -e "s/^seeds *=.*/seeds = \\"$SEEDS\\"/" $HOME/.junction/config/config.toml
sed -i -e "s/^persistent_peers *=.*/persistent_peers = \\"$PEERS\\"/" $HOME/.junction/config/config.toml`;
    
    const setPruningCmd = `PRUNING="${pruning}"
PRUNING_KEEP_RECENT="${pruningKeepRecent}"
PRUNING_INTERVAL="${pruningInterval}"
sed -i "s/^pruning *=.*/pruning = \\"$PRUNING\\"/" $HOME/.junction/config/app.toml
sed -i "s/^pruning-keep-recent *=.*/pruning-keep-recent = \\"$PRUNING_KEEP_RECENT\\"/" $HOME/.junction/config/app.toml
sed -i "s/^pruning-interval *=.*/pruning-interval = \\"$PRUNING_INTERVAL\\"/" $HOME/.junction/config/app.toml`;

    const createServiceCmd = `sudo tee /etc/systemd/system/junctiond.service > /dev/null <<EOF
[Unit]
Description=Junctiond Node
After=network.target

[Service]
User=$USER
Type=simple
ExecStart=$(which junctiond) start --p2p.laddr tcp://0.0.0.0:${port}656 --rpc.laddr tcp://0.0.0.0:${port}657 --grpc.laddr tcp://0.0.0.0:${port}090 --grpc-web.laddr tcp://0.0.0.0:${port}091
Restart=on-failure
RestartSec=10
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF`;

    const startNodeCmd = `sudo systemctl daemon-reload
sudo systemctl enable junctiond
sudo systemctl restart junctiond`;

  return (
    <>
      <Helmet>
        <title>Airchains Installation | NodeServices</title>
        <meta name="description" content="Panduan instalasi manual untuk node Airchains Testnet." />
      </Helmet>
      
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 md:p-8">
        <PageHeader 
            title="Manual Installation"
            subtitle="Recommended Hardware: 4 Cores, 8GB RAM, 200GB of storage (NVME)"
            docsUrl="#"
            chainId="junction"
            blockHeight="1,763,607"
            rpcStatus={true}
            explorerUrl="#"
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