import React from 'react';
import { Helmet } from 'react-helmet';
import CodeBlock from '@/components/CodeBlock';
import PageHeader from '@/components/PageHeader';

const MonitoringPage = () => {
  const installNodeExporter = `sudo wget https://github.com/prometheus/node_exporter/releases/download/v1.6.1/node_exporter-1.6.1.linux-amd64.tar.gz
sudo tar xvf node_exporter-1.6.1.linux-amd64.tar.gz
sudo mv node_exporter-1.6.1.linux-amd64/node_exporter /usr/local/bin
rm -rf node_exporter*`;

  const createExporterService = `sudo tee /etc/systemd/system/node_exporter.service > /dev/null <<EOF
[Unit]
Description=Node Exporter
After=network-online.target

[Service]
User=root
ExecStart=/usr/local/bin/node_exporter
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF`;

  const startExporter = `sudo systemctl daemon-reload
sudo systemctl enable node_exporter
sudo systemctl restart node_exporter`;

  return (
    <>
      <Helmet>
        <title>Monitoring | NodeServices</title>
        <meta name="description" content="Panduan untuk memonitor node Airchains Anda menggunakan Prometheus dan Grafana." />
      </Helmet>
      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 md:p-8">
        <PageHeader title="Monitoring" subtitle="Siapkan monitoring untuk node Anda agar tetap sehat." />
        
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Install Node Exporter</h2>
        <p className="text-slate-300 mb-4">
          Node Exporter akan mengumpulkan metrik dari server Anda.
        </p>
        <CodeBlock title="Download and install Node Exporter">{installNodeExporter}</CodeBlock>
        <CodeBlock title="Create service file for Node Exporter">{createExporterService}</CodeBlock>
        <CodeBlock title="Start Node Exporter">{startExporter}</CodeBlock>
        <p className="text-slate-400 mt-4">
          Setelah selesai, Anda dapat mengakses metrik di <code data-code-block>http://YOUR_IP:9100/metrics</code>.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Check Validator Status</h2>
        <p className="text-slate-300 mb-4">
          Periksa informasi validator Anda, termasuk voting power dan status jailing.
        </p>
        <CodeBlock title="Check validator info">{`junctiond query staking validator $(junctiond keys show MyWallet --bech val -a)`}</CodeBlock>
      </div>
    </>
  );
};

export default MonitoringPage;