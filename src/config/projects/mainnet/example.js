const example = {
  name: "Example Network",
  networkLabel: "Mainnet",
  logo: "/logo-example.png",
  chainId: "example-1",
  blockHeight: "1,000,000",
  rpcStatus: true,
  commands: {
    installDependenciesCmd: `sudo apt update && sudo apt upgrade -y\nsudo apt install curl git wget htop tmux build-essential jq make lz4 gcc unzip -y`,
    installGoCmd: `ver="1.21.6"\ncd $HOME\nwget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"\nsudo rm -rf /usr/local/go\nsudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"\nrm "go$ver.linux-amd64.tar.gz"\n[ ! -f ~/.bash_profile ] && touch ~/.bash_profile\necho "export PATH=$PATH:/usr/local/go/bin:~/go/bin" >> ~/.bash_profile\nsource ~/.bash_profile`,
    downloadBinaryCmd: `cd $HOME\ngit clone https://github.com/example/example.git\ncd example\ngit checkout v1.0.0\ngo mod tidy\ngo build -o exampled cmd/exampled/main.go\nchmod +x exampled\nsudo mv exampled /usr/local/bin/`,
    initNodeCmd: (nodeName) => `exampled init ${nodeName || "<YOUR_NODE_NAME>"} --chain-id example-1\nwget -O $HOME/.example/config/genesis.json "https://raw.githubusercontent.com/example/example/main/genesis.json"`,
    configNodeCmd: `SEEDS="seed1@example.io:26656,seed2@example.io:26656"\nPEERS="peer1@1.1.1.1:26656,peer2@2.2.2.2:26656"\nsed -i -e "s/^seeds *=.*/seeds = \\\"$SEEDS\\\"/" $HOME/.example/config/config.toml\nsed -i -e "s/^persistent_peers *=.*/persistent_peers = \\\"$PEERS\\\"/" $HOME/.example/config/config.toml`,
    setPruningCmd: (pruning, pruningKeepRecent, pruningInterval) => `PRUNING="${pruning}"\nPRUNING_KEEP_RECENT="${pruningKeepRecent}"\nPRUNING_INTERVAL="${pruningInterval}"\nsed -i "s/^pruning *=.*/pruning = \\\"$PRUNING\\\"/" $HOME/.example/config/app.toml\nsed -i "s/^pruning-keep-recent *=.*/pruning-keep-recent = \\\"$PRUNING_KEEP_RECENT\\\"/" $HOME/.example/config/app.toml\nsed -i "s/^pruning-interval *=.*/pruning-interval = \\\"$PRUNING_INTERVAL\\\"/" $HOME/.example/config/app.toml`,
    createServiceCmd: (port) => `sudo tee /etc/systemd/system/exampled.service > /dev/null <<EOF\n[Unit]\nDescription=Example Node\nAfter=network.target\n[Service]\nUser=$USER\nType=simple\nExecStart=$(which exampled) start --p2p.laddr tcp://0.0.0.0:${port}656 --rpc.laddr tcp://0.0.0.0:${port}657 --grpc.laddr tcp://0.0.0.0:${port}090 --grpc-web.laddr tcp://0.0.0.0:${port}091\nRestart=on-failure\nRestartSec=10\nLimitNOFILE=65535\n[Install]\nWantedBy=multi-user.target\nEOF`,
    startNodeCmd: `sudo systemctl daemon-reload\nsudo systemctl enable exampled\nsudo systemctl restart exampled`,
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
    { url: 'https://mencret-example.io', status: 'active', height: 'N/A' },
  ],
  apiEndpoints: {
    rpc: 'https://rpc.example.io/',
    api: 'https://api.example.io/',
    grpc: 'grpc.example.io:9090',
    stateSync: {
      enableCmd: `sed -i -e "s|^enable *=.*|enable = true|" $HOME/.example/config/config.toml`,
      rpcServersCmd: `RPC_SERVERS="https://rpc.example.io:443,https://rpc.example.io:443"\nsed -i -e "s|^rpc_servers *=.*|rpc_servers = \\\"$RPC_SERVERS\\\"|" $HOME/.example/config/config.toml`,
      trustHeightCmd: `LATEST_HEIGHT=$(curl -s https://rpc.example.io/block | jq -r .result.block.header.height)\nTRUST_HEIGHT=$((LATEST_HEIGHT - 1000))\nTRUST_HASH=$(curl -s "https://rpc.example.io/block?height=$TRUST_HEIGHT" | jq -r .result.block_id.hash)\nsed -i -e "s|^trust_height *=.*|trust_height = $TRUST_HEIGHT|" $HOME/.example/config/config.toml\nsed -i -e "s|^trust_hash *=.*|trust_hash = \\\"$TRUST_HASH\\\"|" $HOME/.example/config/config.toml`
    }
  }
};

export default example;