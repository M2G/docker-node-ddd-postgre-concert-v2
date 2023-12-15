import Concerts from './concerts';
import Users from './users';

export default ({ database }: any) => {
  const { models } = database;
  const { concerts, artists, users } = models;

  return {
    concertsRepository: Concerts({
      model: concerts,
      model2: artists,
    }),
    usersRepository: Users({
      model: users,
    }),
  };
};
