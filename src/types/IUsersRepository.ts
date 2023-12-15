import type IUser from 'core/users';

interface IUsersRepository {
  authenticate: (email: { email: string }) => IUser;
  findOne: (id: { id: number }) => IUser;
  forgotPassword: (users: IUser) => IUser;
  getAll: (arg: {
    filters: string;
    pageSize: number;
    page: number;
    attributes: any;
  }) => IUser;
  update: (users: IUser) => IUser;
  register: (users: IUser) => IUser;
  remove: (id: IUser) => IUser;
  resetPassword: (email: { email: string }) => boolean;
}

export default IUsersRepository;
