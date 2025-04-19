CREATE SCHEMA partnerbenefit;

CREATE TABLE partnerbenefit.benefit_master (
    partner_code VARCHAR(10) NOT NULL,
    plan_code VARCHAR(10) NOT NULL,
    policy_no VARCHAR(20),
    temp_policy_no VARCHAR(20),
    mode INT NOT NULL,
    pay_period VARCHAR(10) NOT NULL,
    policy_status CHAR(1),
    policy_status_date DATE NOT NULL,
    sum BIGINT NOT NULL
);