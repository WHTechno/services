// Template for creating new MAINNET project configurations
// Copy this file and rename it to your project name (e.g., myproject.js)
// Then update all the configuration values below

const projectTemplate = {
  // Basic project information
  name: "Your Project Name",           // Display name in UI
  networkLabel: "Mainnet",             // This should be "Mainnet" for mainnet projects
  logo: "/logo-yourproject.png",       // Logo file in public/ folder
  chainId: "your-chain-id-1",          // Actual mainnet chain ID
  blockHeight: "5,000,000",            // Current block height
  rpcStatus: true,                     // RPC status (true/false)
  
  // Installation and setup commands
  commands: {
    // Command to install system dependencies
    installDependenciesCmd: `sudo apt update && sudo apt upgrade -y
sudo apt install curl git wget htop tmux build-essential jq make lz4 gcc unzip -y`,
    
    // Command to install Go (if needed)
    installGoCmd: `ver="1.21.6"
cd $HOME
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"
[ ! -f ~/.bash_profile ] && touch ~/.bash_profile
echo "export PATH=$PATH:/usr/local/go/bin:~/go/bin" >> ~/.bash_profile
source ~/.bash_profile`,
    
    // Command to download and build binary
    downloadBinaryCmd: `cd $HOME
git clone https://github.com/yourproject/repo.git
cd repo
git checkout v1.0.0
go mod tidy
go build -o yourprojectd cmd/yourprojectd/main.go
chmod +x yourprojectd
sudo mv yourprojectd /usr/local/bin/`,
    
    // Command to initialize node (function with nodeName parameter)
    initNodeCmd: (nodeName) => `yourprojectd init ${nodeName || "<YOUR_NODE_NAME>"} --chain-id your-chain-id-1
wget -O $HOME/.yourproject/config/genesis.json "https://raw.githubusercontent.com/yourproject/mainnet/main/genesis.json"`,
    
    // Command to configure seeds and peers
    configNodeCmd: `SEEDS="seed1@yourproject.io:26656,seed2@yourproject.io:26656"
PEERS="peer1@mainnet-ip1:26656,peer2@mainnet-ip2:26656"
sed -i -e "s/^seeds *=.*/seeds = \\"$SEEDS\\"/" $HOME/.yourproject/config/config.toml
sed -i -e "s/^persistent_peers *=.*/persistent_peers = \\"$PEERS\\"/" $HOME/.yourproject/config/config.toml`,
    
    // Command to set pruning (function with parameters)
    setPruningCmd: (pruning, pruningKeepRecent, pruningInterval) => `PRUNING="${pruning}"
PRUNING_KEEP_RECENT="${pruningKeepRecent}"
PRUNING_INTERVAL="${pruningInterval}"
sed -i "s/^pruning *=.*/pruning = \\"$PRUNING\\"/" $HOME/.yourproject/config/app.toml
sed -i "s/^pruning-keep-recent *=.*/pruning-keep-recent = \\"$PRUNING_KEEP_RECENT\\"/" $HOME/.yourproject/config/app.toml
sed -i "s/^pruning-interval *=.*/pruning-interval = \\"$PRUNING_INTERVAL\\"/" $HOME/.yourproject/config/app.toml`,
    
    // Command to create systemd service (function with port parameter)
    createServiceCmd: (port) => `sudo tee /etc/systemd/system/yourprojectd.service > /dev/null <<EOF
[Unit]
Description=Your Project Mainnet Node
After=network.target

[Service]
User=$USER
Type=simple
ExecStart=$(which yourprojectd) start --p2p.laddr tcp://0.0.0.0:${port}656 --rpc.laddr tcp://0.0.0.0:${port}657 --grpc.laddr tcp://0.0.0.0:${port}090 --grpc-web.laddr tcp://0.0.0.0:${port}091
Restart=on-failure
RestartSec=10
LimitNOFILE=65535

[Install]
WantedBy=multi-user.target
EOF`,
    
    // Command to start the node
    startNodeCmd: `sudo systemctl daemon-reload
sudo systemctl enable yourprojectd
sudo systemctl restart yourprojectd`,
    
    // Command for automatic installation
    autoInstallCmd: `wget -O yourproject-mainnet.sh https://mainnet.yourproject.com/yourproject.sh && chmod +x yourproject-mainnet.sh && ./yourproject-mainnet.sh`,
  },
  
  // Project URLs and links
  urls: {
    repo: "https://github.com/yourproject/mainnet.git",
    genesisUrl: "https://raw.githubusercontent.com/yourproject/mainnet/main/genesis.json",
    docsUrl: "https://docs.yourproject.io",
    explorerUrl: "https://explorer.yourproject.io",
    officialSite: "yourproject.io"
  },
  
  // RPC endpoints for the Public RPC Scanner page
  rpcEndpoints: [
    { url: 'https://rpc.yourproject.io/', status: 'active', height: '5,000,000' },
    { url: 'https://rpc2.yourproject.io/', status: 'active', height: '5,000,000' },
    { url: 'https://rpc3.yourproject.io/', status: 'inactive', height: 'N/A' },
  ],
  
  // API endpoints for the API & Sync page
  apiEndpoints: {
    rpc: `https://rpc.yourproject.io/`,
    api: `https://api.yourproject.io/`,
    grpc: `grpc.yourproject.io:9090`,
    stateSync: {
      enableCmd: `sed -i -e "s|^enable *=.*|enable = true|" $HOME/.yourproject/config/config.toml`,
      rpcServersCmd: `RPC_SERVERS="https://rpc.yourproject.io:443,https://rpc.yourproject.io:443"
sed -i -e "s|^rpc_servers *=.*|rpc_servers = \\"$RPC_SERVERS\\"|" $HOME/.yourproject/config/config.toml`,
      trustHeightCmd: `LATEST_HEIGHT=$(curl -s https://rpc.yourproject.io/block | jq -r .result.block.header.height)
TRUST_HEIGHT=$((LATEST_HEIGHT - 1000))
TRUST_HASH=$(curl -s "https://rpc.yourproject.io/block?height=$TRUST_HEIGHT" | jq -r .result.block_id.hash)
sed -i -e "s|^trust_height *=.*|trust_height = $TRUST_HEIGHT|" $HOME/.yourproject/config/config.toml
sed -i -e "s|^trust_hash *=.*|trust_hash = \\"$TRUST_HASH\\"|" $HOME/.yourproject/config/config.toml`
    }
  }
};

export default projectTemplate;
