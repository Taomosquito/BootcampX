const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "bootcampx",
});

const firstOptional = process.argv[2];
const query =
  `
    SELECT DISTINCT "teachers"."name" AS teacher, "cohorts"."name" AS cohort
    FROM "assistance_requests"
    JOIN "teachers" ON "teachers"."id" = "teacher_id"
    JOIN "students" ON "students"."id" = "student_id"
    JOIN "cohorts" ON "cohorts"."id" = "cohort_id"
    WHERE "cohorts"."name" LIKE $1
    ORDER BY "teachers"."name";
    `;

const values = [`%${firstOptional}%`]

pool
  .query(query, values)
  .then((res) => {
    res.rows.forEach((user) => {
      console.log(
        `${user.cohort}: ${user.teacher}`
      );
    });
  })
  .catch((err) => {
    console.error('Error executing query', err.stack);
  });