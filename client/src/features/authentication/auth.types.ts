export interface UserLogin {
  email: string;
  password: string;
}

export interface UserLoginErrors{
  email: string;
  password: string;
}

export interface UserRegister {
  pseudo: string;
  email: string;
  password: string;
}

export interface UserRegisterErrors{
  pseudo: string;
  email: string;
  password: string;
}
