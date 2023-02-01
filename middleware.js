import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = "secret";

export async function middleware(request) {
  const jwt = request.cookies.get("myTokenName");

  // console.log(request.nextUrl.pathname);
  if (request.nextUrl.pathname.includes("/dashboard")) {
    if (jwt === undefined) {
      console.log("token undefined");
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      const { payload } = await jwtVerify(
        jwt.value,
        new TextEncoder().encode(secret)
      );
      console.log(payload);
      return NextResponse.next();
    } catch (error) {
      console.log(error, "token invalido");

      console.log(request.nextUrl);
      return NextResponse.redirect(new URL("/login", request.url));
    }
    console.log("la misma wea");
  }

  return NextResponse.next();
}
