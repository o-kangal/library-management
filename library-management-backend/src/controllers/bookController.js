const db = require("../config/db");
const { getBookWithCurrentOwner } = require("../models/bookModel");

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
// Get book details with current owner
exports.getBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await getBookWithCurrentOwner(id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error fetching book details:", error);
    res.status(500).json({ error: "Failed to fetch book details" });
  }
};
