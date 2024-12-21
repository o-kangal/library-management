const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post('/:id/borrow/:bookId', userController.borrowBook);

module.exports = router;
