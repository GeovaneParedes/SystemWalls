import type { Produto, LoteFEFO, EnderecoWMS } from '../types/wms';
import { Package, AlertTriangle, Boxes, DollarSign } from 'lucide-react';

interface Props {
  produtos: Produto[];
  lotes: LoteFEFO[];
  enderecos: EnderecoWMS[];
}

export function DashboardMetrics({ produtos, lotes, enderecos }: Props) {
  const totalProdutos = produtos.length;
  const lotesCriticos = lotes.filter((l) => l.status === 'CRITICO' || l.status === 'PROXIMO_VENCIMENTO').length;
  
  const totalPaletesCapacidade = enderecos.reduce((acc, e) => acc + e.capacidadePaletes, 0);
  const totalPaletesOcupados = enderecos.reduce((acc, e) => acc + e.ocupadoPaletes, 0);
  const ocupacaoPercentual = totalPaletesCapacidade > 0 ? Math.round((totalPaletesOcupados / totalPaletesCapacidade) * 100) : 0;

  const valorTotalEstoque = produtos.reduce((acc, p) => acc + (p.estoqueAtual * p.precoCusto), 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* CARD 1: Total SKUs */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
        <div>
          <p className="text-xs text-slate-400 font-medium">SKUs Cadastrados</p>
          <h3 className="text-2xl font-extrabold text-white mt-1">{totalProdutos}</h3>
          <p className="text-[11px] text-cyan-400 mt-1 font-mono">Itens ativos no catálogo</p>
        </div>
        <div className="p-3 bg-slate-800 rounded-xl text-cyan-400 border border-slate-700">
          <Package className="w-6 h-6" />
        </div>
      </div>

      {/* CARD 2: Alertas FEFO */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
        <div>
          <p className="text-xs text-slate-400 font-medium">Validades FEFO Críticas</p>
          <h3 className="text-2xl font-extrabold text-rose-400 mt-1">{lotesCriticos} <span className="text-xs text-slate-400 font-normal">lotes</span></h3>
          <p className="text-[11px] text-rose-400 mt-1 font-mono">Vencimento &lt; 15 dias</p>
        </div>
        <div className="p-3 bg-slate-800 rounded-xl text-rose-400 border border-slate-700">
          <AlertTriangle className="w-6 h-6" />
        </div>
      </div>

      {/* CARD 3: Ocupação WMS */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
        <div>
          <p className="text-xs text-slate-400 font-medium">Ocupação do WMS</p>
          <h3 className="text-2xl font-extrabold text-white mt-1">{ocupacaoPercentual}%</h3>
          <p className="text-[11px] text-amber-400 mt-1 font-mono">{totalPaletesOcupados}/{totalPaletesCapacidade} Paletes em Uso</p>
        </div>
        <div className="p-3 bg-slate-800 rounded-xl text-amber-400 border border-slate-700">
          <Boxes className="w-6 h-6" />
        </div>
      </div>

      {/* CARD 4: Valor em Estoque */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-lg">
        <div>
          <p className="text-xs text-slate-400 font-medium">Valor Total em Custo</p>
          <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">R$ {valorTotalEstoque.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
          <p className="text-[11px] text-emerald-400 mt-1 font-mono">Patrimônio no Depósito</p>
        </div>
        <div className="p-3 bg-slate-800 rounded-xl text-emerald-400 border border-slate-700">
          <DollarSign className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
