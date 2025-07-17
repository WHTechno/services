import React from 'react';
import { Helmet } from 'react-helmet';
import CodeBlock from '@/components/CodeBlock';
import PageHeader from '@/components/PageHeader';

const SecurityPage = () => {
  const setupFirewall = `sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 26656
sudo ufw enable`;

  const disableRootLogin = `sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart sshd`;

  return (
    <>
      <Helmet>
        <title>Security | NodeServices</title>
        <meta name="description" content="Praktik terbaik keamanan untuk node Airchains Anda." />
      </Helmet>
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 md:p-8">
        <PageHeader title="Security" subtitle="Amankan node Anda dengan praktik terbaik berikut." />
        
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Setup Firewall</h2>
        <p className="text-slate-300 mb-4">
          Konfigurasi firewall untuk hanya mengizinkan koneksi yang diperlukan. Ganti port SSH jika Anda menggunakan port kustom.
        </p>
        <CodeBlock title="Configure UFW (Uncomplicated Firewall)">{setupFirewall}</CodeBlock>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Disable Root Login</h2>
        <p className="text-slate-300 mb-4">
          Mencegah login langsung sebagai root melalui SSH adalah langkah keamanan yang penting. Pastikan Anda memiliki pengguna non-root dengan hak sudo.
        </p>
        <CodeBlock title="Disable SSH root login">{disableRootLogin}</CodeBlock>
      </div>
    </>
  );
};

export default SecurityPage;