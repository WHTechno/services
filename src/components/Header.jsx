import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Server, Send, Twitter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import NetworkSelector from '@/components/NetworkSelector';

const Header = () => {
  const { toast } = useToast();

  const handleUnimplementedClick = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Fitur Belum Tersedia 🚧",
      description: "Fitur ini belum diimplementasikan. Anda bisa memintanya di prompt berikutnya!",
    });
  };

  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 max-w-7xl items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <Server className="h-6 w-6 text-blue-500" />
          <span className="font-bold">NodeServices</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <motion.div variants={navItemVariants}>
            <a 
              href="https://whtech.xyz" 
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Home
            </a>
          </motion.div>
          <motion.div variants={navItemVariants}>
            <a 
              href="https://explorer.whtech.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Explorer
            </a>
          </motion.div>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <NetworkSelector />
          <a href="#" onClick={handleUnimplementedClick} className="text-foreground/60 hover:text-foreground/80 transition-colors"><Send className="h-5 w-5" /></a>
          <a href="#" onClick={handleUnimplementedClick} className="text-foreground/60 hover:text-foreground/80 transition-colors"><Twitter className="h-5 w-5" /></a>
          <Button onClick={handleUnimplementedClick} className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
