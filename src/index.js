import express from "express";
import db from "./db.js";
import auth from "./auth.middleware.js";
import cors from "cors";

// {
//     valid: 0,
//     lat: -1,
//     lng: -1,
//     sat: -1,
//     hdop: -1,
//     year: -1,
//     month: -1,
//     day: -1,
//     hour: -1,
//     minute: -1,
//     second: -1,
//     centisecond: -1
//   }

const app = express();
app.use(cors());

app.use(express.json());

app.get("/ping", (req, res) => res.send("pong"));

app.get("/", (req, res) => res.send("hi"));

app.get("/crumbs", auth, async (req, res) => {
  try {
    console.log("talking to crumbs");
    const query = `
    SELECT * from crumb WHERE userid = $1 AND latitude != -1 AND longitude != -1
    `;

    const data = await db.query(query, [req.user.id]);

    console.log("data: ", data);
    res.send(data.rows);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});

app.post("/crumbs", auth, (req, res, next) => {
  try {
    const dataArray = req.body;

    const values = [];
    const placeholders = [];

    dataArray.forEach((item, index) => {
      const { lat, lng, sat, hdop, year, month, day, hour, minute, second } =
        item;

      const utcTime = new Date(
        Date.UTC(year, month - 1, day, hour, minute, second)
      );

      values.push(lat, lng, sat, hdop, utcTime, req.user.id);

      const base = index * 6;
      placeholders.push(
        `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${
          base + 5
        }, $${base + 6})`
      );
    });

    const query = `
    INSERT INTO crumb (latitude, longitude, satellitesUsed, hdop, utcTime, userid) 
    VALUES ${placeholders.join(",")}
    `;

    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Insert error:", err);
        return;
      }
      console.log("Inserted rows:", result.rowCount);
    });
    res.send("good");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

app.listen(3000, () => {
  console.log("All 3000 ears");
});
