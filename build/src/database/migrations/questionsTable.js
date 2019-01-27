'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createQuestionsQuery = {
  query: 'CREATE TABLE IF NOT EXISTS\n      questions(\n        id SERIAL PRIMARY KEY,\n        user_id INT NOT NULL,\n        meetup_id INT NOT NULL,\n        title VARCHAR(128) NOT NULL,\n        body VARCHAR(128) NOT NULL,\n        upvotes INT DEFAULT 0,\n        downvotes INT DEFAULT 0,\n        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,\n        FOREIGN KEY (meetup_id) REFERENCES meetups (id) ON DELETE CASCADE\n      )'
};

var dropQuestionsQuery = {
  query: 'DROP TABLE IF EXISTS questions'
};

exports.default = {
  createQuestionsQuery: createQuestionsQuery,
  dropQuestionsQuery: dropQuestionsQuery
};