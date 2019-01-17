const createCommentsQuery = {
  query:
    `CREATE TABLE IF NOT EXISTS
      comments(
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        question_id INT NOT NULL,
        comment VARCHAR(128) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`,
};

const dropCommentsQuery = {
  query: 'DROP TABLE IF EXISTS comments',
};

export default {
  createCommentsQuery,
  dropCommentsQuery,
};