/*eslint-disable*/
import Status from 'http-status';

const time =
  process.env.NODE_ENV === 'development'
    ? process.env.JWT_TOKEN_EXPIRE_TIME
    : '2s';

const TOKEN_EXPIRED_ERROR = 'TokenExpiredError';
const FAIL_AUTH = 'Failed to authenticate token is expired.';

export default ({ response: { Fail }, jwt }: any) => {

  return (request: any, reply: any, next: any) => {
    console.log('VERIFY');
    const extractToken =
      request.headers?.authorization?.startsWith('Bearer ');

    if (extractToken) {
      const token = request.headers?.authorization?.split(' ')?.[1];

      try {
        jwt.verify({ maxAge: time })(token);
      } catch (e) {
        if (e.name === TOKEN_EXPIRED_ERROR) {
          return reply.code(Status.UNAUTHORIZED).send(
            Fail({
              success: false,
              expireTime: true,
              message: FAIL_AUTH,
            }),
          );
        }

        return reply.code(Status.BAD_REQUEST).send(
          Fail({
            success: false,
            message: Status[Status.BAD_REQUEST],
          }),
        );
      }

      return next();
    }

    return reply.code(Status.UNAUTHORIZED).send(
      Fail({
        success: false,
        message: 'No token provided.',
      }),
    );
  }
}
