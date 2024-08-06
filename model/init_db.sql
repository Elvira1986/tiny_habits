
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

-- Insert some sample data
-- INSERT INTO habits (title, description,completed, days_in, total_days )
-- VALUES
--     ('Learn JS','', 'false', '23', '100'); ('Meditate','', 'false', '10', '100');
--     ('Study SQL','', 'false', '75', '100');

--  { "title": "Learn JS", "description": " ", "completed": "false", "days_in": 23,"total_days": 100}