"use server";

import { NextRequest } from "next/server";

export const isAuthenticated = (request: NextRequest) => {
  const cookies = request.cookies;

  const sessionCookie = cookies.get("uspk_gateway_token")?.value;
  console.log("sessionCookie: ", sessionCookie)
  return Boolean(sessionCookie);
};
