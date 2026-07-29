import Fastify from 'fastify';
import cors from '@fastify/cors';
import websocketPlugin from '@fastify/websocket';
import { WMSCoreService } from './services/WMSCoreService.js';
import type { WebSocket } from 'ws';

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});

const wmsService = new WMSCoreService();

async function bootstrap() {
  await fastify.register(cors, {
    origin: '*',
  });

  await fastify.register(websocketPlugin);

  // Healthcheck
  fastify.get('/health', async () => {
    return { status: 'OK', sistema: 'SystemWalls ERP/WMS (PostgreSQL 16)', timestamp: new Date().toISOString() };
  });

  // REST API: Produtos
  fastify.get('/api/produtos', async () => {
    return await wmsService.obterProdutos();
  });

  fastify.post('/api/produtos', async (req, reply) => {
    const body = req.body as any;
    const novoProduto = await wmsService.cadastrarProduto(body);
    return reply.status(201).send(novoProduto);
  });

  // REST API: FEFO & WMS
  fastify.get('/api/wms/fefo', async () => {
    return await wmsService.obterLotesOrdenadosFEFO();
  });

  fastify.get('/api/wms/enderecos', async () => {
    return await wmsService.obterEnderecos();
  });

  // REST API: Conferência NFe
  fastify.get('/api/nfe/conferencia', async () => {
    return wmsService.obterNFeConferencia();
  });

  fastify.post('/api/nfe/bipar', async (req, reply) => {
    const { ean } = req.body as { ean: string };
    const resultado = wmsService.biparItemNFe(ean);
    return reply.send(resultado);
  });

  // WebSocket Endpoint para Coletores Handheld (Zebra / Honeywell / Smartphone PWA)
  fastify.register(async (fastifyApp) => {
    fastifyApp.get('/ws/coletor', { websocket: true }, (connection) => {
      const socket: WebSocket = (connection as any).socket || connection;
      console.log('📱 Coletor Handheld PWA conectado ao hub de telemetria WMS!');

      socket.on('message', async (messageRaw: Buffer | string) => {
        try {
          const payload = JSON.parse(messageRaw.toString());
          if (payload.action === 'SCAN_EAN') {
            const prod = await wmsService.buscarPorEAN(payload.ean);
            socket.send(
              JSON.stringify({
                type: 'RESULTADO_SCAN',
                sucesso: !!prod,
                produto: prod || null,
              })
            );
          }
        } catch (err) {
          fastify.log.error({ err }, 'Erro no JSON do coletor PWA');
        }
      });
    });
  });

  const PORT = Number(process.env.PORT) || 8030;
  const HOST = process.env.HOST || '0.0.0.0';

  try {
    await fastify.listen({ port: PORT, host: HOST });
    console.log(`🚀 Servidor SystemWalls WMS Fastify rodando em http://${HOST}:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

bootstrap();
