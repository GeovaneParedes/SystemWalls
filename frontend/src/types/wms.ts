export interface Produto {
  id: string;
  sku: string;
  ean: string;
  nome: string;
  marca: string;
  categoria: 'Hortifrúti' | 'Laticínios' | 'Mercearia' | 'Bebidas' | 'Limpeza' | 'Açougue';
  precoCusto: number;
  precoVenda: number;
  fatorConversao: number; // Ex: Caixa com 24 unidades
  unidadeCompra: string; // Ex: CX 24
  unidadeVenda: string;  // Ex: UN
  ncm: string;
  cest: string;
  fornecedor: string;
  estoqueAtual: number;
  estoqueMinimo: number;
}

export interface LoteFEFO {
  id: string;
  produtoId: string;
  produtoNome: string;
  ean: string;
  lote: string;
  dataValidade: string;
  diasParaVencimento: number;
  quantidade: number;
  enderecoCodigo: string;
  status: 'NORMAL' | 'PROXIMO_VENCIMENTO' | 'CRITICO' | 'VENCIDO';
}

export interface EnderecoWMS {
  id: string;
  codigo: string; // Ex: COR-01-PR-02-N3
  corredor: string;
  prateleira: string;
  nivel: string;
  capacidadePaletes: number;
  ocupadoPaletes: number;
  tipo: 'ARMAZENAGEM' | 'PICKING' | 'AVARIA' | 'DOCA_RECEBIMENTO';
}

export interface ConferenciaItem {
  ean: string;
  nome: string;
  quantidadeNota: number;
  quantidadeBipada: number;
  conferido: boolean;
}

export interface ConferenciaNFe {
  numeroNFe: string;
  chaveAcesso: string;
  fornecedor: string;
  dataEmissao: string;
  itens: ConferenciaItem[];
  status: 'PENDENTE' | 'EM_CONFERENCIA' | 'APROVADO' | 'DIVERGENTE';
}
