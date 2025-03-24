# Gerenciador de Doulas
Sistema de controle e acompanhamento de doulandas.



# **📌 Estrutura do Banco de Dados - Sistema de Cadastro de Doulas, Gestantes e Aulas**  

Estrutura inicial do banco de dados para o sistema de cadastro de **Doulas**, **Gestantes** e **Aulas**. Componentes centrais:  
- A descrição de cada tabela;  
- Os campos e os tipos de dados utilizados;  
- Os relacionamentos entre as tabelas;  
- As queries SQL para criação das tabelas no **PostgreSQL**.


## **📊 Diagrama ER (`Mermaid`)**  

```mermaid
---
config:
  theme: neutral
---
erDiagram
    DOULA {
        int id PK
        string name
        string phone
        string email
        datetime create_date
        datetime update_date
    }
    PREGNANT {
        int id PK
        int doula_id FK
        string name
        int age
        bool first_pregnancy
        date lmp_date
        string comorbidities
        datetime create_date
        datetime update_date
    }
    CLASS {
        int id PK
        int pregnant_id FK
        int class_number
        string class_type
        datetime class_date
        datetime create_date
        datetime update_date
    }
    DOULA ||--o{ PREGNANT : "assigned to"
    PREGNANT ||--o{ CLASS : "connected with"
```


## **📚 Estrutura das Tabelas**  

### **1️⃣ Tabela `Doula`**  

A tabela `Doula` armazena informações sobre as profissionais cadastradas no sistema.  

#### **Campos e Tipos de Dados:**  
- **`id` (SERIAL, PK):** Identificador único da doula.  
- **`name` (TEXT, NOT NULL):** Nome completo da doula.  
- **`phone` (TEXT, NOT NULL):** Número de telefone da doula.  
- **`email` (TEXT, UNIQUE, NOT NULL):** Endereço de e-mail único.  
- **`create_date` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP):** Data de criação do registro.  
- **`update_date` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP):** Data de última atualização do registro.  

#### **Query de Criação:**  
```sql
CREATE TABLE Doula (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```


### **2️⃣ Tabela `Pregnant`**  

A tabela `Pregnant` (Gestante) armazena os dados das gestantes acompanhadas pelas doulas.  

#### **Campos e Tipos de Dados:**  
- **`id` (SERIAL, PK):** Identificador único da gestante.  
- **`doula_id` (INTEGER, FK, NOT NULL):** Referência para a doula responsável.  
- **`name` (TEXT, NOT NULL):** Nome completo da gestante.  
- **`age` (INTEGER, NOT NULL):** Idade da gestante.  
- **`first_pregnancy` (BOOLEAN, NOT NULL):** Indica se é a primeira gestação.  
- **`lmp_date` (DATE, NOT NULL):** Data da última menstruação (LMP).  
- **`comorbidities` (TEXT):** Possíveis comorbidades da gestante.  
- **`create_date` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP):** Data de criação do registro.  
- **`update_date` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP):** Data de última atualização do registro.  

#### **Query de Criação:**  
```sql
CREATE TABLE Pregnant (
    id SERIAL PRIMARY KEY,
    doula_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    first_pregnancy BOOLEAN NOT NULL,
    lmp_date DATE NOT NULL,
    comorbidities TEXT,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (doula_id) REFERENCES Doula(id) ON DELETE CASCADE
);
```

### **3️⃣ Tabela `Class`**  

A tabela `Class` (Aula) armazena os registros de aulas ministradas para cada gestante.  

#### **Campos e Tipos de Dados:**  
- **`id` (SERIAL, PK):** Identificador único da aula.  
- **`pregnant_id` (INTEGER, FK, NOT NULL):** Referência para a gestante participante.  
- **`class_number` (INTEGER, NOT NULL):** Número sequencial da aula.  
- **`class_type` (TEXT, NOT NULL):** Tipo de aula (ex.: parto, amamentação, cuidados com o bebê).  
- **`class_date` (TIMESTAMP, NOT NULL):** Data e horário da aula.  
- **`create_date` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP):** Data de criação do registro.  
- **`update_date` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP):** Data de última atualização do registro.  

#### **Query de Criação:**  
```sql
CREATE TABLE Class (
    id SERIAL PRIMARY KEY,
    pregnant_id INTEGER NOT NULL,
    class_number INTEGER NOT NULL,
    class_type TEXT NOT NULL,
    class_date TIMESTAMP NOT NULL,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (pregnant_id) REFERENCES Pregnant(id) ON DELETE CASCADE
);
```


## **🔗 Relacionamentos e Regras de Integridade**  

### **1️⃣ Relacionamento `Doula` ↔ `Pregnant`**  
- **1 Doula** pode acompanhar **várias Gestantes**.  
- **Se uma Doula for removida, todas as Gestantes associadas serão automaticamente excluídas.** (`ON DELETE CASCADE`)  

### **2️⃣ Relacionamento `Pregnant` ↔ `Class`**  
- **1 Gestante** pode ter **múltiplas Aulas registradas**.  
- **Se uma Gestante for removida, todas as Aulas associadas também serão apagadas.** (`ON DELETE CASCADE`)  


# Backend

## 🚀 Execução Local

### 🐳 Via Docker

1. Instale o Docker.
2. Na raiz do projeto, execute:
   ```
   docker-compose up --build
3. Verifique se a aplicação está rodando:
    ```
    curl --location 'http://localhost:8080/actuator/health'
### 🖥️ Via InteliJ
1. Instale o IntelliJ.
2. Abra o projeto.
3. Após o carregamento, execute o método main:
    ```
    backend/src/main/kotlin/br/com/doula/manager/ManagerApplication.kt
4. Verifique se a aplicação está rodando:
    ```
    curl --location 'http://localhost:8080/actuator/health'
### ☕ Via Java
1. Instale o Java 21.
2. No terminal, execute na raiz do backend:
    ```
    ./gradlew build --info --stacktrace
3. Rode a aplicação:
    ```
    java -jar build/libs/manager.jar
4. Verifique se a aplicação está rodando:
    ```
    curl --location 'http://localhost:8080/actuator/health'

## 🏛️ Clean Architecture
Optamos pelo uso da **Clean Architecture** para garantir um código mais organizado, legível e de alta manutenibilidade. Garantindo uma maior **separação de responsabilidades**, tornando a aplicação menos acoplada e mais flexível.
### 🔹 Benefícios
* Baixo acoplamento: As camadas podem ser alteradas sem impactar diretamente outras partes do código.
* Alta coesão: Cada módulo tem uma responsabilidade bem definida.
* Facilidade de teste: O código pode ser testado isoladamente, melhorando a confiabilidade da aplicação.
* Independência de frameworks e bancos de dados: O núcleo da aplicação não depende diretamente de tecnologias externas.
### Estrutura no Projeto:
### 📌 API
📍 Localização: **Projeto raiz**
* Contém a lógica de entrada e saída.
* Responsável pelos **controllers, responses e requests**.
* Depende do **manager-core**.

### 📌 CORE
📍 Localização: **Módulo manager-core**
* Gerencia comunicações externas, principalmente com o banco de dados.
* Contém **repositories, entities e implementações de gateways**.
* Depende do **manager-domain**.

### 📌 DOMAIN
📍 Localização: Módulo manager-domain
* Responsável pelas **regras de negócio e validações.**
* Contém **casos de uso e models.**
* **Não possui dependências** com outros módulos.
* Models devem ser usados para comunicação entre camadas via **adapters.**

## 📂 Collections
As collections no formato postman da aplicação são mantidas em:

    backend/collections/postman
 ## Diagrama da Arquitetura do projeto

```mermaid
 flowchart BT
    
    subgraph Domain
        UseCases
        Models
        Interfaces
    end

    subgraph API
        subgraph _line1 [ ]
            style _line1 fill:none,stroke:none
            Controllers
        end 
        subgraph _line2 [ ]
            style _line2 fill:none,stroke:none
            Requests
            Responses
        end
    end

    subgraph Core
        subgraph _line3 [ ]
            style _line3 fill:none,stroke:none
            Repositories
            Entities
        end
        subgraph _line4 [ ]
            style _line4 fill:none,stroke:none
            Gateways
        end
    end
    
    Exterior <--> API
    A[Banco de Dados] <--> Core
    Core --> |Gateways/CoreAdapters| Domain
    API --> |UseCases/ApiAdapters| Domain

    style Domain fill:#f9f,stroke:#333,stroke-width:4px
    style API fill:#bbf,stroke:#333
    style Core fill:#fbb,stroke:#333
```
# Frontend
