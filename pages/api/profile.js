import { verify } from "jsonwebtoken";

export default function profileHandler(req, res) {
  const { myTokenName } = req.cookies;
  if (!myTokenName) {
    return res.status(401).json({ error: "no token" });
  }

  console.log(req.cookies);
  const user = verify(myTokenName, "secret", (err, decoded) => {
    if (!err && decoded) {
      console.log(decoded);
      return res.json({
        username: decoded.username,
        email: decoded.email,
      });
    } else {
      return res
        .status(401)
        .json({ message: "Sorry you are not authenticated" });
    }
  });
  console.log(user);
}
