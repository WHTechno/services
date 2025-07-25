const example = {
  name: "Example Network",
  networkLabel: "Mainnet",
  logo: "/logo-example.png",
  chainId: "example-1",
  blockHeight: "1,000,000",
  rpcStatus: true,
  commands: {
    installDependenciesCmd: `sudo apt update && sudo apt upgrade -y
sudo apt install curl git wget htop tmux build-essential jq make lz4 gcc unzip -y`,
    installGoCmd: `ver="1.21.6"
cd $HOME
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"
[ ! -f ~/.bash_profile ] && touch ~/.bash_profile
echo "export PATH=$PATH:/usr/local/go/bin:~/go/bin" >> ~/.bash_profile
source ~/.bash_profile`,
    downloadBinaryCmd: `cd $HOME
git clone https://github.com/example/example.git
cd example
git checkout v1.0.0
go mod tidy
go build -o exampled cmd/exampled/main.go
chmod +x exampled
sudo mv exampled /usr/local/bin/`,
    initNodeCmd: (nodeName) => `exampled init ${nodeName || "<YOUR_NODE_NAME>"} --chain-id example-1
wget -O $HOME/.example/config/genesis.json "https://raw.githubusercontent.com/example/example/main/genesis.json"`,
    configNodeCmd: `SEEDS="seed1@example.io:26656,seed2@example.io:26656"
PEERS="peer1@1.1.1.1:26656,peer2@2.2.2.2:26656"
sed -i -e "s/^seeds *=.*/seeds = \\"$SEEDS\\"/" $HOME/.example/config/config.toml
sed -i -e "s/^persistent_peers *=.*/persistent_peers = \\"$PEERS\\"/" $HOME/.example/config/config.toml`,
    setPruningCmd: (pruning, pruningKeepRecent, pruningInterval) => `PRUNING="${pruning}"
PRUNING_KEEP_RECENT="${pruningKeepRecent}"
PRUNING_INTERVAL="${pruningInterval}"
sed -i "s/^pruning *=.*/pruning = \\"$PRUNING\\"/" $HOME/.example/config/app.toml
sed -i "s/^pruning-keep-recent *=.*/pruning-keep-recent = \\"$PRUNING_KEEP_RECENT\\"/" $HOME/.example/config/app.toml
sed -i "s/^pruning-interval *=.*/pruning-interval = \\"$PRUNING_INTERVAL\\"/" $HOME/.example/config/app.toml`,
    createServiceCmd: (port) => `sudo tee /etc/systemd/system/exampled.service > /dev/null <<EOF
[Unit]
Description=Example Node
After=network.target

[Service]
User=$USER
Type=simple
ExecStart=$(which exampled) start --p2p.laddr tcp://0.0.0.0:${port}656 --rpc.laddr tcp://0.0.0.0:${port}657 --grpc.laddr tcp://0.0.0.0:${port}090 --grpc-web.laddr tcp://0.0.0.0:${port}091
Restart=on-failure
RestartSec=10
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF`,
    startNodeCmd: `sudo systemctl daemon-reload
sudo systemctl enable exampled
sudo systemctl restart exampled`,
    autoInstallCmd: `wget -O example.sh https://api.example.com/example.sh && chmod +x example.sh && ./example.sh`,
  },
  urls: {
    repo: "https://github.com/example/example.git",
    genesisUrl: "https://raw.githubusercontent.com/example/example/main/genesis.json",
    docsUrl: "#",
    explorerUrl: "#",
    officialSite: "example.io"
  },
  rpcEndpoints: [
    { url: 'https://rpc.example.io/', status: 'active', height: '1,000,000' },
  ],
  apiEndpoints: {
    rpc: `https://rpc.example.io/`,
    api: `https://api.example.io/`,
    grpc: `grpc.example.io:9090`,
    stateSync: {
      enableCmd: `sed -i -e "s|^enable *=.*|enable = true|" $HOME/.example/config/config.toml`,
      rpcServersCmd: `RPC_SERVERS="https://rpc.example.io:443,https://rpc.example.io:443"
sed -i -e "s|^rpc_servers *=.*|rpc_servers = \\"$RPC_SERVERS\\"|" $HOME/.example/config/config.toml`,
      trustHeightCmd: `LATEST_HEIGHT=$(curl -s https://rpc.example.io/block | jq -r .result.block.header.height)
TRUST_HEIGHT=$((LATEST_HEIGHT - 1000))
TRUST_HASH=$(curl -s "https://rpc.example.io/block?height=$TRUST_HEIGHT" | jq -r .result.block_id.hash)
sed -i -e "s|^trust_height *=.*|trust_height = $TRUST_HEIGHT|" $HOME/.example/config/config.toml
sed -i -e "s|^trust_hash *=.*|trust_hash = \\"$TRUST_HASH\\"|" $HOME/.example/config/config.toml`
    }
  }
};

export default example;
