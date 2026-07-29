import type { Produto, LoteFEFO, EnderecoWMS, ConferenciaNFe } from '../types/wms.js';

export class WMSCoreService {
  private produtos: Map<string, Produto> = new Map();
  private lotes: Map<string, LoteFEFO> = new Map();
  private enderecos: Map<string, EnderecoWMS> = new Map();
  private nfeConferencia: ConferenciaNFe;

  constructor() {
    this.inicializarDadosMock();

    this.nfeConferencia = {
      numeroNFe: 'NFe-00045892',
      chaveAcesso: '3526 0712 3456 7800 0199 5500 1000 0458 9210 9876 5432',
      fornecedor: 'Lactalis Brasil Ltda',
      dataEmissao: '2026-07-28',
      status: 'EM_CONFERENCIA',
      itens: [
        { ean: '7891000123456', nome: 'Leite Integral 1L Parmalat (CX 12)', quantidadeNota: 20, quantidadeBipada: 18, conferido: false },
        { ean: '7892000654321', nome: 'Arroz Tipo 1 Tio João 5kg (FD 6)', quantidadeNota: 15, quantidadeBipada: 15, conferido: true },
        { ean: '7894900011517', nome: 'Refrigerante Coca-Cola 2L (FD 6)', quantidadeNota: 30, quantidadeBipada: 0, conferido: false },
      ],
    };
  }

  private inicializarDadosMock() {
    const prods: Produto[] = [
      {
        id: 'PROD-001',
        sku: 'SKU-LEITE-01',
        ean: '7891000123456',
        nome: 'Leite Integral 1L Parmalat',
        marca: 'Parmalat',
        categoria: 'Laticínios',
        precoCusto: 3.80,
        precoVenda: 5.49,
        fatorConversao: 12,
        unidadeCompra: 'CX 12',
        unidadeVenda: 'UN',
        ncm: '0401.20.10',
        cest: '17.001.00',
        fornecedor: 'Lactalis Brasil Ltda',
        estoqueAtual: 480,
        estoqueMinimo: 100,
      },
      {
        id: 'PROD-002',
        sku: 'SKU-ARROZ-05',
        ean: '7892000654321',
        nome: 'Arroz Tipo 1 Tio João 5kg',
        marca: 'Tio João',
        categoria: 'Mercearia',
        precoCusto: 22.50,
        precoVenda: 29.90,
        fatorConversao: 6,
        unidadeCompra: 'FD 6',
        unidadeVenda: 'UN',
        ncm: '1006.30.21',
        cest: '17.015.00',
        fornecedor: 'Josapar Joaquim Oliveira S.A.',
        estoqueAtual: 180,
        estoqueMinimo: 50,
      },
    ];

    prods.forEach((p) => this.produtos.set(p.id, p));

    const lotesInit: LoteFEFO[] = [
      {
        id: 'LOTE-101',
        produtoId: 'PROD-001',
        produtoNome: 'Leite Integral 1L Parmalat',
        ean: '7891000123456',
        lote: 'L-2026-081',
        dataValidade: '2026-08-05',
        diasParaVencimento: 8,
        quantidade: 120,
        enderecoCodigo: 'COR-01-PR-01-N1',
        status: 'CRITICO',
      },
      {
        id: 'LOTE-102',
        produtoId: 'PROD-001',
        produtoNome: 'Leite Integral 1L Parmalat',
        ean: '7891000123456',
        lote: 'L-2026-095',
        dataValidade: '2026-09-20',
        diasParaVencimento: 54,
        quantidade: 360,
        enderecoCodigo: 'COR-01-PR-01-N2',
        status: 'NORMAL',
      },
    ];

    lotesInit.forEach((l) => this.lotes.set(l.id, l));

    const endInit: EnderecoWMS[] = [
      { id: 'END-01', codigo: 'COR-01-PR-01-N1', corredor: 'Corredor 01', prateleira: 'Prateleira 01', nivel: 'Nível 1 (Picking)', capacidadePaletes: 2, ocupadoPaletes: 2, tipo: 'PICKING' },
      { id: 'END-02', codigo: 'COR-01-PR-01-N2', corredor: 'Corredor 01', prateleira: 'Prateleira 01', nivel: 'Nível 2 (Aéreo)', capacidadePaletes: 4, ocupadoPaletes: 3, tipo: 'ARMAZENAGEM' },
    ];

    endInit.forEach((e) => this.enderecos.set(e.id, e));
  }

  // --- MÉTODOS PRODUTOS ---
  public obterProdutos(): Produto[] {
    return Array.from(this.produtos.values());
  }

  public cadastrarProduto(prod: Omit<Produto, 'id'>): Produto {
    const id = `PROD-${Date.now().toString().slice(-4)}`;
    const novoProduto: Produto = { ...prod, id };
    this.produtos.set(id, novoProduto);
    return novoProduto;
  }

  public buscarPorEAN(ean: string): Produto | undefined {
    return Array.from(this.produtos.values()).find((p) => p.ean === ean);
  }

  // --- MÉTODOS FEFO & WMS ---
  public obterLotesOrdenadosFEFO(): LoteFEFO[] {
    return Array.from(this.lotes.values()).sort(
      (a, b) => new Date(a.dataValidade).getTime() - new Date(b.dataValidade).getTime()
    );
  }

  public obterEnderecos(): EnderecoWMS[] {
    return Array.from(this.enderecos.values());
  }

  // --- MÉTODOS CONFERÊNCIA CEGA NFE ---
  public biparItemNFe(ean: string) {
    const item = this.nfeConferencia.itens.find((i) => i.ean === ean);
    if (!item) {
      return { sucesso: false, mensagem: `EAN ${ean} não pertence a esta NFe!` };
    }

    item.quantidadeBipada += 1;
    item.conferido = item.quantidadeBipada === item.quantidadeNota;

    const todosConferidos = this.nfeConferencia.itens.every((i) => i.conferido);
    if (todosConferidos) {
      this.nfeConferencia.status = 'APROVADO';
    }

    return {
      sucesso: true,
      item,
      nfeStatus: this.nfeConferencia.status,
    };
  }

  public obterNFeConferencia(): ConferenciaNFe {
    return this.nfeConferencia;
  }

  // --- MÉTODOS CONVERSÃO DE EMBALAGEM ---
  public calcularConversaoEntrada(qtdCaixas: number, fatorConversao: number): number {
    return qtdCaixas * fatorConversao;
  }
}
