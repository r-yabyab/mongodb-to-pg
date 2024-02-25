-- CREATE TABLE submissions (
CREATE TABLE IF NOT EXISTS submissions (
    _id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    userid VARCHAR(40),
    number DECIMAL(4, 2),
    timeslept DECIMAL(4, 2),
    activities VARCHAR(3000),
    memo VARCHAR(3000),
    createdat TIMESTAMP WITH TIME ZONE,
    updatedat TIMESTAMP WITH TIME ZONE,
    __v INTEGER DEFAULT 0
);





-- -- Should eventually rename to these
-- CREATE TABLE IF NOT EXISTS submissions (
--     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
--     user_id INTEGER,
--     mood DECIMAL(4, 2),
--     timeSlept DECIMAL(4, 2),
--     activities VARCHAR(3000),
--     memo VARCHAR(3000)
-- );