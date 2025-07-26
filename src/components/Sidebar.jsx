import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Settings, Rocket, ShieldCheck, Trash2, ChevronsUp, Rss, Globe, Wallet, UserCheck, Activity, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getProjectConfig } from '@/config/projects/getProjectConfig';

const Sidebar = () => {
  const { toast } = useToast();
  const { network, project } = useParams();
  const currentProject = getProjectConfig(network, project);
  const fallbackProject = getProjectConfig('testnet', 'airchains');
  const safeProject = currentProject || fallbackProject;

  const [openSections, setOpenSections] = useState({
    'api-sync': true,
    'installation': true,
    'upgrade': true,
    'cheat-sheet': true,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleUnimplementedClick = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Fitur Belum Tersedia 🚧",
      description: "Halaman ini belum ada. Anda bisa memintanya di prompt berikutnya!",
    });
  };

  // If config is missing, show error
  if (!safeProject) {
    return (
      <aside className="hidden md:flex flex-col w-64 flex-shrink-0 pr-8 border-r border-slate-800">
        <div className="p-6 text-red-500 bg-red-900/20 border border-red-800 rounded-xl m-4">
          <h2 className="text-xl font-bold mb-2">Project Not Found</h2>
          <p>The project configuration for "{network}/{project}" was not found. Please select a valid network.</p>
        </div>
      </aside>
    );
  }

  // Build dynamic sections based on current project
  const net = network || 'testnet';
  const proj = project || 'airchains';
  const sections = [
    { id: 'api-sync', title: 'API & Sync', icon: Settings, path: `/services/${net}/${proj}/api-sync`, items: [] },
    { 
      id: 'installation', 
      title: 'Installation', 
      icon: Rocket, 
      items: [
        { name: 'Manual Installation', path: `/services/${net}/${proj}`, icon: null },
        { name: 'Automatic Installation', path: `/services/${net}/${proj}/automatic-installation`, icon: null },
        { name: 'Create Wallet', path: `/services/${net}/${proj}/create-wallet`, icon: Wallet },
        { name: 'Create Validator', path: `/services/${net}/${proj}/create-validator`, icon: UserCheck },
        { name: 'Monitoring', path: `/services/${net}/${proj}/monitoring`, icon: Activity },
        { name: 'Security', path: `/services/${net}/${proj}/security`, icon: Lock },
        { name: 'Delete node', path: `/services/${net}/${proj}/delete-node`, icon: Trash2 },
      ] 
    },
    { id: 'upgrade', title: 'Upgrade', icon: ChevronsUp, path: `/services/${net}/${proj}/upgrade`, items: [] },
    { id: 'cheat-sheet', title: 'Cheat sheet', icon: ShieldCheck, path: `/services/${net}/${proj}/cheat-sheet`, items: [] },
  ];

  const otherLinks = [
      { name: 'Public RPC Scanner', icon: Rss, path: `/services/${net}/${proj}/public-rpc-scanner` },
  ];

  const officialResources = [
      { name: safeProject.urls?.officialSite || 'Official Site', icon: Globe, path: safeProject.urls?.officialSite || '#', disabled: !safeProject.urls?.officialSite },
  ];

  const NavItem = ({ item, isSubItem = false }) => (
    <NavLink
      to={item.disabled ? '#' : item.path}
      onClick={item.disabled ? handleUnimplementedClick : undefined}
      className={({ isActive }) => 
        `flex items-center w-full text-sm rounded-md transition-colors py-2 ${
          isSubItem ? 'pl-10' : 'pl-4'
        } ${
          isActive && !item.disabled
            ? 'bg-blue-600/20 text-white font-medium'
            : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
        } ${item.disabled ? 'cursor-not-allowed opacity-60' : ''}`
      }
    >
      {item.icon && <item.icon className="w-4 h-4 mr-3" />}
      <span>{item.name}</span>
    </NavLink>
  );

  return (
    <aside className="hidden md:flex flex-col w-64 flex-shrink-0 pr-8 border-r border-slate-800">
      <div className="py-6 space-y-1">
        <div className="flex items-center pl-4 mb-4">
          <div className="h-10 w-10 mr-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">{safeProject.name?.charAt(0) || '?'}</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{safeProject.name || 'Unknown'}</h2>
            <span className="text-xs font-semibold uppercase text-green-400 bg-green-900/50 px-2 py-0.5 rounded">{safeProject.networkLabel || ''}</span>
          </div>
        </div>

        {sections.map(section => (
          <div key={section.id}>
            {section.items.length > 0 ? (
              <button onClick={() => toggleSection(section.id)} className="flex items-center justify-between w-full pl-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/60 rounded-md">
                <div className="flex items-center">
                  <section.icon className="w-4 h-4 mr-3" />
                  <span>{section.title}</span>
                </div>
                {openSections[section.id] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            ) : (
              <NavLink to={section.path} className={({isActive}) => `flex items-center w-full pl-4 py-2 text-sm font-medium rounded-md ${isActive ? 'text-white' : 'text-slate-300'} hover:bg-slate-800/60`}>
                 <section.icon className="w-4 h-4 mr-3" />
                 <span>{section.title}</span>
              </NavLink>
            )}
            <AnimatePresence>
              {openSections[section.id] && section.items.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-1 space-y-1">
                    {section.items.map(item => <NavItem key={item.name} item={item} isSubItem />)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-800 space-y-1">
        {otherLinks.map(item => <NavItem key={item.name} item={item} />)}
      </div>
      <div className="mt-auto pt-4">
        <h3 className="px-4 text-xs font-semibold uppercase text-slate-500 tracking-wider mb-2">Official Resources</h3>
        {officialResources.map(item => <NavItem key={item.name} item={item} />)}
      </div>
    </aside>
  );
};

export default Sidebar;
