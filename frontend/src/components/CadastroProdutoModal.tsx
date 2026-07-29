import { useState } from 'react';
import type { Produto } from '../types/wms';
import { X, Save, Plus } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (produto: Produto) => void;
}

export function CadastroProdutoModal({ isOpen, onClose, onSave }: Props) {
  const [nome, setNome] = useState('');
  const [sku] = useState('');
  const [ean, setEan] = useState('');
  const [categoria, setCategoria] = useState<Produto['categoria']>('Mercearia');
  const [marca, setMarca] = useState('');
  const [precoCusto, setPrecoCusto] = useState<number>(0);
  const [precoVenda, setPrecoVenda] = useState<number>(0);
  const [fatorConversao, setFatorConversao] = useState<number>(12);
  const [unidadeCompra, setUnidadeCompra] = useState('CX 12');
  const [unidadeVenda, setUnidadeVenda] = useState('UN');
  const [ncm, setNcm] = useState('1006.30.21');
  const [cest, setCest] = useState('17.015.00');
  const [fornecedor] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novoProduto: Produto = {
      id: `PROD-${Date.now().toString().slice(-4)}`,
      sku: sku || `SKU-${Date.now().toString().slice(-4)}`,
      ean: ean || `789${Math.floor(1000000009 + Math.random() * 9000000000)}`,
      nome,
      marca: marca || 'Genérica',
      categoria,
      precoCusto: Number(precoCusto),
      precoVenda: Number(precoVenda),
      fatorConversao: Number(fatorConversao),
      unidadeCompra,
      unidadeVenda,
      ncm,
      cest,
      fornecedor: fornecedor || 'Fornecedor Padrão',
      estoqueAtual: 0,
      estoqueMinimo: 20,
    };
    onSave(novoProduto);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* HEADER */}
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/60">
          <div className="flex items-center gap-2 text-cyan-400">
            <Plus className="w-5 h-5" />
            <h3 className="font-extrabold text-white text-lg">Novo Cadastro de Produto</h3>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300">Nome do Produto *</label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Leite Integral 1L Parmalat"
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-2.5 rounded-xl mt-1 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Código de Barras (EAN-13) *</label>
              <input
                type="text"
                required
                value={ean}
                onChange={(e) => setEan(e.target.value)}
                placeholder="7891000123456"
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-2.5 rounded-xl mt-1 font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Categoria *</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-2.5 rounded-xl mt-1 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Mercearia">Mercearia</option>
                <option value="Laticínios">Laticínios</option>
                <option value="Hortifrúti">Hortifrúti</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Limpeza">Limpeza</option>
                <option value="Açougue">Açougue</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Marca / Fabricante</label>
              <input
                type="text"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                placeholder="Ex: Parmalat / Nestlé"
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-2.5 rounded-xl mt-1 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Preço de Custo (R$) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={precoCusto}
                onChange={(e) => setPrecoCusto(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-2.5 rounded-xl mt-1 font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Preço de Venda (R$) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={precoVenda}
                onChange={(e) => setPrecoVenda(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-2.5 rounded-xl mt-1 font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Fator de Conversão (Qtd em Caixa) *</label>
              <input
                type="number"
                required
                value={fatorConversao}
                onChange={(e) => setFatorConversao(Number(e.target.value))}
                placeholder="Ex: 12 (1 CX = 12 UN)"
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-2.5 rounded-xl mt-1 font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Unidade de Compra / Venda</label>
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={unidadeCompra}
                  onChange={(e) => setUnidadeCompra(e.target.value)}
                  placeholder="CX 12"
                  className="w-1/2 bg-slate-950 border border-slate-800 text-slate-200 text-sm p-2.5 rounded-xl font-mono focus:border-cyan-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={unidadeVenda}
                  onChange={(e) => setUnidadeVenda(e.target.value)}
                  placeholder="UN"
                  className="w-1/2 bg-slate-950 border border-slate-800 text-slate-200 text-sm p-2.5 rounded-xl font-mono focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Código NCM (Fiscal)</label>
              <input
                type="text"
                value={ncm}
                onChange={(e) => setNcm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-2.5 rounded-xl mt-1 font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Código CEST</label>
              <input
                type="text"
                value={cest}
                onChange={(e) => setCest(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-2.5 rounded-xl mt-1 font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Save className="w-4 h-4" /> Salvar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
