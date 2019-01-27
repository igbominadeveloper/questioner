'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createUsersQuery = {
  query: 'CREATE TABLE IF NOT EXISTS\n      users(\n        id SERIAL PRIMARY KEY,\n        firstname VARCHAR(128) NOT NULL,\n        lastname VARCHAR(128) NOT NULL,\n        othername VARCHAR(128),\n        username VARCHAR(128),\n        email VARCHAR(128) UNIQUE NOT NULL,\n        phoneNumber VARCHAR(128),\n        isAdmin INT NOT NULL DEFAULT 0,\n        password VARCHAR(128) NOT NULL,\n        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n      )'
};

var dropUsersQuery = {
  query: 'DROP TABLE IF EXISTS users'
};

exports.default = {
  createUsersQuery: createUsersQuery,
  dropUsersQuery: dropUsersQuery
};