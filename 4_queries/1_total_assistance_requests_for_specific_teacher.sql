SELECT count(assistance_requests.id) AS total_assistances, "teachers"."name" AS name
FROM "assistance_requests"
JOIN "teachers" ON "teachers"."id" = "teacher_id"
WHERE "teachers"."name" = 'Waylon Boehm'
GROUP BY "teachers"."name";