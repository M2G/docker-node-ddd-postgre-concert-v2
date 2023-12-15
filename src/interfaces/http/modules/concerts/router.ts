/* eslint-disable*/
import Status from 'http-status';
import { Router, Request, Response } from 'express';
import IUser from 'core/IUser';

export default ({
  jwt,
  getUseCase,
  getOneUseCase,
  logger,
  response: { Success, Fail },
}: any) => {
  const router = Router();

  router.get('/', async (req: Request, res: Response) => {
    const { query } = req;
    const { filters, pageSize, page } = query;

    try {
      const data = await getUseCase.all(
        filters ? { filters } : pageSize && page ? { pageSize, page } : {},
      );

      res.status(Status.OK).json(Success(data));
    } catch (error) {
      logger.error(error);
      res.status(Status.BAD_REQUEST).json(Fail(error.message));
    }
  });

  router.get('/:id', async (req: Request, res: Response): Promise<Response> => {
    const { params } = req;
    const { id } = params;

    if (!id)
      return res
        .status(Status.UNPROCESSABLE_ENTITY)
        .json(Fail('Invalid id parameters in request.'));

    try {
      const data = await getOneUseCase.getOne({ id });

      console.log('data data data data', data);

      logger.debug(data);
      return res.status(Status.OK).json(Success(data));
    } catch (error: any) {
      logger.error(error);
      return res.status(Status.BAD_REQUEST).json(Fail(error.message));
    }
  });

  return router;
};
