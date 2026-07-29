import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardMetrics } from './components/DashboardMetrics';
import { TabelaProdutos } from './components/TabelaProdutos';
import { VisualizadorWMS } from './components/VisualizadorWMS';
import { ConferenciaNFe } from './components/ConferenciaNFe';
import { SimuladorColetorPWA } from './components/SimuladorColetorPWA';
import { CadastroProdutoModal } from './components/CadastroProdutoModal';

import { INITIAL_PRODUTOS, INITIAL_LOTES_FEFO, INITIAL_ENDERECOS, INITIAL_NFE } from './data/mockData';
import type { Produto } from './types/wms';
import { Plus } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>(INITIAL_PRODUTOS);
  const [lotes] = useState(INITIAL_LOTES_FEFO);
  const [enderecos] = useState(INITIAL_ENDERECOS);
  const [nfe] = useState(INITIAL_NFE);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSalvarProduto = (novoProduto: Produto) => {
    setProdutos((prev) => [novoProduto, ...prev]);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* SIDEBAR NAVEGAÇÃO */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <main className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          {/* HEADER DA TAB */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                {activeTab === 'dashboard' && 'Painel Geral & Métricas Operacionais'}
                {activeTab === 'produtos' && 'Gestão Administrativa de Produtos'}
                {activeTab === 'wms' && 'WMS — Endereçamento & Validades FEFO'}
                {activeTab === 'nfe' && 'Recebimento & Conferência Cega NFe'}
                {activeTab === 'coletor' && 'Simulador de Coletor PWA (Android Handheld)'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                SystemWalls WMS Enterprise — Gestão Operacional de Supermercados
              </p>
            </div>

            {/* BOTÃO ADICIONAR PRODUTO */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-sm transition shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Cadastrar Produto
            </button>
          </div>

          {/* MÉTRICAS (MANTIDAS NO TOPO) */}
          <DashboardMetrics produtos={produtos} lotes={lotes} enderecos={enderecos} />

          {/* CONTEÚDO DINÂMICO DAS TABS */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <TabelaProdutos produtos={produtos} searchTerm={searchTerm} />
              <VisualizadorWMS lotes={lotes} enderecos={enderecos} />
            </div>
          )}

          {activeTab === 'produtos' && (
            <TabelaProdutos produtos={produtos} searchTerm={searchTerm} />
          )}

          {activeTab === 'wms' && (
            <VisualizadorWMS lotes={lotes} enderecos={enderecos} />
          )}

          {activeTab === 'nfe' && (
            <ConferenciaNFe nfeInicial={nfe} />
          )}

          {activeTab === 'coletor' && (
            <SimuladorColetorPWA produtos={produtos} lotes={lotes} />
          )}
        </main>
      </div>

      {/* MODAL DE CADASTRO */}
      <CadastroProdutoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSalvarProduto}
      />
    </div>
  );
}

export default App;
