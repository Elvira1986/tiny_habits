
-- Drop Tables
DROP TABLE if exists habits;

-- Create Tables
CREATE TABLE habits (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    completed BOOLEAN NOT NULL,
    days_in INT NOT NULL,
    total_days INT NOT NULL
);

