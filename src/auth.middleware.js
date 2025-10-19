import db from "./db.js";

export default async function auth(req, res, next) {
  const apiKey = req.headers["api-key"];
  if (!apiKey) {
    console.log("Not acceptable at all.");
    return res.status(401).send("Nope");
  }

  const response = await db.query('SELECT * FROM "user" WHERE "apikey" = $1', [
    apiKey,
  ]);

  const user = response.rows[0];

  if (!user) {
    console.log("Not acceptable.");
    return res.status(401).send("Nope");
  }

  req.user = user;
  next();
}
