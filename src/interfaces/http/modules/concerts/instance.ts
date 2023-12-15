import { get, getOne } from 'app/concerts';
import container from '../../../../container';

export default () => {
  const { cradle } = container;
  const {
    redis,
    logger,
    repository: { concertsRepository },
  } = cradle;

  const getUseCase = get({ concertsRepository, logger, redis });
  const getOneUseCase = getOne({ concertsRepository, logger });

  return {
    getOneUseCase,
    getUseCase,
  };
};
