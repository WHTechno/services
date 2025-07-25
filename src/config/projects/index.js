// Import testnet projects
import airchains from './testnet/airchains.js';

// Import mainnet projects
import example from './mainnet/example.js';

// Add new project imports here
// Testnet projects:
// import newtestnetproject from './testnet/newtestnetproject.js';
// Mainnet projects:
// import newmainnetproject from './mainnet/newmainnetproject.js';

// Export all projects as a single object
const projects = {
  // Testnet projects
  airchains,
  
  // Mainnet projects
  example,
  
  // Add new projects here
  // newtestnetproject,
  // newmainnetproject,
};

export default projects;
