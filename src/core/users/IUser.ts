interface IUser {
  created_at?: number;
  deleted_at?: number;
  email?: string;
  first_name?: string;
  id: number;
  last_connected_at: number;
  last_name?: string;
  modified_at?: number;
  password: string;
  reset_password_expires?: number;
  reset_password_token?: string;
  token?: string;
  username?: string;
}

export default IUser;
