import { useState } from 'react';
import type { Produto, LoteFEFO } from '../types/wms';
import { Smartphone, Scan, MapPin, Calendar } from 'lucide-react';

interface Props {
  produtos: Produto[];
  lotes: LoteFEFO[];
}

export function SimuladorColetorPWA({ produtos, lotes }: Props) {
  const [eanScan, setEanScan] = useState('7891000123456');
  const [produtoEncontrado, setProdutoEncontrado] = useState<Produto | null>(produtos[0]);

  const handleScan = (ean: string) => {
    setEanScan(ean);
    const prod = produtos.find((p) => p.ean === ean);
    setProdutoEncontrado(prod || null);
  };

  const loteDoProduto = lotes.find((l) => l.ean === eanScan);

  return (
    <div className="flex flex-col items-center justify-center py-6 space-y-6">
      <div className="text-center max-w-md space-y-1">
        <h3 className="font-extrabold text-white text-lg flex items-center justify-center gap-2">
          <Smartphone className="w-5 h-5 text-cyan-400" />
          Simulador de Coletor PWA (Zebra / Honeywell)
        </h3>
        <p className="text-xs text-slate-400">
          Interface mobile para operadores de depósito consultarem endereços e validade FEFO no scanner.
        </p>
      </div>

      {/* FRAME DO DISPOSITIVO ANDROID / HANDHELD */}
      <div className="w-[360px] bg-slate-900 border-4 border-slate-700 rounded-[36px] overflow-hidden shadow-2xl p-4 space-y-4">
        {/* BARRA SUPERIOR DO DISPOSITIVO */}
        <div className="flex justify-between items-center px-2 pt-1 text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-2">
          <span className="font-bold text-cyan-400">SystemWalls Handheld v1.0</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Wi-Fi Depósito</span>
        </div>

        {/* BOTÕES DE BIPAGEM RÁPIDA SIMULADA */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-300">Selecione o EAN para Simular Leitura:</label>
          <div className="grid grid-cols-2 gap-2">
            {produtos.slice(0, 4).map((p) => (
              <button
                key={p.id}
                onClick={() => handleScan(p.ean)}
                className={`p-2 rounded-xl text-left border text-[11px] font-mono transition ${
                  eanScan === p.ean
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="truncate font-sans text-white">{p.nome.split(' ')[0]} {p.nome.split(' ')[1]}</div>
                <div className="text-[10px] text-slate-500">{p.ean.slice(-6)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* TELA DO COLETOR DE DADOS */}
        {produtoEncontrado ? (
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                EAN: {produtoEncontrado.ean}
              </span>
              <Scan className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>

            <div>
              <h4 className="font-extrabold text-white text-sm">{produtoEncontrado.nome}</h4>
              <p className="text-[11px] text-slate-400 font-mono">SKU: {produtoEncontrado.sku}</p>
            </div>

            {/* ENDEREÇAMENTO FÍSICO */}
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-medium block">Endereço de Picking</span>
                <span className="font-mono font-extrabold text-cyan-400 text-sm">
                  {loteDoProduto ? loteDoProduto.enderecoCodigo : 'COR-01-PR-01-N1'}
                </span>
              </div>
              <MapPin className="w-5 h-5 text-cyan-400" />
            </div>

            {/* CONVERSÃO DE EMBALAGEM */}
            <div className="text-[11px] font-mono text-amber-400 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
              Conversão: 1 {produtoEncontrado.unidadeCompra} = {produtoEncontrado.fatorConversao} {produtoEncontrado.unidadeVenda}
            </div>

            {/* VALIDADE FEFO */}
            {loteDoProduto && (
              <div className={`p-2.5 rounded-xl border text-[11px] font-mono flex items-center justify-between ${
                loteDoProduto.status === 'CRITICO' ? 'bg-rose-500/20 border-rose-500/40 text-rose-400' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Validade: {loteDoProduto.dataValidade}</span>
                </div>
                <span className="font-bold">{loteDoProduto.quantidade} UN</span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500 text-xs font-mono">
            Nenhum produto escaneado.
          </div>
        )}
      </div>
    </div>
  );
}
