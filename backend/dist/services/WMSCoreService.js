import { pool } from '../db/db.js';
export class WMSCoreService {
    produtosMock = new Map();
    lotesMock = new Map();
    enderecosMock = new Map();
    nfeConferencia;
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
    inicializarDadosMock() {
        const prods = [
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
        prods.forEach((p) => this.produtosMock.set(p.id, p));
        const lotesInit = [
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
        lotesInit.forEach((l) => this.lotesMock.set(l.id, l));
        const endInit = [
            { id: 'END-01', codigo: 'COR-01-PR-01-N1', corredor: 'Corredor 01', prateleira: 'Prateleira 01', nivel: 'Nível 1 (Picking)', capacidadePaletes: 2, ocupadoPaletes: 2, tipo: 'PICKING' },
            { id: 'END-02', codigo: 'COR-01-PR-01-N2', corredor: 'Corredor 01', prateleira: 'Prateleira 01', nivel: 'Nível 2 (Aéreo)', capacidadePaletes: 4, ocupadoPaletes: 3, tipo: 'ARMAZENAGEM' },
        ];
        endInit.forEach((e) => this.enderecosMock.set(e.id, e));
    }
    // --- MÉTODOS PRODUTOS COM SUPORTE POSTGRESQL ---
    async obterProdutos() {
        try {
            const res = await pool.query('SELECT * FROM produtos ORDER BY created_at DESC');
            if (res.rows.length > 0) {
                return res.rows.map((row) => ({
                    id: row.id,
                    sku: row.sku,
                    ean: row.ean,
                    nome: row.nome,
                    marca: row.marca,
                    categoria: row.categoria,
                    precoCusto: Number(row.preco_custo),
                    precoVenda: Number(row.preco_venda),
                    fatorConversao: Number(row.fator_conversao),
                    unidadeCompra: row.unidade_compra,
                    unidadeVenda: row.unidade_venda,
                    ncm: row.ncm,
                    cest: row.cest,
                    fornecedor: row.fornecedor,
                    estoqueAtual: Number(row.estoque_atual),
                    estoqueMinimo: Number(row.estoque_minimo),
                }));
            }
        }
        catch (err) {
            console.warn('⚠️ PostgreSQL offline ou não acessível. Utilizando fallback em memória.');
        }
        return Array.from(this.produtosMock.values());
    }
    async cadastrarProduto(prod) {
        const id = `PROD-${Date.now().toString().slice(-4)}`;
        const novoProduto = { ...prod, id };
        try {
            await pool.query(`INSERT INTO produtos (id, sku, ean, nome, marca, categoria, preco_custo, preco_venda, fator_conversao, unidade_compra, unidade_venda, ncm, cest, fornecedor, estoque_atual, estoque_minimo)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`, [
                novoProduto.id,
                novoProduto.sku,
                novoProduto.ean,
                novoProduto.nome,
                novoProduto.marca,
                novoProduto.categoria,
                novoProduto.precoCusto,
                novoProduto.precoVenda,
                novoProduto.fatorConversao,
                novoProduto.unidadeCompra,
                novoProduto.unidadeVenda,
                novoProduto.ncm,
                novoProduto.cest,
                novoProduto.fornecedor,
                novoProduto.estoqueAtual,
                novoProduto.estoqueMinimo,
            ]);
        }
        catch (err) {
            console.warn('⚠️ Falha ao salvar no PostgreSQL. Gravando em fallback na memória.');
            this.produtosMock.set(id, novoProduto);
        }
        return novoProduto;
    }
    async buscarPorEAN(ean) {
        try {
            const res = await pool.query('SELECT * FROM produtos WHERE ean = $1 LIMIT 1', [ean]);
            if (res.rows.length > 0) {
                const row = res.rows[0];
                return {
                    id: row.id,
                    sku: row.sku,
                    ean: row.ean,
                    nome: row.nome,
                    marca: row.marca,
                    categoria: row.categoria,
                    precoCusto: Number(row.preco_custo),
                    precoVenda: Number(row.preco_venda),
                    fatorConversao: Number(row.fator_conversao),
                    unidadeCompra: row.unidade_compra,
                    unidadeVenda: row.unidade_venda,
                    ncm: row.ncm,
                    cest: row.cest,
                    fornecedor: row.fornecedor,
                    estoqueAtual: Number(row.estoque_atual),
                    estoqueMinimo: Number(row.estoque_minimo),
                };
            }
        }
        catch (err) {
            // Fallback
        }
        return Array.from(this.produtosMock.values()).find((p) => p.ean === ean);
    }
    // --- MÉTODOS FEFO & WMS ---
    async obterLotesOrdenadosFEFO() {
        try {
            const res = await pool.query('SELECT * FROM lotes_fefo ORDER BY data_validade ASC');
            if (res.rows.length > 0) {
                return res.rows.map((row) => ({
                    id: row.id,
                    produtoId: row.produto_id,
                    produtoNome: row.produto_nome,
                    ean: row.ean,
                    lote: row.lote,
                    dataValidade: row.data_validade,
                    diasParaVencimento: row.dias_para_vencimento,
                    quantidade: row.quantidade,
                    enderecoCodigo: row.endereco_codigo,
                    status: row.status,
                }));
            }
        }
        catch (err) {
            // Fallback
        }
        return Array.from(this.lotesMock.values()).sort((a, b) => new Date(a.dataValidade).getTime() - new Date(b.dataValidade).getTime());
    }
    async obterEnderecos() {
        try {
            const res = await pool.query('SELECT * FROM enderecos_wms');
            if (res.rows.length > 0) {
                return res.rows.map((row) => ({
                    id: row.id,
                    codigo: row.codigo,
                    corredor: row.corredor,
                    prateleira: row.prateleira,
                    nivel: row.nivel,
                    capacidadePaletes: row.capacidade_paletes,
                    ocupadoPaletes: row.ocupado_paletes,
                    tipo: row.tipo,
                }));
            }
        }
        catch (err) {
            // Fallback
        }
        return Array.from(this.enderecosMock.values());
    }
    // --- MÉTODOS CONFERÊNCIA CEGA NFE ---
    biparItemNFe(ean) {
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
    obterNFeConferencia() {
        return this.nfeConferencia;
    }
}
