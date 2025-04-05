-- Criação da tabela Class
CREATE TABLE IF NOT EXISTS Class (
                                     id SERIAL PRIMARY KEY,
                                     pregnant_id INTEGER NOT NULL,
                                     class_number INTEGER NOT NULL,
                                     class_type TEXT NOT NULL,
                                     class_date TIMESTAMP NOT NULL,
                                     create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                     update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                     FOREIGN KEY (pregnant_id) REFERENCES Pregnant(id) ON DELETE CASCADE
    );