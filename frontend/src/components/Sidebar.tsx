import { 
  LayoutDashboard, 
  Package, 
  Boxes, 
  FileCheck2, 
  Smartphone, 
  Building2
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Painel Geral (KPIs)', icon: LayoutDashboard },
    { id: 'produtos', label: 'Cadastro de Produtos', icon: Package },
    { id: 'wms', label: 'WMS & Validades (FEFO)', icon: Boxes },
    { id: 'nfe', label: 'Conferência Cega NFe', icon: FileCheck2 },
    { id: 'coletor', label: 'Coletor PWA (Handheld)', icon: Smartphone },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between hidden md:flex shrink-0">
      <div>
        {/* LOGO & BRANDING */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl text-slate-950 shadow-lg shadow-cyan-500/20">
            <Building2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-extrabold text-white text-lg tracking-tight font-mono">SystemWalls</h1>
            <p className="text-[11px] text-cyan-400 font-medium">ERP & WMS Supermercados</p>
          </div>
        </div>

        {/* NAVIGATION MENU */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* FOOTER USER / STATUS */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold text-xs font-mono">
            GP
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-200 truncate">Geovane Paredes</p>
            <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> WMS Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
