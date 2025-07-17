import React from 'react';
import { Helmet } from 'react-helmet';
import CodeBlock from '@/components/CodeBlock';
import PageHeader from '@/components/PageHeader';
import { AlertTriangle } from 'lucide-react';

const DeleteNodePage = () => {
  const deleteNodeCmd = `sudo systemctl stop junctiond
sudo systemctl disable junctiond
sudo rm /etc/systemd/system/junctiond.service
sudo rm $(which junctiond)
rm -rf $HOME/.junction
rm -rf $HOME/junction`;

  return (
    <>
      <Helmet>
        <title>Delete Node | NodeServices</title>
        <meta name="description" content="Panduan untuk menghapus node Airchains dari server Anda." />
      </Helmet>
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 md:p-8">
        <PageHeader title="Delete Node" />
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 mt-6">
          <h2 className="flex items-center text-2xl font-bold text-destructive mb-4">
            <AlertTriangle className="w-6 h-6 mr-3"/>
            Peringatan
          </h2>
          <p className="text-destructive/80 mb-4">Gunakan perintah ini dengan sangat hati-hati. Ini akan menghapus node, service, dan semua data terkait secara permanen dari server Anda.</p>
          <CodeBlock>
              {deleteNodeCmd}
          </CodeBlock>
        </div>
      </div>
    </>
  );
};

export default DeleteNodePage;