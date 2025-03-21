-- Migration para a tabela Hello
CREATE TABLE Hello (
                         id INTEGER PRIMARY KEY AUTOINCREMENT,
                         hello_string VARCHAR(255) NOT NULL,
                         hello_list VARCHAR(255) NOT NULL,
                         type VARCHAR(10) NOT NULL,
                         create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         update_date DATETIME DEFAULT CURRENT_TIMESTAMP
);