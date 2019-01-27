import usersTable from './migrations/usersTable';
import commentsTable from './migrations/commentsTable';
import questionsTable from './migrations/questionsTable';
import meetupsTable from './migrations/meetupsTable';
import rsvpsTable from './migrations/rsvpsTable';
import votesTable from './migrations/votesTable';
import seeders from './seeder';
import queryFactory from './queryFactory';

const up = async () => {
  try {
    await queryFactory.run(usersTable.createUsersQuery.query);
    await queryFactory.run(meetupsTable.createMeetupsQuery.query);
    await queryFactory.run(rsvpsTable.createRsvpsQuery.query);
    await queryFactory.run(questionsTable.createQuestionsQuery.query);
    await queryFactory.run(commentsTable.createCommentsQuery.query);
    await queryFactory.run(votesTable.createVotesQuery.query);
  } catch (error) {
    console.log(error);
  }
};

const down = async () => {
  try {
    await queryFactory.run(votesTable.dropVotesQuery.query);
    await queryFactory.run(commentsTable.dropCommentsQuery.query);
    await queryFactory.run(questionsTable.dropQuestionsQuery.query);
    await queryFactory.run(rsvpsTable.dropRsvpsQuery.query);
    await queryFactory.run(meetupsTable.dropMeetupsQuery.query);
    await queryFactory.run(usersTable.dropUsersQuery.query);
  } catch (error) {
    console.log(error);
  }
};

const seed = async () => {
  try {
    await queryFactory.run(seeders.users);
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
