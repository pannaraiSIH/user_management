const { Router } = require("express");
const Users = require("../models/User.js");

const router = Router();

router.get("/users", async (req, res) => {
  const { limit, pageIndex } = req.query;

  try {
    const users = await Users.find()
      .limit(limit)
      .skip(pageIndex * limit);
    const total = await Users.countDocuments();

    const formattedUsers = users.map((item) => {
      const newDate = new Date(item.birthDate);
      const formattedDate = newDate.toLocaleString("en-UK", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const plainObject = item.toObject();

      return { ...plainObject, birthDate: formattedDate };
    });

    res
      .status(200)
      .json({ message: "success", error: "", users: formattedUsers, total });
  } catch (error) {
    res.status(500).json({ message: "", error: "something went wrong" });
  }
});

router.get("/users/:nameSurname", async (req, res) => {
  const { nameSurname } = req.params;
  try {
    const users = await Users.find({
      $or: [{ firstName: nameSurname }, { lastName: nameSurname }],
    });
    const total = users.length;

    res.status(200).json({ message: "success", error: "", users, total });
  } catch (error) {
    res.status(500).json({ message: "", error: "something went wrong" });
  }
});

router.post("/users", async (req, res) => {
  const body = req.body;
  try {
    const user = await Users.create(body);

    res.status(201).json({ message: "success", error: "", user });
  } catch (error) {
    res.status(500).json({ message: "", error: "something went wrong" });
  }
});

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const users = await Users.updateOne({ _id: id }, body);
    res.status(200).json({ message: "success", error: "", users });
  } catch (error) {
    res.status(500).json({ message: "", error: "something went wrong" });
  }
});

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Users.deleteOne({ _id: id });
    res.status(200).json({ message: "success", error: "" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "", error: "something went wrong" });
  }
});

module.exports = router;
