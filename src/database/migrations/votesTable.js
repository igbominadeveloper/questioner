const createVotesQuery = {
  query:
    `CREATE TABLE IF NOT EXISTS
      votes(
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        question_id INT NOT NULL,
        upvote INT NOT NULL,
        downvote INT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )`,
};

const dropVotesQuery = {
  query: 'DROP TABLE IF EXISTS votes',
};

export default {
  createVotesQuery,
  dropVotesQuery,
};
