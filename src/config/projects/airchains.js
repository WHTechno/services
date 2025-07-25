const airchains = {
  name: "Airchains",
  networkLabel: "Testnet",
  logo: "/logo-airchains.png",
  chainId: "junction",
  blockHeight: "1,763,607",
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
git clone https://github.com/airchains-network/junction.git
cd junction
git checkout v0.0.3
go mod tidy
go build -o junctiond cmd/junctiond/main.go
chmod +x junctiond
sudo mv junctiond /usr/local/bin/`,
    initNodeCmd: (nodeName) => `junctiond init ${nodeName || "<YOUR_NODE_NAME>"} --chain-id junction
wget -O $HOME/.junction/config/genesis.json "https://raw.githubusercontent.com/airchains-network/junction/main/genesis.json"`,
    configNodeCmd: `SEEDS="e2c07e8e6e808fb147d12de0183bfe0e527ba447@seed2.airchains.io:26656,cde9c447d259201c6235430cf4c3a0359f429514@seed3.airchains.io:26656"
PEERS="d2113f3640b6e9278a87604cb249156b17631333@135.181.5.86:26656,863a3dcb1980a373305b380299d255755b76b328@37.27.32.13:16656"
sed -i -e "s/^seeds *=.*/seeds = \\"$SEEDS\\"/" $HOME/.junction/config/config.toml
sed -i -e "s/^persistent_peers *=.*/persistent_peers = \\"$PEERS\\"/" $HOME/.junction/config/config.toml`,
    setPruningCmd: (pruning, pruningKeepRecent, pruningInterval) => `PRUNING="${pruning}"
PRUNING_KEEP_RECENT="${pruningKeepRecent}"
PRUNING_INTERVAL="${pruningInterval}"
sed -i "s/^pruning *=.*/pruning = \\"$PRUNING\\"/" $HOME/.junction/config/app.toml
sed -i "s/^pruning-keep-recent *=.*/pruning-keep-recent = \\"$PRUNING_KEEP_RECENT\\"/" $HOME/.junction/config/app.toml
sed -i "s/^pruning-interval *=.*/pruning-interval = \\"$PRUNING_INTERVAL\\"/" $HOME/.junction/config/app.toml`,
    createServiceCmd: (port) => `sudo tee /etc/systemd/system/junctiond.service > /dev/null <<EOF
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
EOF`,
    startNodeCmd: `sudo systemctl daemon-reload
sudo systemctl enable junctiond
sudo systemctl restart junctiond`,
    autoInstallCmd: `wget -O airchains.sh https://api.nodes.guru/airchains.sh && chmod +x airchains.sh && ./airchains.sh`,
  },
  urls: {
    repo: "https://github.com/airchains-network/junction.git",
    genesisUrl: "https://raw.githubusercontent.com/airchains-network/junction/main/genesis.json",
    docsUrl: "#",
    explorerUrl: "#",
    officialSite: "airchains.io"
  },
  rpcEndpoints: [
    { url: 'https://rpc-airchains.d-stake.xyz/', status: 'active', height: '1,763,801' },
    { url: 'https://airchains-rpc.s.chainbase.online/', status: 'active', height: '1,763,801' },
    { url: 'https://airchains-testnet-rpc.itrocket.net/', status: 'active', height: '1,763,800' },
    { url: 'https://rpc.airchains.test.rpc.org/', status: 'inactive', height: 'N/A' },
    { url: 'https://rpc-t-airchains.nodine.id/', status: 'active', height: '1,763,799' },
  ],
  apiEndpoints: {
    rpc: `https://rpc-airchains.d-stake.xyz/
https://airchains-rpc.s.chainbase.online/`,
    api: `https://api-airchains.d-stake.xyz/
https://airchains-api.s.chainbase.online/`,
    grpc: `grpc-airchains.d-stake.xyz:29090`,
    stateSync: {
      enableCmd: `sed -i -e "s|^enable *=.*|enable = true|" $HOME/.junction/config/config.toml`,
      rpcServersCmd: `RPC_SERVERS="https://rpc-airchains.d-stake.xyz:443,https://rpc-airchains.d-stake.xyz:443"
sed -i -e "s|^rpc_servers *=.*|rpc_servers = \\"$RPC_SERVERS\\"|" $HOME/.junction/config/config.toml`,
      trustHeightCmd: `LATEST_HEIGHT=$(curl -s https://rpc-airchains.d-stake.xyz/block | jq -r .result.block.header.height)
TRUST_HEIGHT=$((LATEST_HEIGHT - 1000))
TRUST_HASH=$(curl -s "https://rpc-airchains.d-stake.xyz/block?height=$TRUST_HEIGHT" | jq -r .result.block_id.hash)
sed -i -e "s|^trust_height *=.*|trust_height = $TRUST_HEIGHT|" $HOME/.junction/config/config.toml
sed -i -e "s|^trust_hash *=.*|trust_hash = \\"$TRUST_HASH\\"|" $HOME/.junction/config/config.toml`
    }
  }
};

export default airchains;
