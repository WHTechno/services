import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import projects from '@/config/projects';

const NetworkSelector = () => {
  const navigate = useNavigate();
  const { project } = useParams();

  const handleChange = (e) => {
    const selectedProject = e.target.value;
    if (selectedProject) {
      navigate(`/services/testnet/${selectedProject}`);
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
        value={project || ""}
        className="px-3 py-1.5 text-sm bg-slate-800 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[160px]"
      >
        <option value="" disabled>
          Select Network
        </option>
        {Object.keys(projects).map((key) => (
          <option key={key} value={key}>
            {projects[key].name} ({projects[key].networkLabel})
          </option>
        ))}
      </select>
    </div>
  );
};

export default NetworkSelector;
