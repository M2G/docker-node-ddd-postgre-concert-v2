import container from '../../../../container';
import instance from './instance';
import router from './router';

export default () => {
  const { cradle } = container;

  const {
    auth,
    logger,
    response: { Fail, Success },
    verify,
  } = cradle;
  const app = instance();

  return {
    app,
    router: router({
      auth,
      logger,
      response: { Fail, Success },
      verify,
      ...app,
    }),
  };
};
