'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createRsvpsQuery = {
  query: 'CREATE TABLE IF NOT EXISTS\n      rsvps(\n        id SERIAL PRIMARY KEY,\n        user_id INT NOT NULL,\n        meetup_id INT NOT NULL,\n        status VARCHAR(128) NOT NULL,\n        topic VARCHAR(128) NOT NULL,\n        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (meetup_id) REFERENCES meetups (id) ON DELETE CASCADE,\n        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE\n      )'
};

var dropRsvpsQuery = {
  query: 'DROP TABLE IF EXISTS rsvps'
};

exports.default = {
  createRsvpsQuery: createRsvpsQuery,
  dropRsvpsQuery: dropRsvpsQuery
};