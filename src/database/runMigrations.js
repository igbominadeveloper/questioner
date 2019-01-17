import usersTable from './migrations/usersTable.js';
import commentsTable from './migrations/commentsTable.js';
import questionsTable from './migrations/questionsTable.js';
import meetupsTable from './migrations/meetupsTable.js';
import rsvpsTable from './migrations/rsvpsTable.js';
import votesTable from './migrations/votesTable.js';
import QueryBuilder from './queryBuilder';

const up = async () => {
  try {
    await QueryBuilder.run(usersTable.createUsersQuery.query);
    await QueryBuilder.run(meetupsTable.createMeetupsQuery.query);
    await QueryBuilder.run(rsvpsTable.createRsvpsQuery.query);
    await QueryBuilder.run(questionsTable.createQuestionsQuery.query);
    await QueryBuilder.run(commentsTable.createCommentsQuery.query);
    await QueryBuilder.run(votesTable.createVotesQuery.query);
  } catch (error) {
    console.log(error);
  }
};

const down = async () => {
  try {
    await QueryBuilder.run(votesTable.dropVotesQuery.query);
    await QueryBuilder.run(commentsTable.dropCommentsQuery.query);
    await QueryBuilder.run(questionsTable.dropQuestionsQuery.query);
    await QueryBuilder.run(rsvpsTable.dropRsvpsQuery.query);
    await QueryBuilder.run(meetupsTable.dropMeetupsQuery.query);
    await QueryBuilder.run(usersTable.dropUsersQuery.query);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  up,
  down,
};

require('make-runnable');
