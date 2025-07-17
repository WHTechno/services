import React from 'react';
import { Server } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Footer = () => {
    const { toast } = useToast();
    const currentYear = new Date().getFullYear();

    const handleLinkClick = (e) => {
        e.preventDefault();
        toast({
            title: "🚧 Fitur Belum Tersedia 🚧",
            description: "Halaman ini belum ada. Anda bisa memintanya di prompt berikutnya!",
        });
    };

  return (
    <footer className="border-t border-border/40 py-8">
      <div className="container max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
            <Server className="h-6 w-6 text-blue-500" />
            <p className="text-base font-bold">NodeServices</p>
        </div>
        <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} NodeServices. All Rights Reserved.</p>
            <p>Dibangun dengan penuh semangat oleh Hostinger Horizons AI.</p>
        </div>
        <nav className="flex gap-4">
            <a href="#" onClick={handleLinkClick} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" onClick={handleLinkClick} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;