'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createVotesQuery = {
  query: 'CREATE TABLE IF NOT EXISTS\n      votes(\n        id SERIAL PRIMARY KEY,\n        user_id INT NOT NULL,\n        question_id INT NOT NULL,\n        upvote INT NOT NULL,\n        downvote INT NOT NULL,\n        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE,\n        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE\n      )'
};

var dropVotesQuery = {
  query: 'DROP TABLE IF EXISTS votes'
};

exports.default = {
  createVotesQuery: createVotesQuery,
  dropVotesQuery: dropVotesQuery
};