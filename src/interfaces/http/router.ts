import cors from '@fastify/cors';
import { fastify } from 'interfaces/http/server';
import httpLogger from './middlewares/http_logger';
import errorHandler from './middlewares/error_handler';
// controller
import index from './modules';
import concerts from './modules/concerts';

const ROUTES = {
  CONCERTS: '/concerts',
  INDEX: '/',
};

export default ({ config, logger }) => {
  if (config.env !== 'test') {
    fastify.addHook('preHandler', (_, __, done) => {
      httpLogger(logger);
      done();
    });
  }

  void fastify.register(cors, {
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: ['http://localhost:3002', 'http://localhost:3003'],
  });

  const router: {
    [key: string]: () => {
      handler: (request: any, reply: any) => void;
      method: string;
      schema: {};
      url: string;
    };
  } = {
    [ROUTES.INDEX]: index(),
    [ROUTES.CONCERTS]: concerts().router,
  };

  fastify.setErrorHandler(function (error, request, reply) {
    errorHandler(error, request, reply, logger, config);
  });

  return router;

  /*
  const router = Router();

  if (config.env !== 'test') {
    router.use(httpLogger(logger));
  }
  router
    .use(
      cors({
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        origin: ['http://localhost:3002', 'http://localhost:3003'],
      }),
    )
    .use(bodyParser.json());

  router.use(ROUTES.INDEX, index());
  // router.use(verify);
  router.use(ROUTES.CONCERTS, concerts().router);
  // users?search=EMAIL/FIST_NAME/LAST_NAME
  router.use(() => ({
    ...errorHandler,
    ...[logger, config],
  }));

  return router;*/
};
