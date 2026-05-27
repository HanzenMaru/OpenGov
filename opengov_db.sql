CREATE DATABASE opengov_db;
USE opengov_db;

CREATE TABLE projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    start_date DATE,
    end_date DATE,
    status ENUM('Planned', 'Ongoing', 'Completed') DEFAULT 'Planned',
    total_budget DECIMAL(15, 2),
    funding_source VARCHAR(100),
    qr_code_url VARCHAR(255),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE projects 
ADD COLUMN is_published BOOLEAN DEFAULT FALSE;