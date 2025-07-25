# Project Configuration Guide

This folder contains separate configuration files for each blockchain project, organized by network type (testnet/mainnet).

## 📁 File Structure

```
src/config/projects/
├── README.md                    # This guide
├── index.js                    # Main index file that imports all projects
├── testnet/                    # Testnet projects folder
│   ├── _template.js           # Template for testnet projects
│   ├── airchains.js          # Airchains testnet configuration
│   └── [newtestnet].js       # Your new testnet projects
├── mainnet/                    # Mainnet projects folder
│   ├── _template.js           # Template for mainnet projects
│   ├── example.js            # Example mainnet configuration
│   └── [newmainnet].js       # Your new mainnet projects
└── _template.js               # Legacy template (deprecated)
```

## 🚀 How to Add a New Project

### Step 1: Choose Network Type and Copy Template

**For Testnet Projects:**
```bash
cp src/config/projects/testnet/_template.js src/config/projects/testnet/myproject.js
```

**For Mainnet Projects:**
```bash
cp src/config/projects/mainnet/_template.js src/config/projects/mainnet/myproject.js
```

### Step 2: Edit Your Project Configuration File

1. **Open your project file** (`testnet/myproject.js` or `mainnet/myproject.js`)
2. **Update all configuration values:**
   - Replace `"Your Project Name"` with your project's display name
   - Replace `"your-chain-id"` with the actual chain ID
   - Replace all `yourproject` references with your project name
   - Update all commands, URLs, and endpoints
   - Update RPC endpoints list
   - Ensure `networkLabel` is correct ("Testnet" or "Mainnet")

### Step 3: Register the New Project

1. **Edit `index.js`** and add your project:

**For Testnet Projects:**
```javascript
// Add import in testnet section
import myproject from './testnet/myproject.js';

// Add to projects object in testnet section
const projects = {
  // Testnet projects
  airchains,
  myproject,  // Add your testnet project here
  
  // Mainnet projects
  example,
};
```

**For Mainnet Projects:**
```javascript
// Add import in mainnet section
import myproject from './mainnet/myproject.js';

// Add to projects object in mainnet section
const projects = {
  // Testnet projects
  airchains,
  
  // Mainnet projects
  example,
  myproject,  // Add your mainnet project here
};
```

### Step 4: Add Project Logo (Optional)

1. Place your project logo in the `public/` folder
2. Name it `logo-myproject.png`
3. Update the `logo` field in your configuration file

## 📋 Configuration Template Explanation

### Basic Information
```javascript
name: "Your Project Name",           // Display name in UI
networkLabel: "Testnet",             // "Testnet" or "Mainnet"
logo: "/logo-yourproject.png",       // Logo file in public/ folder
chainId: "your-chain-id",            // Actual chain ID
blockHeight: "1,000,000",            // Current block height
rpcStatus: true,                     // RPC status (true/false)
```

### Commands Object
All installation and setup commands for your project:

- `installDependenciesCmd`: System dependencies installation
- `installGoCmd`: Go language installation (if needed)
- `downloadBinaryCmd`: Download and build project binary
- `initNodeCmd`: Initialize node (function with nodeName parameter)
- `configNodeCmd`: Configure seeds and peers
- `setPruningCmd`: Set pruning configuration (function with parameters)
- `createServiceCmd`: Create systemd service (function with port parameter)
- `startNodeCmd`: Start the node service
- `autoInstallCmd`: Automatic installation script

### URLs Object
Important project links:
```javascript
urls: {
  repo: "https://github.com/yourproject/repo.git",
  genesisUrl: "https://raw.githubusercontent.com/yourproject/repo/main/genesis.json",
  docsUrl: "https://docs.yourproject.io",
  explorerUrl: "https://explorer.yourproject.io",
  officialSite: "yourproject.io"
}
```

### RPC Endpoints Array
List of RPC endpoints for the Public RPC Scanner page:
```javascript
rpcEndpoints: [
  { url: 'https://rpc.yourproject.io/', status: 'active', height: '1,000,000' },
  { url: 'https://rpc2.yourproject.io/', status: 'active', height: '1,000,000' },
  { url: 'https://rpc3.yourproject.io/', status: 'inactive', height: 'N/A' },
]
```

### API Endpoints Object
API information for the API & Sync page:
```javascript
apiEndpoints: {
  rpc: "https://rpc.yourproject.io/",
  api: "https://api.yourproject.io/",
  grpc: "grpc.yourproject.io:9090",
  stateSync: {
    enableCmd: "...",      // Command to enable state sync
    rpcServersCmd: "...",  // Command to configure RPC servers
    trustHeightCmd: "..."  // Command to set trust height and hash
  }
}
```

## 🎯 Benefits of This Structure

### ✅ **Easy Management**
- Each project has its own dedicated file
- Easy to add, edit, or remove projects
- Clear separation of concerns

### ✅ **Better Organization**
- No more huge single configuration file
- Easy to find and modify specific project settings
- Template file for consistent structure

### ✅ **Team Collaboration**
- Multiple developers can work on different projects simultaneously
- Easier code reviews for project-specific changes
- Reduced merge conflicts

### ✅ **Maintainability**
- Easy to update individual project configurations
- Simple to add new projects without touching existing ones
- Clear documentation for each project

## 🔧 Example: Adding "Cosmos Hub" Project

1. **Create file:** `src/config/projects/cosmoshub.js`
2. **Configure the project:**
   ```javascript
   const cosmoshub = {
     name: "Cosmos Hub",
     networkLabel: "Mainnet",
     chainId: "cosmoshub-4",
     // ... rest of configuration
   };
   export default cosmoshub;
   ```
3. **Register in index.js:**
   ```javascript
   import cosmoshub from './cosmoshub.js';
   
   const projects = {
     airchains,
     example,
     cosmoshub,  // Add here
   };
   ```

That's it! Your new project will automatically appear in the network selector and all guide pages will work with the new configuration.

## 🚨 Important Notes

- **File naming**: Use lowercase, no spaces (e.g., `cosmoshub.js`, `polygon.js`)
- **Export**: Always use `export default projectName;` at the end of each file
- **Import**: Don't forget to import and add your project in `index.js`
- **Testing**: Test your configuration by accessing `/services/testnet/yourproject`

## 📞 Need Help?

If you need help adding a new project or have questions about the configuration structure, refer to the existing `airchains.js` and `example.js` files as references.
