import type { LoteFEFO, EnderecoWMS } from '../types/wms';
import { Boxes, AlertTriangle, Calendar, MapPin } from 'lucide-react';

interface Props {
  lotes: LoteFEFO[];
  enderecos: EnderecoWMS[];
}

export function VisualizadorWMS({ lotes, enderecos }: Props) {
  return (
    <div className="space-y-6">
      {/* HEADER DA SEÇÃO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h3 className="font-extrabold text-white text-lg flex items-center gap-2">
            <Boxes className="w-5 h-5 text-amber-400" />
            WMS — Endereçamento de Depósito & Gestão FEFO
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitoramento físico de paletes por corredor/nível e ordenação por prioridade de vencimento (*First Expire, First Out*).
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold">
            FEFO Ativo: Vencimentos Próximos Primeiro
          </span>
        </div>
      </div>

      {/* LOTES FEFO EM ALERTA */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400" /> Lotes com Vencimento Próximo (Prioridade de Saída)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lotes.map((lote) => {
            const isCritico = lote.status === 'CRITICO';

            return (
              <div
                key={lote.id}
                className={`p-4 rounded-2xl border bg-slate-900/90 transition shadow-lg ${
                  isCritico ? 'border-rose-500/40 bg-rose-950/20' : 'border-slate-800'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      isCritico
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/30 animate-pulse'
                        : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    }`}
                  >
                    {isCritico ? `VENCE EM ${lote.diasParaVencimento} DIAS` : `VALIDADE OK (${lote.diasParaVencimento} dias)`}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-bold">{lote.lote}</span>
                </div>

                <h5 className="font-bold text-slate-100 text-sm mb-1">{lote.produtoNome}</h5>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono text-slate-300 font-semibold">{lote.enderecoCodigo}</span>
                </div>

                <div className="flex justify-between items-center text-xs font-mono bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>Validade: {lote.dataValidade}</span>
                  </div>
                  <span className="font-bold text-amber-400">{lote.quantidade} UN</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAPA DE ENDEREÇAMENTO FÍSICO DO DEPÓSITO */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <Boxes className="w-4 h-4 text-cyan-400" /> Mapeamento Físico de Endereços WMS
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enderecos.map((end) => {
            const percentual = Math.round((end.ocupadoPaletes / end.capacidadePaletes) * 100);

            return (
              <div key={end.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="font-mono font-bold text-cyan-400 text-xs bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    {end.codigo}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">{end.tipo}</span>
                </div>

                <div className="text-xs space-y-1 text-slate-300">
                  <p><strong className="text-slate-400">Corredor:</strong> {end.corredor}</p>
                  <p><strong className="text-slate-400">Posição:</strong> {end.prateleira} ({end.nivel})</p>
                </div>

                {/* BARRA DE OCUPAÇÃO */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Capacidade</span>
                    <span className="font-bold text-slate-200">{end.ocupadoPaletes}/{end.capacidadePaletes} Paletes ({percentual}%)</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full transition-all ${
                        percentual >= 100 ? 'bg-rose-500' : percentual >= 75 ? 'bg-amber-500' : 'bg-cyan-500'
                      }`}
                      style={{ width: `${percentual}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
