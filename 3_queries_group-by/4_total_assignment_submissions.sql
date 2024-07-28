SELECT "cohorts"."name", count(assignment_submissions.*) AS total_submissions
FROM "students"
JOIN "cohorts" ON "cohort_id" = "cohorts"."id"
JOIN "assignment_submissions" ON "assignment_submissions"."student_id" = "students"."id"
GROUP BY "cohorts"."name"
ORDER BY count(assignment_submissions.*) DESC;