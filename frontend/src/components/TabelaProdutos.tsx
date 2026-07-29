import type { Produto } from '../types/wms';
import { Tag, ArrowRightLeft } from 'lucide-react';

interface Props {
  produtos: Produto[];
  searchTerm: string;
}

export function TabelaProdutos({ produtos, searchTerm }: Props) {
  const filtered = produtos.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.ean.includes(searchTerm) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
        <div>
          <h3 className="font-bold text-white text-base">Catálogo de Produtos & Conversão de Embalagens</h3>
          <p className="text-xs text-slate-400">Listagem de SKUs, EAN-13, tributação NCM e fator de conversão de estoque.</p>
        </div>
        <span className="text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full">
          {filtered.length} Itens Exibidos
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs font-semibold uppercase tracking-wider font-mono">
              <th className="p-4">Produto / EAN-13</th>
              <th className="p-4">Categoria</th>
              <th className="p-4">Fator de Conversão</th>
              <th className="p-4">Preço Custo / Venda</th>
              <th className="p-4">Estoque Atual</th>
              <th className="p-4">Fiscal (NCM/CEST)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-sm">
            {filtered.map((p) => {
              const margemPercentual = Math.round(((p.precoVenda - p.precoCusto) / p.precoCusto) * 100);

              return (
                <tr key={p.id} className="hover:bg-slate-800/40 transition">
                  {/* PRODUTO / EAN */}
                  <td className="p-4">
                    <div className="font-bold text-slate-100">{p.nome}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5 font-mono">
                      <span>EAN: {p.ean}</span>
                      <span className="text-slate-600">|</span>
                      <span>SKU: {p.sku}</span>
                    </div>
                  </td>

                  {/* CATEGORIA */}
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                      <Tag className="w-3 h-3 text-cyan-400" />
                      {p.categoria}
                    </span>
                  </td>

                  {/* FATOR DE CONVERSÃO */}
                  <td className="p-4 font-mono text-xs">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                      1 {p.unidadeCompra} = {p.fatorConversao} {p.unidadeVenda}
                    </div>
                  </td>

                  {/* PREÇOS & MARGEM */}
                  <td className="p-4 font-mono text-xs">
                    <div className="text-slate-300">Custo: R$ {p.precoCusto.toFixed(2)}</div>
                    <div className="text-emerald-400 font-bold">Venda: R$ {p.precoVenda.toFixed(2)} <span className="text-[10px] text-emerald-500">({margemPercentual}%)</span></div>
                  </td>

                  {/* ESTOQUE */}
                  <td className="p-4 font-mono">
                    <span className={`font-bold text-sm ${p.estoqueAtual <= p.estoqueMinimo ? 'text-rose-400' : 'text-slate-200'}`}>
                      {p.estoqueAtual} {p.unidadeVenda}
                    </span>
                    {p.estoqueAtual <= p.estoqueMinimo && (
                      <div className="text-[10px] text-rose-400 font-sans font-semibold">Abaixo do Mínimo ({p.estoqueMinimo})</div>
                    )}
                  </td>

                  {/* FISCAL */}
                  <td className="p-4 text-xs font-mono text-slate-400">
                    <div>NCM: {p.ncm}</div>
                    <div className="text-[11px] text-slate-500">CEST: {p.cest}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
