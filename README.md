# Backend Testing Task

---

## Setup

To start with I initialized project and installed necessary dependencies by running the following commands:

```bash
npm init -y

npm i express cors dotenv sequelize mysql2
npm i -D nodemon sequelize-cli

npx sequelize-cli init
```

---

## DB Config

After Sequelize initialization, the /config, /migrations, /seeders, and /models folders were created. I then switched from config.json to config.cjs and used environment variables from .env so database credentials are not hardcoded.

To work with the database locally, I needed to run it first. For this purpose, I used Docker and started a MySQL container with the required environment variables.

```bash
docker run --name worksheet-test-task -e MYSQL_ROOT_PASSWORD=my_pwd_exactly_as_in_env -e MYSQL_DATABASE=worksheet_db -p 3306:3306 -d mysql:8
```

After starting the database container, I created the database and ran the initial migrations:

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

Next I generated migration files to define all required tables:

```bash
npx sequelize-cli migration:generate --name create-sessions
npx sequelize-cli migration:generate --name create-tasks
npx sequelize-cli migration:generate --name create-options
npx sequelize-cli migration:generate --name create-answers
```

After defining the table structures inside these migration files, I ran the migrations again to create the tables in the database:

```bash
npx sequelize-cli db:migrate
```

As suggested in the task description, I populated the database using a seeder instead of inserting data manually:

```bash
npx sequelize-cli seed:generate --name seed
npx sequelize-cli db:seed:all
```

Before moving on to API routes, I completed the database layer by defining Sequelize models. These models allow the application to interact with the tables directly in code.

After manually verifying the database tables using CLI I proceeded with implementing the API.

---

## API

app.js acts as an orchestrator for the application. I kept it small and clean limiting it to middleware setup and route registration.

For better structure, I created a /routes folder and split the logic based on application flow:

- session.routes.js handles session creation by generating a session token and storing it in the sessions table

- worksheet.routes.js contains two endpoints, GET and POST, as required by the task description

The routes were kept simple and focused only on the required functionality. Basic error handling was added to ensure safe and predictable behavior.

After testing the endpoints with http.rest (VS Code REST Client with I prefer more over Postman) I checked the 'answers' table and got the output below which shows the backend is working as expected.

```bash
+--------------------------------------+---------------------------------+--------+-----------+
| id                                   | instruction                     | text   | isCorrect |
+--------------------------------------+---------------------------------+--------+-----------+
| 00e2ac07-901e-45ce-8781-66ddbfb06aec | Which one is a JS framework?    | Django |         0 |
| e3963ee7-236c-486c-a587-38376c380c33 | HTTP status code for Not Found? | 404    |         1 |
+--------------------------------------+---------------------------------+--------+-----------+
```

---

## Moving to Production

During local development, the database was run using Docker.
For the production environment, the database was migrated to a hosted solution using Aiven MySQL.

I updated .env file accordingly with the new connection details. After updating config.cjs, migrations and seeders for prod were run to create the tables and populate the database with data.

The backend was then started locally to verify that the connection to the hosted database was successfully established. Once confirmed I deployed backend to Render as a web service.
