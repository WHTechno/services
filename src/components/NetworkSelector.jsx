import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadProjects } from '@/config/projects';

const NetworkSelector = () => {
  const navigate = useNavigate();
  const { network, project } = useParams();
  const projects = loadProjects();

  const handleChange = (e) => {
    const selectedKey = e.target.value; // e.g., 'testnet/airchains'
    if (selectedKey) {
      const [selectedNetwork, selectedProject] = selectedKey.split('/');
      navigate(`/services/${selectedNetwork}/${selectedProject}`);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <label htmlFor="network-select" className="text-sm font-medium text-white whitespace-nowrap">
        Network:
      </label>
      <select
        id="network-select"
        onChange={handleChange}
        value={network && project ? `${network}/${project}` : ""}
        className="px-3 py-1.5 text-sm bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[160px]"
      >
        <option value="" disabled>
          Select Network
        </option>
        {Object.entries(projects).map(([key, config]) => (
          <option key={key} value={key}>
            {config.name} ({config.networkLabel})
          </option>
        ))}
      </select>
    </div>
  );
};

export default NetworkSelector;
