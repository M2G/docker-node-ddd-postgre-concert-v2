/* eslint-disable*/
import Status from 'http-status';
import IUser from 'core/IUser';
import { FastifyRequest, FastifyReply, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from 'fastify';
import { RouteGenericInterface } from "fastify/types/route";

interface IUser {
  firstname: string;
  lastname: string;
}

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

  async function getConcerts(request: FastifyRequest<IUserRequest>,
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

  async function getConcert(request: FastifyRequest<IUserRequest>,
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
    beforeHandler: [verify, auth.authenticate],
    handler: getConcerts,
    method: 'GET',
    schema: {},
    url: '/concerts',
    // preValidation: verify,
    // preHandler: auth.authenticate,
  };

  const routerConcertById = {
    beforeHandler: [verify, auth.authenticate],
    handler: getConcert,
    method: 'GET',
    schema: {},
    url: '/concert/:id',
    // preValidation: verify,
    // preHandler: auth.authenticate,
  };

  return {
    ...routerConcerts,
    ...routerConcertById,
  }
};
