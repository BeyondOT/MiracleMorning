export interface UserInfos {
  id: string;
  pseudo: string;
  roles: string;
}

declare global {
  namespace Express {
    interface Request {
      user: UserInfos;
    }
  }
}

