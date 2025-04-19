import bcrypt from "bcryptjs";
import { User, TokenPayload } from "@/types/auth";

const users: User[] = [
  {
    client: "admin001",
    hashedKey: bcrypt.hashSync("adminpass", 10),
    role: "admin",
  },
  {
    client: "user001",
    hashedKey: bcrypt.hashSync("userpass", 10),
    role: "user",
  },
];

export const validateLogin = async (client: string, key: string) => {
  const user = users.find((u) => u.client === client);
  if (!user) return null;

  const isValid = await bcrypt.compare(key, user.hashedKey);
  if (!isValid) return null;

  const now = Math.floor(Date.now() / 1000);
  const access_token: TokenPayload = {
    sub: user.client,
    role: user.role,
    iat: now,
    exp: now + 60 * 60, // 1h
  };

  const refresh_token: TokenPayload = {
    sub: user.client,
    type: "refresh",
    iat: now,
    exp: now + 60 * 60 * 24 * 7, // 7d
  };

  return { access_token, refresh_token };
};
