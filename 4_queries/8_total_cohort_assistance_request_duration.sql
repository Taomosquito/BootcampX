SELECT "cohorts"."name", SUM("completed_at" - "started_at") AS "total_duration"
FROM "assistance_requests"
JOIN "students" ON "students"."id"= "student_id"
JOIN "cohorts" ON "cohorts"."id" = "cohort_id"
GROUP BY "cohorts"."name"
ORDER BY SUM("completed_at" - "started_at");