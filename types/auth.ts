export type Role = "admin" | "user";

export interface User {
  client: string;
  hashedKey: string;
  role: Role;
}

export interface TokenPayload {
  sub: string;
  role?: Role;
  iat: number;
  exp: number;
  type?: "refresh";
}
