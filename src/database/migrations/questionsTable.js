const createQuestionsQuery = {
  query:
    `CREATE TABLE IF NOT EXISTS
      questions(
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        meetup_id INT NOT NULL,
        title VARCHAR(128) NOT NULL,
        body VARCHAR(128) NOT NULL,
        upvotes INT DEFAULT 0,
        downvotes INT DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (meetup_id) REFERENCES meetups (id) ON DELETE CASCADE
      )`
}

const dropQuestionsQuery = {
  query: `DROP TABLE IF EXISTS questions`
}

export default {
  createQuestionsQuery,
  dropQuestionsQuery
}