-- Criação da tabela Doula
CREATE TABLE IF NOT EXISTS Doula (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

-- Trigger para atualizar automaticamente o campo 'update_date' nas tabelas 'Pregnant' e 'Class'
CREATE OR REPLACE FUNCTION update_timestamp() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.update_date := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para a tabela Pregnant
CREATE TRIGGER update_pregnant_timestamp
BEFORE UPDATE ON Pregnant
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Trigger para a tabela Class
CREATE TRIGGER update_class_timestamp
BEFORE UPDATE ON Class
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
