export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  password: string;
  token: string;
}

export interface Token {
  accessToken: string;
}
