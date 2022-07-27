# 🐝 Bee Guardian Project

### Note
- This is the back-end (API Server) repository of the Bee Guardian Project. To access the frotn-end code [click here](https://github.com/pedro742k2/bee-project)

## 🍯 What is the Bee Project and what is it used for

Bee Guardian is a React web app with the goal of speeding up the process of checking beehives health and production by monitoring multiple factors such as weight, internal and external temperatures and humidity.This is possible with the presence of an electronic device installed inside the hive container which is sending new readings regularly.
<br/><br/>
This project allows the beekeepers not to have to wear a special suit and move every day or week to the location of the hive(s) just to check if they are in place and producing.
  
## How to test it out

### 🌎 Bee Project is available online
  - 📝 **Note:** The web page may take some time to load because it's using the free [Heroku](https://www.heroku.com/) tier [(Click here to see why)](https://blog.heroku.com/app_sleeping_on_heroku#:~:text=When%20Do%20Apps,put%20to%20sleep.)
  - 📡 Live web app: (**In maintenance. Will be available soon...**)
### 🏠 But if you want to test it locally and make changes to the code
  - Clone this repository to the desired directory
  - Inside the desired directory, run:
    - Create the tables with the queries located at `src/database/schemas` on your own database or import the PostgreSQL backup script `DB_BACKUP` available at `src/database`;
    - `npm install` to install all the project dependencies;
    - Create a `.env` file in the root directory and add the following data: `JWT_SECRET`, `DB_HOST`, `DB_USER`, `DB_NAME` and `DB_PASSWORD`, where:
      - `JWT_SECRET` is the secret of the json web token. You can type anything you want, **but it is required to be there**;
      - `DB_HOST` is the host IP address. If hosted locally, you can type `127.0.0.1`;
      - `DB_USER` is the username of the desired PostgreSQL (default is `postgres`);
      - `DB_NAME` is the name of the desired database;
      - `DB_PASSWORD` is the defined password of the `DB_NAME` database.
    - `npm start` to execute the server.

### 🤝 Contributions and feedback

  - 🛠️ If you have any suggestions, want to report an issue or give general feedback, feel free to make a pull request or email me at pedro.manuel.peres.batista@gmail.com with the suggestion or detailed description of the problem 😀.
  - 🙌 I'll thank you for that!

## 💻 Technologies

### Frontend ([Repository](https://github.com/pedro742k2/bee-project))
  - React
  - CSS
  - chart.js

### Backend
  - Node.js
  - Express
  - Bcrypt
  - JSON Web Token
  - **Knex** and **PG** for the database connection
  - Database: **PostgreSQL**
