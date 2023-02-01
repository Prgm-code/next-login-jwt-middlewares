import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export default function logoutHandler(req, res) {
  const { myTokenName } = req.cookies;

  if (!myTokenName) {
    return res.status(401).json({ message: "no token" });
  }
  try {
    verify(myTokenName, "secret");
    const user = serialize("myTokenName", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    res.setHeader("Set-Cookie", user);
    res.status(200).json({ message: "Logged out!" });
  } catch (error) {
    return res.status(401).json({ error: "Sorry you are not authenticated" });
  }
}
