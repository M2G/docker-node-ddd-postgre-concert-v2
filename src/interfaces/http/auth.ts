import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import Status from 'http-status';
import { FastifyReply, FastifyRequest } from 'fastify';
/**
 * middleware to check the if auth vaid
 */

export default ({ repository: { usersRepository }, response: { Fail }, jwt }: any) => {
  // @ts-ignore
  const bearerStrategy = new BearerStrategy(
    'bearer',
    (token: any, done: (arg0: any, arg1: { email: string; password: string }| null) => any) => {
      const { id }: any | number = jwt.decode()(token);

      console.log('email email email', id);

      usersRepository
        .findOne({ id })
        .then((user: { email: string; password: string }) => {
          if (!user) return done(Status[Status.NOT_FOUND], null);
          done(null, { email: user.email, password: user.password });
        })
        .catch((error: null) => done(error, null));
    },
  );

  passport.use(bearerStrategy);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user: any, done) => done(null, user));

  return {
    initialize: () => passport.initialize(),
    authenticate: (request: FastifyRequest, reply: FastifyReply, next) => {
      return passport.authenticate('bearer', { session: false }, (err, _) => {
        console.log('passport.authenticate passport.authenticate', err);

        if (err === Status[Status.NOT_FOUND]) {
          return reply.code(Status.NOT_FOUND).send(Fail(Status[Status.NOT_FOUND]));
        }

        if (err) {
          return reply.code(Status.UNAUTHORIZED).send(Fail(Status[Status.UNAUTHORIZED]));
        }

        return next();
      })(request, reply, next);
    },
  };
};
