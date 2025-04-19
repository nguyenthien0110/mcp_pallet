import { RowDataPacket } from "mysql2";

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

export interface UserRow extends RowDataPacket {
  id: number;
  client: string;
  key: string;
  created_at: string;
}
