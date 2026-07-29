# 🛒 SystemWalls — WMS & ERP de Gestão para Supermercados Enterprise

> **Plataforma Corporativa de Gestão de Supermercados:** Solução completa para controle operacional de supermercados, estoque de alta precisão (FEFO/FIFO), conferência cega de NFe, inteligência tributária e vendas de altíssima concorrência.

---

## ⚡ Visão Geral do Sistema

O **SystemWalls** é uma plataforma corporativa completa desenvolvida para resolver as dores operacionais reais de supermercados e atacarejos de médio e grande porte. 

O sistema integra em tempo real a área administrativa, o recebimento de mercadorias no depósito, o endereçamento físico de paletes, a persistência com **PostgreSQL 16** e a comunicação WebSocket com coletores de dados dos operadores de estoque.

---

## 🚀 Os 4 Pilares da Arquitetura

### 1. 📋 Módulo Administrativo & Cadastro de Produtos
- **Cadastro Inteligente:** Gestão de SKU, EAN-13/GTIN, categorias, marcas e departamentos (Hortifrúti, Laticínios, Mercearia, Limpeza).
- **Fator de Conversão de Embalagens:** Conversão automática entre embalagens de compra do fornecedor (ex: Caixa com 12/24 unidades) e a venda fracionada/unidade no balcão.
- **Precificação Avançada:** Preço de custo, margem de lucro, preços promocionais e atacarejo por quantidade.
- **Inteligência Tributária:** Cadastro de NCM, CEST e impostos estaduais/federais (ICMS, PIS, COFINS).
- **Gestão de Fornecedores:** Vinculação automática com fabricantes e distribuidores.

### 2. 🏬 Módulo de Depósito & Estoque (WMS)
- **Importação de NFe (XML):** Entrada de mercadorias automatizada com validação de Nota Fiscal.
- **Conferência Cega:** Leitura de código de barras na entrada sem revelar a nota ao conferente, prevenindo fraudes e divergências.
- **Endereçamento Físico Dinâmico:** Mapeamento de corredores, prateleiras, racks e paletes.
- **Estratégia FEFO (*First Expire, First Out*):** Priorização automática de saída para gôndolas dos lotes com data de validade mais próxima.
- **Inventário & Auditoria:** Contagem parcial e total para prevenção de perdas, quebras e avarias.

### 3. 📱 Coletores & Integração de Alta Performance
- **Coletores de Dados (Android PWA):** Interface leve e ultrarrápida otimizada para handhelds (Zebra, Honeywell) com scanner de código de barras.
- **Baixa em Tempo Real & Resiliência:** Arquitetura desacoplada para suportar alta demanda de vendas no PDV sem travar o estoque.
- **Impressão de Etiquetas & Balança:** Emissão de etiquetas de prateleira e suporte a balanças (Toledo / Filizola).

---

## 🛠️ Stack Tecnológica de Alta Escala

- **Frontend & PWA:** React 18, Vite, Tailwind CSS, Lucide Icons.
- **Backend & APIs:** Fastify (TypeScript) com suporte a WebSockets e Pool de Conexões `pg`.
- **Banco de Dados:** PostgreSQL 16 Alpine (Relacional ACID com Schema em `init.sql`).
- **Cache & Concorrência:** Redis (Distributed Locking / Mutex).
- **DevOps & Cloud:** Docker, Docker Compose (Healthchecks), GitHub Actions CI/CD.

---

## 📅 Roadmap de Desenvolvimento

- [x] **Fase 0:** Definição da Arquitetura & Lançamento do Repositório (`SystemWalls`)
- [x] **Fase 1:** Desenvolvimento do Frontend (Dashboard Admin, WMS FEFO & PWA Coletor)
- [x] **Fase 2:** Backend Fastify + WebSockets + Docker Compose + GitHub Actions CI/CD
- [x] **Fase 3.1:** Integração do PostgreSQL 16 (Schema `init.sql`, Pool `pg` e Docker Volume)
- [ ] **Fase 3.2:** Upload & Parser de Arquivos XML de NFe
- [ ] **Fase 3.3:** Concorrência Distribuída de Estoque com Redis Mutex

---

<p center>
  <i>Desenvolvido com Engenharia de Software Sênior por <b>Geovane Paredes</b></i> 🚀
</p>
