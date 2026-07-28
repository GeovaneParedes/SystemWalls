# 🛒 SystemWalls — WMS & ERP de Gestão para Supermercados Enterprise

> **Em Breve:** A solução definitiva para gestão operacional de supermercados, controle de estoque de alta precisão (FEFO/FIFO), conferência cega de NFe, auditoria tributária e vendas de altíssima concorrência.

---

## ⚡ Visão Geral do Sistema

O **SystemWalls** é uma plataforma corporativa completa desenvolvida para resolver as dores operacionais reais de supermercados e atacarejos de médio e grande porte. 

O sistema integra em tempo real a área administrativa, o recebimento de mercadorias no depósito, o endereçamento físico de paletes e os coletores de dados dos operadores de estoque.

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
- **Backend & APIs:** Node.js Fastify (TypeScript) / Java 21 Spring Boot.
- **Banco de Dados:** PostgreSQL 16 (Relacional ACID com suporte JSONB).
- **Cache & Concorrência:** Redis (Distributed Locking / Mutex).
- **Mensageria & EDA:** RabbitMQ (Event-Driven Architecture).
- **DevOps & Cloud:** Docker, Docker Compose, GitHub Actions CI/CD.

---

## 📅 Roadmap de Desenvolvimento

- [x] **Fase 0:** Definição da Arquitetura & Lançamento do Repositório (`SystemWalls`)
- [ ] **Fase 1:** Desenvolvimento do Frontend (Dashboard Admin & PWA Coletor)
- [ ] **Fase 2:** Desenvolvimento do Backend (Serviços REST/WebSocket & Banco de Dados)
- [ ] **Fase 3:** Integração de NFe, FEFO e Testes de Alta Concorrência

---

<p center>
  <i>Desenvolvido com Engenharia de Software Sênior por <b>Geovane Paredes</b></i> 🚀
</p>
