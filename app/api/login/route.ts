import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { UserRow } from "@/types/auth";

export async function POST(req: Request) {
  const { client, key } = await req.json();

  if (!client || !key) {
    return NextResponse.json(
      { success: false, message: "Missing fields" },
      { status: 400 }
    );
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  });

  const [rows] = await connection.execute<UserRow[]>(
    "SELECT * FROM users WHERE client = ?",
    [client]
  );

  if (rows.length === 0) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const user = rows[0];
  const isMatch = await bcrypt.compare(key, user.key);

  if (!isMatch) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    user: { id: user.id, client: user.client },
  });
}
