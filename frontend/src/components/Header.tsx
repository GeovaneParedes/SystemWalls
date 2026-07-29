import { Search, Bell, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function Header({ searchTerm, setSearchTerm }: HeaderProps) {
  return (
    <header className="h-20 bg-slate-900/80 border-b border-slate-800 px-6 flex items-center justify-between gap-4 sticky top-0 z-40 backdrop-blur-md">
      {/* BARRA DE PESQUISA RÁPIDA (EAN / SKU) */}
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar por Nome, EAN-13, SKU ou Lote..."
          className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-cyan-500/50 transition font-mono placeholder:font-sans placeholder:text-slate-500"
        />
      </div>

      {/* ÍCONES & STATUS */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
          <ShieldCheck className="w-4 h-4" /> FEFO Ativo
        </div>

        <button className="relative p-2.5 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-cyan-400 absolute top-2 right-2 animate-ping" />
        </button>
      </div>
    </header>
  );
}
