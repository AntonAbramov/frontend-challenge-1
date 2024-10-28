export interface UserInterface {
  id: string;
  name: string;
}

export interface LoginBody {
  name: string;
}

export interface LoginResponse {
  accessToken: string;
  user: UserInterface;
}
