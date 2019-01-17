const createRsvpsQuery = {
  query: `CREATE TABLE IF NOT EXISTS
      rsvps(
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        meetup_id INT NOT NULL,
        status VARCHAR(128) NOT NULL,
        topic VARCHAR(128) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (meetup_id) REFERENCES meetups (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`,
};

const dropRsvpsQuery = {
  query: 'DROP TABLE IF EXISTS rsvps',
};

export default {
  createRsvpsQuery,
  dropRsvpsQuery,
};
