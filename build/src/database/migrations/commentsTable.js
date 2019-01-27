'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createCommentsQuery = {
  query: 'CREATE TABLE IF NOT EXISTS\n      comments(\n        id SERIAL PRIMARY KEY,\n        user_id INT NOT NULL,\n        question_id INT NOT NULL,\n        topic VARCHAR(128) NOT NULL,\n        comment VARCHAR(128) NOT NULL,\n        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (question_id) REFERENCES questions (id) ON DELETE CASCADE,\n        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE\n      )'
};

var dropCommentsQuery = {
  query: 'DROP TABLE IF EXISTS comments'
};

exports.default = {
  createCommentsQuery: createCommentsQuery,
  dropCommentsQuery: dropCommentsQuery
};