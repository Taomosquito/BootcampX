const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

const firstOptional = process.argv[2];
const secondOptional = process.argv[3] || 5;

const queryWithParams = `
SELECT students.id AS student_id, students.name AS student_name, cohorts.name AS cohort_name
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`;

const queryWithoutParams = `
SELECT students.id AS student_id, students.name AS student_name, cohorts.name AS cohort_name
FROM students
JOIN cohorts ON cohorts.id = cohort_id
LIMIT 5;
`;

const query = firstOptional ? queryWithParams : queryWithoutParams;
const values = firstOptional ? [`%${firstOptional}%`, secondOptional] : [];

pool
  .query(query, values)
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(
        `${user.student_name} has an id of ${user.student_id} and was in the ${user.cohort_name} cohort`
      );
    });
  })
  .catch((err) => {
    console.error('Error executing query', err.stack);
  });

