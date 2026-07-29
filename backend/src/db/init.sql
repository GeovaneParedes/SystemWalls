-- Schema do Banco de Dados SystemWalls (PostgreSQL 16)

CREATE TABLE IF NOT EXISTS produtos (
    id VARCHAR(50) PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    ean VARCHAR(20) UNIQUE NOT NULL,
    nome VARCHAR(150) NOT NULL,
    marca VARCHAR(100),
    categoria VARCHAR(50) NOT NULL,
    preco_custo NUMERIC(10, 2) NOT NULL,
    preco_venda NUMERIC(10, 2) NOT NULL,
    fator_conversao INT DEFAULT 1,
    unidade_compra VARCHAR(20) DEFAULT 'CX 12',
    unidade_venda VARCHAR(20) DEFAULT 'UN',
    ncm VARCHAR(20),
    cest VARCHAR(20),
    fornecedor VARCHAR(150),
    estoque_atual INT DEFAULT 0,
    estoque_minimo INT DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enderecos_wms (
    id VARCHAR(50) PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    corredor VARCHAR(50) NOT NULL,
    prateleira VARCHAR(50) NOT NULL,
    nivel VARCHAR(50) NOT NULL,
    capacidade_paletes INT NOT NULL,
    ocupado_paletes INT DEFAULT 0,
    tipo VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS lotes_fefo (
    id VARCHAR(50) PRIMARY KEY,
    produto_id VARCHAR(50) REFERENCES produtos(id) ON DELETE CASCADE,
    produto_nome VARCHAR(150) NOT NULL,
    ean VARCHAR(20) NOT NULL,
    lote VARCHAR(50) NOT NULL,
    data_validade DATE NOT NULL,
    dias_para_vencimento INT NOT NULL,
    quantidade INT NOT NULL,
    endereco_codigo VARCHAR(50) REFERENCES enderecos_wms(codigo),
    status VARCHAR(30) NOT NULL
);

-- Inserção de Dados Iniciais de Teste
INSERT INTO produtos (id, sku, ean, nome, marca, categoria, preco_custo, preco_venda, fator_conversao, unidade_compra, unidade_venda, ncm, cest, fornecedor, estoque_atual, estoque_minimo)
VALUES 
('PROD-001', 'SKU-LEITE-01', '7891000123456', 'Leite Integral 1L Parmalat', 'Parmalat', 'Laticínios', 3.80, 5.49, 12, 'CX 12', 'UN', '0401.20.10', '17.001.00', 'Lactalis Brasil Ltda', 480, 100),
('PROD-002', 'SKU-ARROZ-05', '7892000654321', 'Arroz Tipo 1 Tio João 5kg', 'Tio João', 'Mercearia', 22.50, 29.90, 6, 'FD 6', 'UN', '1006.30.21', '17.015.00', 'Josapar Joaquim Oliveira S.A.', 180, 50)
ON CONFLICT (id) DO NOTHING;

INSERT INTO enderecos_wms (id, codigo, corredor, prateleira, nivel, capacidade_paletes, ocupado_paletes, tipo)
VALUES
('END-01', 'COR-01-PR-01-N1', 'Corredor 01', 'Prateleira 01', 'Nível 1 (Picking)', 2, 2, 'PICKING'),
('END-02', 'COR-01-PR-01-N2', 'Corredor 01', 'Prateleira 01', 'Nível 2 (Aéreo)', 4, 3, 'ARMAZENAGEM')
ON CONFLICT (id) DO NOTHING;

INSERT INTO lotes_fefo (id, produto_id, produto_nome, ean, lote, data_validade, dias_para_vencimento, quantidade, endereco_codigo, status)
VALUES
('LOTE-101', 'PROD-001', 'Leite Integral 1L Parmalat', '7891000123456', 'L-2026-081', '2026-08-05', 8, 120, 'COR-01-PR-01-N1', 'CRITICO'),
('LOTE-102', 'PROD-001', 'Leite Integral 1L Parmalat', '7891000123456', 'L-2026-095', '2026-09-20', 54, 360, 'COR-01-PR-01-N2', 'NORMAL')
ON CONFLICT (id) DO NOTHING;
