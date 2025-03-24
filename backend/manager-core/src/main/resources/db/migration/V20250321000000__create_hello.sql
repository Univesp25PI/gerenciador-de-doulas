-- Migration para a tabela Hello
CREATE TABLE Hello (
                       id SERIAL PRIMARY KEY,
                       hello_string TEXT NOT NULL,
                       hello_list TEXT NOT NULL,
                       type VARCHAR(10) NOT NULL,
                       create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
