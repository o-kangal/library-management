module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: "postgres",
      password: "12345",
      database: "library_management",
    },
    migrations: {
      directory: "./src/migrations",
    },
    seeds: {
      directory: "./src/seeds",
    },
  },
};
