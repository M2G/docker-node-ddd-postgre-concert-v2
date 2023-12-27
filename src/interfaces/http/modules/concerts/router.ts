/* eslint-disable*/
import Status from 'http-status';

import IUser from 'core/users'
import { FastifyRequest, FastifyReply, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from 'fastify';
import { RouteGenericInterface } from "fastify/types/route";

interface IUserRequest extends RouteGenericInterface {
  Params: { username: string };
  Reply: IUser; // put the response payload interface here
}

export default ({
  getUseCase,
  getOneUseCase,
  logger,
  response: { Success, Fail },
  auth,
  verify,
}: any) => {

  async function handlerGetConcerts(request: FastifyRequest<IUserRequest>,
                             reply: FastifyReply<
                               RawServerDefault,
                               RawRequestDefaultExpression,
                               RawReplyDefaultExpression,
                               IUserRequest // put the request interface here
                             >) {
    const { query } = request;
    const { filters, pageSize, page } = query;

    try {
      const data = await getUseCase.all(
        filters ? { filters } : pageSize && page ? { pageSize, page } : {},
      );

      reply.code(Status.OK).send(Success(data));
    } catch (error) {
      logger.error(error);
      reply.code(Status.BAD_REQUEST).send(Fail(error.message));
    }
  }

  async function handlerGetConcert(request: FastifyRequest<IUserRequest>,
                            reply: FastifyReply<
                              RawServerDefault,
                              RawRequestDefaultExpression,
                              RawReplyDefaultExpression,
                              IUserRequest // put the request interface here
                            >) {
    const { params } = request;
    const { id } = params;

    if (!id)
      return reply
        .status(Status.UNPROCESSABLE_ENTITY)
        .json(Fail('Invalid id parameters in request.'));

    try {
      const data = await getOneUseCase.getOne({ id });

      console.log('data data data data', data);

      logger.debug(data);
      return reply.code(Status.OK).send(Success(data));
    } catch (error: any) {
      logger.error(error);
      return reply.code(Status.BAD_REQUEST).send(Fail(error.message));
    }
  }

  const routerConcerts = {
    //beforeHandler: [verify, auth.authenticate],
    handler: handlerGetConcerts,
    method: 'GET',
    schema: {},
    url: '/concerts',
    // preValidation: verify,
    // preHandler: auth.authenticate,
  };

  const routerConcertById = {
    beforeHandler: [verify, auth.authenticate],
    handler: handlerGetConcert,
    method: 'GET',
    schema: {},
    url: '/concert/:id',
    // preValidation: verify,
    // preHandler: auth.authenticate,
  };

  return [
    routerConcerts,
    routerConcertById,
  ]
};
