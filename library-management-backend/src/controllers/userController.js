const db = require("../config/db");

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await db("users").select("*");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get user details
exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db("users").where({ id }).first();
    if (!user) return res.status(404).json({ error: "User not found" });

    const borrowedBooks = await db("borrows")
      .where({ user_id: id })
      .join("books", "borrows.book_id", "=", "books.id")
      .select(
        "books.title",
        "borrows.borrow_date",
        "borrows.return_date",
        "borrows.rating"
      );

    res.status(200).json({ user, borrowedBooks });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user details" });
  }
};

exports.borrowBook = async (req, res) => {
  const { id, bookId } = req.params;

  try {
    const bookBorrowed = await db("borrows")
      .where({ book_id: bookId, return_date: null })
      .first();

    if (bookBorrowed) {
      return res.status(400).json({ error: "Book is already borrowed" });
    }

    await db("borrows").insert({
      user_id: id,
      book_id: bookId,
      borrow_date: new Date(),
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to borrow book" });
  }
};

exports.returnBook = async (req, res) => {
  const { id, bookId } = req.params;
  const { score } = req.body;

  try {
    const borrowRecord = await db("borrows")
      .where({ user_id: id, book_id: bookId, return_date: null })
      .first();

    if (!borrowRecord) {
      return res.status(400).json({
        error: "No active borrow record found for this user and book",
      });
    }

    await db("borrows")
      .where({ id: borrowRecord.id })
      .update({
        return_date: new Date(),
        rating: score || null,
      });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to return book" });
  }
};
