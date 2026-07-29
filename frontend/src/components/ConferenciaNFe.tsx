import { useState } from 'react';
import type { ConferenciaNFe as ConferenciaNFeType } from '../types/wms';
import { Barcode, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

interface Props {
  nfeInicial: ConferenciaNFeType;
}

export function ConferenciaNFe({ nfeInicial }: Props) {
  const [nfe, setNfe] = useState<ConferenciaNFeType>(nfeInicial);
  const [eanScanInput, setEanScanInput] = useState('');
  const [mensagemScan, setMensagemScan] = useState<string | null>(null);

  // Simulação de Bipagem de Código de Barras no Recebimento
  const handleBiparEAN = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eanScanInput) return;

    const itemEncontrado = nfe.itens.find((i) => i.ean === eanScanInput);

    if (itemEncontrado) {
      const novosItens = nfe.itens.map((item) => {
        if (item.ean === eanScanInput) {
          const novaQtd = item.quantidadeBipada + 1;
          return {
            ...item,
            quantidadeBipada: novaQtd,
            conferido: novaQtd === item.quantidadeNota,
          };
        }
        return item;
      });

      setNfe({ ...nfe, itens: novosItens });
      setMensagemScan(`✅ Item bipado: ${itemEncontrado.nome}`);
    } else {
      setMensagemScan(`❌ Código EAN ${eanScanInput} não encontrado nesta NFe!`);
    }

    setEanScanInput('');
  };

  return (
    <div className="space-y-6">
      {/* HEADER NFE */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-1 rounded-md">
              CONFERÊNCIA CEGA DE ENTRADA
            </span>
            <span className="text-xs font-mono text-slate-400">{nfe.numeroNFe}</span>
          </div>
          <h3 className="font-extrabold text-white text-xl mt-2">{nfe.fornecedor}</h3>
          <p className="text-xs text-slate-400 font-mono mt-1">Chave: {nfe.chaveAcesso}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl font-mono font-bold text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20">
            STATUS: {nfe.status}
          </span>
        </div>
      </div>

      {/* BIPAGEM SIMULADA DE CÓDIGO DE BARRAS */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h4 className="font-bold text-white text-sm flex items-center gap-2">
          <Barcode className="w-5 h-5 text-cyan-400" /> Bipagem de Produtos no Recebimento (Coletores / Scanners)
        </h4>

        <form onSubmit={handleBiparEAN} className="flex gap-3">
          <input
            type="text"
            value={eanScanInput}
            onChange={(e) => setEanScanInput(e.target.value)}
            placeholder="Digite ou bipe o EAN-13 (Ex: 7891000123456 ou 7892000654321)..."
            className="flex-1 bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl font-mono focus:border-cyan-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-cyan-500 text-slate-950 font-bold text-sm rounded-xl hover:bg-cyan-400 transition flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            Bipar EAN <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {mensagemScan && (
          <div className="p-3 rounded-xl text-xs font-mono font-semibold bg-slate-950 border border-slate-800 text-cyan-300">
            {mensagemScan}
          </div>
        )}
      </div>

      {/* TABELA DE CONFERÊNCIA CEGA */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 bg-slate-950/40">
          <h4 className="font-bold text-white text-sm">Itens da Nota vs Quantidade Bipada Cega</h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 text-xs font-semibold uppercase tracking-wider font-mono">
                <th className="p-4">Produto / EAN</th>
                <th className="p-4">Qtd Esperada (NFe)</th>
                <th className="p-4">Qtd Bipada (Cega)</th>
                <th className="p-4">Divergência</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm font-mono">
              {nfe.itens.map((item) => {
                const diferenca = item.quantidadeBipada - item.quantidadeNota;
                const temDivergencia = diferenca !== 0;

                return (
                  <tr key={item.ean} className="hover:bg-slate-800/40 transition">
                    <td className="p-4 font-sans">
                      <div className="font-bold text-slate-100">{item.nome}</div>
                      <div className="text-xs text-slate-400 font-mono">EAN: {item.ean}</div>
                    </td>

                    <td className="p-4 font-bold text-slate-300">{item.quantidadeNota} CX</td>

                    <td className="p-4 font-bold text-cyan-400">{item.quantidadeBipada} CX</td>

                    <td className="p-4">
                      {temDivergencia ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded border border-rose-500/20">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {diferenca > 0 ? `+${diferenca} Sobrando` : `${diferenca} Faltando`}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                          <CheckCircle className="w-3.5 h-3.5" /> Batido
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      {item.conferido ? (
                        <span className="text-xs font-bold text-emerald-400">100% Ok</span>
                      ) : (
                        <span className="text-xs text-amber-400">Em conferência...</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
