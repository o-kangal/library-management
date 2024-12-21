exports.seed = function (knex) {
  return knex("borrows")
    .del()
    .then(() => knex("books").del())
    .then(() => knex("users").del())
    .then(() => {
      return knex("users").insert([
        { id: 2, name: "Enes Faruk Meniz" },
        { id: 1, name: "Eray Aslan" },
        { id: 4, name: "Kadir Mutlu" },
        { id: 3, name: "Sefa Eren Şahin" },
      ]);
    })
    .then(() => {
      return knex("books").insert([
        { id: 4, title: "1984", author: "George Orwell", year: 1949 },
        {
          id: 5,
          title: "Brave New World",
          author: "Aldous Huxley",
          year: 1932,
        },
        { id: 3, title: "Dune", author: "Frank Herbert", year: 1965 },
        { id: 2, title: "I, Robot", author: "Isaac Asimov", year: 1950 },
        {
          id: 1,
          title: "The Hitchhiker's Guide to the Galaxy",
          author: "Douglas Adams",
          year: 1979,
        },
      ]);
    })
    .then(() => {
      return knex("borrows").insert([
        {
          user_id: 2,
          book_id: 2,
          borrow_date: "2023-12-01",
          return_date: "2023-12-15",
          rating: 5,
        },
        {
          user_id: 2,
          book_id: 1,
          borrow_date: "2023-12-16",
          return_date: "2023-12-30",
          rating: 10,
        },
        {
          user_id: 2,
          book_id: 5,
          borrow_date: "2023-12-20",
          return_date: null,
          rating: null,
        },
      ]);
    });
};
