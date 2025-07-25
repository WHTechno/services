# Multi-Project Guide Services

A dynamic, configurable guide services system that can be used for multiple blockchain/crypto projects. Originally built for Airchains, now supports multiple networks through a centralized configuration system organized by network type (testnet/mainnet).

## Features

- **Multi-Project Support**: Easily add new blockchain projects by updating the configuration
- **Network Type Organization**: Projects are organized by testnet/mainnet for better management
- **Dynamic Routing**: Routes automatically adapt based on the selected project
- **Network Selector**: Users can switch between different networks from the header
- **Consistent UI**: Same guide structure and design for all projects
- **Configurable Commands**: Each project can have its own installation commands, endpoints, and settings
- **Updated Navigation**: Home and Explorer links for better user experience

## Project Structure

```
src/
├── config/
│   ├── projects.js              # Main projects import file
│   └── projects/                # Project configurations by network type
│       ├── README.md           # Detailed configuration guide
│       ├── index.js            # Imports all projects
│       ├── testnet/            # Testnet projects
│       │   ├── _template.js    # Template for testnet projects
│       │   └── airchains.js    # Airchains testnet configuration
│       └── mainnet/            # Mainnet projects
│           ├── _template.js    # Template for mainnet projects
│           └── example.js      # Example mainnet configuration
├── components/
│   ├── NetworkSelector.jsx     # Network switching component
│   ├── Header.jsx              # Updated with Home/Explorer links
│   ├── Sidebar.jsx             # Dynamic sidebar based on current project
│   └── ...
├── pages/                      # All guide pages (now dynamic)
│   ├── ManualInstallationPage.jsx
│   ├── AutomaticInstallationPage.jsx
│   ├── ApiSyncPage.jsx
│   └── ...
└── App.jsx                     # Dynamic routing with :project parameter
```

## Adding a New Project

The project configurations are now organized by network type (testnet/mainnet) for better organization:

### Quick Steps:

**For Testnet Projects:**
```bash
cp src/config/projects/testnet/_template.js src/config/projects/testnet/myproject.js
```

**For Mainnet Projects:**
```bash
cp src/config/projects/mainnet/_template.js src/config/projects/mainnet/myproject.js
```

### Configuration Steps:

1. **Edit your project file** (`testnet/myproject.js` or `mainnet/myproject.js`):
   - Update project name, chain ID, and all configuration values
   - Replace all `yourproject` references with your project name
   - Update commands, URLs, and endpoints
   - Ensure `networkLabel` is correct ("Testnet" or "Mainnet")

2. **Register the project** in `src/config/projects/index.js`:

   **For Testnet:**
   ```javascript
   // Add import in testnet section
   import myproject from './testnet/myproject.js';
   
   // Add to projects object
   const projects = {
     // Testnet projects
     airchains,
     myproject,  // Add here
     
     // Mainnet projects
     example,
   };
   ```

   **For Mainnet:**
   ```javascript
   // Add import in mainnet section
   import myproject from './mainnet/myproject.js';
   
   // Add to projects object
   const projects = {
     // Testnet projects
     airchains,
     
     // Mainnet projects
     example,
     myproject,  // Add here
   };
   ```

3. **Add project logo** (optional):
   - Place logo in `public/logo-myproject.png`

That's it! Your project will automatically appear in the network selector.

### Detailed Guide:
See `src/config/projects/README.md` for comprehensive instructions and examples.

## Navigation Updates

- **Home**: Links to https://whtech.xyz
- **Explorer**: Opens https://explorer.whtech.xyz in new tab
- **Network Selector**: Switch between available projects
- **Removed**: Mainnet/Testnet menu items (now organized by folder structure)

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the application
4. Use the network selector in the header to switch between projects
5. All guide pages will automatically update with the selected project's configuration

## URL Structure

- `/services/testnet/:project` - Manual Installation (default page)
- `/services/testnet/:project/automatic-installation` - Automatic Installation
- `/services/testnet/:project/api-sync` - API & Sync information
- `/services/testnet/:project/create-wallet` - Wallet creation guide
- `/services/testnet/:project/create-validator` - Validator setup guide
- `/services/testnet/:project/monitoring` - Monitoring setup
- `/services/testnet/:project/security` - Security best practices
- `/services/testnet/:project/delete-node` - Node removal guide
- `/services/testnet/:project/upgrade` - Upgrade instructions
- `/services/testnet/:project/cheat-sheet` - Quick reference commands
- `/services/testnet/:project/public-rpc-scanner` - RPC endpoint status

## Current Supported Projects

- **Airchains (Testnet)** (`/services/testnet/airchains`) - Located in `testnet/airchains.js`
- **Example Network (Mainnet)** (`/services/testnet/example`) - Located in `mainnet/example.js`

## File Organization Benefits

### ✅ **Better Organization**
- **Testnet projects** in `src/config/projects/testnet/`
- **Mainnet projects** in `src/config/projects/mainnet/`
- **Separate templates** for each network type

### ✅ **Easy Management**
- **Find projects by network type** quickly
- **Dedicated templates** with network-specific configurations
- **Clear separation** of concerns

### ✅ **Scalability**
- **Easy to add** new projects in appropriate folders
- **Consistent structure** across all projects
- **Better team collaboration** with organized files

## Technologies Used

- React 18
- React Router DOM 6
- Tailwind CSS
- Vite
- Framer Motion
- Lucide React (icons)
- React Helmet (SEO)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your project configuration to the appropriate folder (`testnet/` or `mainnet/`)
4. Register your project in `src/config/projects/index.js`
5. Test the new project configuration
6. Submit a pull request

## License

This project is licensed under the MIT License.
