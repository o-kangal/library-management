const db = require("../config/db");

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await db("books").select("*");
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

// Get book details
exports.getBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await db("books").where({ id }).first();
    if (!book) return res.status(404).json({ error: "Book not found" });

    const avgRating = await db("borrows")
      .where({ book_id: id })
      .avg("rating as average")
      .first();

    res
      .status(200)
      .json({ ...book, averageRating: avgRating.average || "No ratings yet" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book details" });
  }
};
