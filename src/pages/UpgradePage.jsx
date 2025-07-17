import React from 'react';
import { Helmet } from 'react-helmet';
import CodeBlock from '@/components/CodeBlock';
import PageHeader from '@/components/PageHeader';

const UpgradePage = () => {
  const upgradeCmd = `cd $HOME/junction
git pull
git checkout v0.0.4 # Ganti dengan versi terbaru
go mod tidy
go build -o junctiond cmd/junctiond/main.go
chmod +x junctiond
sudo mv junctiond /usr/local/bin/
sudo systemctl restart junctiond`;

  return (
    <>
      <Helmet>
        <title>Upgrade | NodeServices</title>
        <meta name="description" content="Panduan untuk melakukan upgrade pada node Airchains Anda." />
      </Helmet>
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 md:p-8">
        <PageHeader title="Upgrade" subtitle="Ikuti langkah-langkah ini untuk memperbarui node Anda ke versi terbaru." />
        
        <p className="text-slate-300 mb-4">
          Selalu periksa pengumuman resmi untuk versi terbaru dan instruksi upgrade spesifik. Perintah di bawah ini adalah contoh umum.
        </p>
        <CodeBlock title="Upgrade node binary">
          {upgradeCmd}
        </CodeBlock>
        <p className="text-slate-400 mt-4">
          Setelah restart, periksa log untuk memastikan node berjalan dengan baik pada versi baru.
        </p>
        <CodeBlock title="Check logs">{`sudo journalctl -u junctiond -f -o cat`}</CodeBlock>
      </div>
    </>
  );
};

export default UpgradePage;