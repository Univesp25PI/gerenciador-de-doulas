-- Criação da tabela Doula
CREATE TABLE IF NOT EXISTS Doula (
                                     id SERIAL PRIMARY KEY,
                                     name TEXT NOT NULL,
                                     phone TEXT NOT NULL,
                                     email TEXT UNIQUE NOT NULL,
                                     create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                     update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
