-- Criação da tabela Pregnant
CREATE TABLE IF NOT EXISTS Pregnant (
                                        id SERIAL PRIMARY KEY,
                                        doula_id INTEGER NOT NULL,
                                        name TEXT NOT NULL,
                                        age INTEGER NOT NULL,
                                        first_pregnancy BOOLEAN NOT NULL,
                                        lmp_date DATE NOT NULL,
                                        comorbidities TEXT,
                                        create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                        update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                        FOREIGN KEY (doula_id) REFERENCES Doula(id) ON DELETE CASCADE
    );
