import usersTable from './migrations/usersTable';
import commentsTable from './migrations/commentsTable';
import questionsTable from './migrations/questionsTable';
import meetupsTable from './migrations/meetupsTable';
import rsvpsTable from './migrations/rsvpsTable';
import votesTable from './migrations/votesTable';
import seeders from './seeder';
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

const seed = async () => {
  try {
    await QueryBuilder.run(seeders.users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  up,
  down,
  seed,
};

require('make-runnable');
