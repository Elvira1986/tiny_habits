var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET all habit list
router.get("/", async (req, res) => {
  try {
    let result = await db("SELECT * FROM habits");
    let habits = result.data; // result.data is an array of habits objs
    res.send(habits);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET one habit by id
router.get("/:id", async function (req, res, next) {
  let habitId = req.params.id;

  try {
    let result = await db(`SELECT * FROM habits WHERE id = ${habitId}`);
    // Was the student found?
    if (result.data.length === 1) {
      // Yes
      res.send(result.data[0]); // return first person obj from array of results
    } else {
      // No
      res.status(404).send({ error: "Habit not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// INSERT a new habit into the DB
router.post("/", async function (req, res, next) {
  let { title, description, completed, days_in, total_days } = req.body; // extract names from request body

  try {
    let sql = `
      INSERT INTO habits (title, description, completed, days_in, total_days)
      VALUES ('${title}', "${description}", ${completed}, ${days_in}, ${total_days})
    `;
    // Do the INSERT and ignore the result
    await db(sql);
    // Return updated array of habit
    let result = await db("SELECT * FROM habits");
    res.status(201).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// UPDATE a habit from the DB
router.put("/:id", async function (req, res) {
  // get habit by id
  let habitId = req.params.id;
  let { title, description, completed, days_in, total_days } = req.body;
  try {
    let result = await db(`SELECT * FROM habits WHERE id = ${habitId}`);
    if (result.data.length === 1) {
      await db(
        `UPDATE habits SET title="${title}", description ="${description}", completed = ${completed}, days_in=${days_in}, total_days=${total_days} WHERE id = ${habitId}`
      );
      // Return updated array of habit
      result = await db("SELECT * FROM habits");
      res.send(result.data);
    } else {
      // habit not found!
      res.status(404).send({ error: "Item not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// UPDATE a habit from the DB
router.patch("/:id", async function (req, res) {
  // get habit by id and assign it
  let habitId = req.params.id;

  try {
    // SELECT evrything from habit table with specific ID;
    let result = await db(`SELECT * FROM habits WHERE id = ${habitId}`);
    // If ID is not exist, send error message
    if (result.data.length === 0) {
      res.status(404).send({ error: "Item not found" });
    }
    // Create const with data from specific ID habits
    const habit = result.data[0];
    // Check if habits days_in is equal to total_days
    if (habit.days_in + 1 === habit.total_days) {
      // UPDATE completed to true & day_in +1
      await db(
        `UPDATE habits SET completed = true,
         days_in=${habit.days_in + 1}
          WHERE id = ${habitId};`
      );
      // Check if habits days_in less than total_days
    } else if (habit.days_in < habit.total_days) {
      // If true, UPDATE only days_in to +1
      await db(
        `UPDATE habits SET days_in=${habit.days_in + 1} WHERE id = ${habitId};`
      );
    }
    const updatedResult = await db(
      `SELECT * FROM habits WHERE id = ${habitId};`
    );

    res.send(updatedResult.data[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE a habit from the DB
router.delete("/:id", async function (req, res, next) {
  let habitId = req.params.id;

  try {
    let result = await db(`SELECT * FROM habits WHERE id = ${habitId}`);
    // Was the habit found?
    if (result.data.length === 1) {
      // Yes
      // Do DELETE and ignore the result
      await db(`DELETE FROM habits WHERE id = ${habitId}`);
      // Return updated array of habits
      result = await db("SELECT * FROM habits");
      res.send(result.data);
    } else {
      // No
      res.status(404).send({ error: "Habit not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
