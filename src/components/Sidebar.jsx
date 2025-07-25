import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Settings, Rocket, ShieldCheck, Trash2, ChevronsUp, BarChart2, Users, Rss, Bot, Globe, Wallet, UserCheck, Activity, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import projects from '@/config/projects';

const Sidebar = () => {
  const { toast } = useToast();
  const { project } = useParams();
  const currentProject = projects[project] || projects.airchains;
  
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

  // Build dynamic sections based on current project
  const sections = [
    { id: 'api-sync', title: 'API & Sync', icon: Settings, path: `/services/testnet/${project || 'airchains'}/api-sync`, items: [] },
    { 
      id: 'installation', 
      title: 'Installation', 
      icon: Rocket, 
      items: [
        { name: 'Manual Installation', path: `/services/testnet/${project || 'airchains'}`, icon: null },
        { name: 'Automatic Installation', path: `/services/testnet/${project || 'airchains'}/automatic-installation`, icon: null },
        { name: 'Create Wallet', path: `/services/testnet/${project || 'airchains'}/create-wallet`, icon: Wallet },
        { name: 'Create Validator', path: `/services/testnet/${project || 'airchains'}/create-validator`, icon: UserCheck },
        { name: 'Monitoring', path: `/services/testnet/${project || 'airchains'}/monitoring`, icon: Activity },
        { name: 'Security', path: `/services/testnet/${project || 'airchains'}/security`, icon: Lock },
        { name: 'Delete node', path: `/services/testnet/${project || 'airchains'}/delete-node`, icon: Trash2 },
      ] 
    },
    { id: 'upgrade', title: 'Upgrade', icon: ChevronsUp, path: `/services/testnet/${project || 'airchains'}/upgrade`, items: [] },
    { id: 'cheat-sheet', title: 'Cheat sheet', icon: ShieldCheck, path: `/services/testnet/${project || 'airchains'}/cheat-sheet`, items: [] },
  ];

  const otherLinks = [
      { name: 'Decentralization Analytics', icon: BarChart2, path: '#', disabled: true },
      { name: 'Consensus', icon: Users, path: '#', disabled: true },
      { name: 'Public RPC Scanner', icon: Rss, path: `/services/testnet/${project || 'airchains'}/public-rpc-scanner` },
      { name: 'Proposal Bot', icon: Bot, path: '#', disabled: true },
  ];

  const officialResources = [
      { name: currentProject.urls?.officialSite || 'Official Site', icon: Globe, path: '#', disabled: true },
  ]

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
            <span className="text-white font-bold text-lg">{currentProject.name.charAt(0)}</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{currentProject.name}</h2>
            <span className="text-xs font-semibold uppercase text-green-400 bg-green-900/50 px-2 py-0.5 rounded">{currentProject.networkLabel}</span>
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
