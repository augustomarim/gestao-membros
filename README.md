# Gestão de Membros

Sistema de cadastro e gerenciamento de membros desenvolvido como desafio técnico para vaga de Estágio em Desenvolvimento de Sistemas e Aplicativos.

## 🛠️ Tecnologias

**Backend**
- Java 17+
- Spring Boot 3.5
- Spring Data JPA
- H2 Database (in-memory)
- Lombok
- Maven

**Frontend**
- React 19 + TypeScript
- Vite
- Material UI (MUI) v9
- Axios
- React Hook Form
- React iMask (CPF mask)
- MUI X Date Pickers

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Java 17 ou superior
- Maven
- Node.js 18 ou superior
- npm

---

### Backend

1. Abra a pasta `backend` na sua IDE (IntelliJ recomendado)
2. Aguarde o Maven baixar as dependências automaticamente
3. Execute a classe `BackendApplication.java`
4. O servidor iniciará em `http://localhost:8080`

Ou via terminal:

```bash
cd backend
./mvnw spring-boot:run
```

---

### Frontend

1. Abra a pasta `frontend` no VS Code
2. Abra o terminal integrado (`Ctrl + '`)
3. Execute os comandos abaixo:

```bash
cd frontend
npm install
npm run dev
```

4. Acesse `http://localhost:5173` no navegador

> ⚠️ O backend deve estar rodando antes de abrir o frontend.

---

## 📋 Regras de Negócio

- **Idade mínima:** apenas pessoas com 18 anos ou mais podem ser cadastradas
- **CPF válido:** o sistema valida matematicamente o CPF usando o algoritmo oficial da Receita Federal
- **CPF único:** não é permitido cadastrar dois membros com o mesmo CPF
- **CPF no banco:** armazenado apenas com números, exibido formatado (000.000.000-00)
- **Status:** cada membro pode estar ativo ou inativo
- **Erros claros:** todas as violações de regra retornam mensagens descritivas ao usuário

---

## 📁 Estrutura do Projeto

```
gestao-membros/
├── backend/          # API REST com Spring Boot
│   └── src/
│       └── main/java/br/com/augustoluiz/backend/
│           ├── controller/
│           ├── service/
│           ├── repository/
│           ├── entity/
│           ├── dto/
│           └── exception/
└── frontend/         # Interface com React + TypeScript
    └── src/
        ├── api/
        ├── components/
        ├── pages/
        ├── types/
        └── utils/
```

---

## 🔗 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/members` | Lista todos os membros |
| GET | `/api/members/{id}` | Busca membro por ID |
| POST | `/api/members` | Cadastra novo membro |
| PUT | `/api/members/{id}` | Atualiza membro |
| DELETE | `/api/members/{id}` | Remove membro |
