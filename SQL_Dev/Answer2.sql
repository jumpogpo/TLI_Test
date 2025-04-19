SELECT *
FROM "benefit_master"
WHERE EXTRACT(YEAR FROM policy_status_date) = 2020
LIMIT 31