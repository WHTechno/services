# Multi-Project Guide Services

A dynamic, configurable guide services system that can be used for multiple blockchain/crypto projects. Originally built for Airchains, now supports multiple networks through a centralized configuration system.

## Features

- **Multi-Project Support**: Easily add new blockchain projects by updating the configuration
- **Dynamic Routing**: Routes automatically adapt based on the selected project
- **Network Selector**: Users can switch between different networks from the header
- **Consistent UI**: Same guide structure and design for all projects
- **Configurable Commands**: Each project can have its own installation commands, endpoints, and settings

## Project Structure

```
src/
├── config/
│   └── projects.js          # Central configuration for all projects
├── components/
│   ├── NetworkSelector.jsx  # Network switching component
│   ├── Header.jsx           # Updated with network selector
│   ├── Sidebar.jsx          # Dynamic sidebar based on current project
│   └── ...
├── pages/                   # All guide pages (now dynamic)
│   ├── ManualInstallationPage.jsx
│   ├── AutomaticInstallationPage.jsx
│   ├── ApiSyncPage.jsx
│   └── ...
└── App.jsx                  # Dynamic routing with :project parameter
```

## Adding a New Project

The project configurations are now organized in separate files for better maintainability:

### Quick Steps:

1. **Copy the template:**
   ```bash
   cp src/config/projects/_template.js src/config/projects/myproject.js
   ```

2. **Edit your project file** (`src/config/projects/myproject.js`):
   - Update project name, chain ID, and all configuration values
   - Replace all `yourproject` references with your project name
   - Update commands, URLs, and endpoints

3. **Register the project** in `src/config/projects/index.js`:
   ```javascript
   // Add import
   import myproject from './myproject.js';
   
   // Add to projects object
   const projects = {
     airchains,
     example,
     myproject,  // Add here
   };
   ```

4. **Add project logo** (optional):
   - Place logo in `public/logo-myproject.png`

That's it! Your project will automatically appear in the network selector.

### Detailed Guide:
See `src/config/projects/README.md` for comprehensive instructions and examples.

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

- **Airchains** (`/services/testnet/airchains`)
- **Example Network** (`/services/testnet/example`) - Template for new projects

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
3. Add your project configuration to `src/config/projects.js`
4. Test the new project configuration
5. Submit a pull request

## License

This project is licensed under the MIT License.
