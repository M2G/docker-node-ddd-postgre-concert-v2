import Status from 'http-status';

export default () => {
  const route = {
    method: 'GET',
    url: '/',
    handler: (request, reply) => {
      reply.code(Status.OK).send({ hello: 'API working' });
    },
    schema: {},
  }

  return route;
};
