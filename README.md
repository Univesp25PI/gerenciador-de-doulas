# Gerenciador de Doulas
Sistema de controle e acompanhamento de doulandas.


# Estrutura do Banco de Dados - Sistema de Cadastro de Doulas e Gestantes V1

![Diagram](./imgs/pi1-2025-diagrama-banco-v1.png)

Estrutura inicial do banco de dados para o sistema de cadastro de **Doulas**, **Gestantes** e **Aulas**. Componentes centrais:
- A descrição de cada tabela;
- Os campos e os tipos de dados utilizados;
- Os relacionamentos entre as tabelas;
- As queries SQL para criação das tabelas no **PostgreSQL**, **SQLserver** (bancos relacionais de forma geral).

## Estrutura das Tabelas

### 1️.Tabela `Doulas`

A tabela `Doulas` armazena informações sobre as profissionais cadastradas no sistema.
#### **Campos e Tipos de Dados:**
- **`id_doula` (SERIAL):** Identificador único da doula. É a chave primária da tabela.
- **`nome` (TEXT):** Nome completo da doula.
- **`telefone` (TEXT):** Número de telefone da doula.
- **`email` (TEXT UNIQUE):** Endereço de e-mail único da doula, que não pode se repetir.

#### **Query de Criação:**
```sql
CREATE TABLE Doulas (
    id_doula SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    telefone TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);
```

### 2.Tabela `Gestantes`

A tabela `Gestantes` armazena os dados das gestantes acompanhadas pelas doulas.
#### **Campos e Tipos de Dados:**
- **`id_gestante` (SERIAL):** Identificador único da gestante. É a chave primária da tabela.
- **`id_doula` (INTEGER):** Identificador da doula responsável. É uma chave estrangeira que referencia o campo `id_doula` da tabela `Doulas`.
- **`nome` (TEXT):** Nome completo da gestante.
- **`idade` (INTEGER):** Idade da gestante.
- **`primeira_gestacao` (BOOLEAN):** Indica se a gestante está em sua primeira gestação (valor verdadeiro ou falso).
- **`inicio_gestacao` (DATE):** Data aproximada do início do período gestacional.
- **`semana_gestacao` (INTEGER):** Semana de gestação (calculada a partir do início da gestação).
- **`comorbidades` (TEXT):** Descrição de possíveis comorbidades da gestante.

#### **Query de Criação:**
```sql
CREATE TABLE Gestantes (
    id_gestante SERIAL PRIMARY KEY,
    id_doula INTEGER NOT NULL,
    nome TEXT NOT NULL,
    idade INTEGER NOT NULL,
    primeira_gestacao BOOLEAN NOT NULL,
    comorbidades TEXT,
    FOREIGN KEY (id_doula) REFERENCES Doulas(id_doula) ON DELETE CASCADE
);
```

### 3️.Tabela `Aulas`

A tabela `Aulas` registra as aulas ministradas para cada gestante.
#### **Campos e Tipos de Dados:**
- **`id_aula` (SERIAL):** Identificador único da aula. É a chave primária da tabela.
- **`id_gestante` (INTEGER):** Identificador da gestante que participou da aula. É uma chave estrangeira que referencia o campo `id_gestante` da tabela `Gestantes`.
- **`numero_aula` (INTEGER):** Número sequencial da aula.
- **`tipo_aula` (TEXT):** Tipo de aula ministrada (por exemplo, parto, amamentação, cuidados com o bebê).
- **`data_aula` (DATE):** Data em que a aula foi realizada.
- **`semana_gestacional` (INTEGER):** Semana gestacional da gestante no momento da aula.

#### **Query de Criação:**
```sql
CREATE TABLE Aulas (
    id_aula SERIAL PRIMARY KEY,
    id_gestante INTEGER NOT NULL,
    numero_aula INTEGER NOT NULL,
    tipo_aula TEXT NOT NULL,
    data_aula DATE NOT NULL,
    semana_gestacional INTEGER NOT NULL,
    FOREIGN KEY (id_gestante) REFERENCES Gestantes(id_gestante) ON DELETE CASCADE
);
```

## Relacionamentos e Regras de Integridade
- **Relacionamento entre Doulas e Gestantes:**  
    Cada **doula** pode cadastrar **várias gestantes**. Por isso, o campo `id_doula` na tabela `Gestantes` é uma chave estrangeira que referencia a tabela `Doulas`.
    - **Regra:** Se uma doula for removida, todas as gestantes associadas serão automaticamente excluídas (ON DELETE CASCADE).
- **Relacionamento entre Gestantes e Aulas:**  
    Cada **gestante** pode ter **múltiplas aulas** registradas. Assim, o campo `id_gestante` na tabela `Aulas` é uma chave estrangeira que referencia a tabela `Gestantes`.
    - **Regra:** Se uma gestante for removida, todas as aulas associadas também serão apagadas (ON DELETE CASCADE).


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

    Core --> |Gateways/CoreAdapters| Domain
    API --> |UseCases/ApiAdapters| Domain

    style Domain fill:#f9f,stroke:#333,stroke-width:4px
    style API fill:#bbf,stroke:#333
    style Core fill:#fbb,stroke:#333
```
# Frontend
