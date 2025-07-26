import { loadProjects } from './index.js';

/**
 * Get a specific project config by network and project name.
 * @param {string} network - 'testnet' or 'mainnet'
 * @param {string} project - project file name (without .js)
 * @returns {object|null} project config or null if not found
 */
export function getProjectConfig(network, project) {
  const projects = loadProjects();
  const key = `${network}/${project}`;
  return projects[key] || null;
} 