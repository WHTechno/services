// Dynamically import all project configs from testnet and mainnet

const testnetModules = import.meta.glob('./testnet/*.js', { eager: true });
const mainnetModules = import.meta.glob('./mainnet/*.js', { eager: true });

function getKeyFromPath(path, network) {
  // path: './testnet/airchains.js' => 'testnet/airchains'
  const match = path.match(/\.\/(testnet|mainnet)\/(.+)\.js$/);
  if (!match) return null;
  return `${match[1]}/${match[2]}`;
}

export function loadProjects() {
  const projects = {};
  for (const [path, mod] of Object.entries(testnetModules)) {
    const key = getKeyFromPath(path, 'testnet');
    if (key && !key.endsWith('_template')) {
      projects[key] = mod.default;
    }
  }
  for (const [path, mod] of Object.entries(mainnetModules)) {
    const key = getKeyFromPath(path, 'mainnet');
    if (key && !key.endsWith('_template')) {
      projects[key] = mod.default;
    }
  }
  return projects;
}

// Optionally, for backward compatibility, export all projects as a flat object (first testnet, then mainnet)
const allProjects = loadProjects();
export default allProjects;
