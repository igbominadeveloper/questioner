const usersTable = require('./migrations/usersTable.js');
const commentsTable = require('./migrations/commentsTable.js');
const questionsTable = require('./migrations/questionsTable.js');
const meetupsTable = require('./migrations/meetupsTable.js');
const rsvpsTable = require('./migrations/rsvpsTable.js');

const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const up = () => {
	usersTable.createUsersTable();
	meetupsTable.createMeetupsTable();
	questionsTable.createQuestionsTable();
	commentsTable.createCommentsTable();
	rsvpsTable.createRsvpsTable();
}

const down = () => {
	rsvpsTable.dropRsvpsTable();
	commentsTable.dropCommentsTable();
	questionsTable.dropQuestionsTable();
	meetupsTable.dropMeetupsTable();
	usersTable.dropUsersTable();
}

module.exports = {
	up,
	down
}

require('make-runnable');