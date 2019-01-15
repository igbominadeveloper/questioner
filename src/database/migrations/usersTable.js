const createUsersQuery = {
  query:
    `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        othername VARCHAR(128),
        username VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        phoneNumber VARCHAR(128),
        isAdmin INT NOT NULL DEFAULT 0,
        password VARCHAR(128) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )`
}

const dropUsersQuery = {
  query: `DROP TABLE IF EXISTS users`
}

export default {
  createUsersQuery,
  dropUsersQuery
}