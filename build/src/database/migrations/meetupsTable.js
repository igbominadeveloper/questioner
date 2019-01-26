'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createMeetupsQuery = {
  query: 'CREATE TABLE IF NOT EXISTS\n      meetups(\n        id SERIAL PRIMARY KEY,\n        topic VARCHAR(128) NOT NULL,\n        location VARCHAR(128) NOT NULL,\n        date TIMESTAMP,\n        images TEXT [],\n        tags TEXT [],\n        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n      )'
};

var dropMeetupsQuery = {
  query: 'DROP TABLE IF EXISTS meetups'
};

exports.default = {
  createMeetupsQuery: createMeetupsQuery,
  dropMeetupsQuery: dropMeetupsQuery
};