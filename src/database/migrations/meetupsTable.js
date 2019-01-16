const createMeetupsQuery = {
  query: `CREATE TABLE IF NOT EXISTS
      meetups(
        id SERIAL PRIMARY KEY,
        topic VARCHAR(128) NOT NULL,
        location VARCHAR(128) NOT NULL,
        date TIMESTAMP,
        images TEXT [],
        tags TEXT [],
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )`
}

const dropMeetupsQuery = {
  query: `DROP TABLE IF EXISTS meetups`
}

export default {
  createMeetupsQuery,
  dropMeetupsQuery
}