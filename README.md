# 🐝 Bee Guardian Project

### Note
- This is the back-end (API Server) repository of the Bee Guardian Project. To access the frotn-end code [click here](https://github.com/pedro742k2/bee-project)

## 🍯 What is the Bee Project and what is it used for

Bee Guardian is a React web app with the goal of speeding up the process of checking beehives health and production by monitoring multiple factors such as weight, internal and external temperatures and humidity.This is possible with the presence of an electronic device installed inside the hive container which is sending new readings regularly.
<br/><br/>
This project allows the beekeepers not to have to wear a special suit and move every day or week to the location of the hive(s) just to check if they are in place and producing.
  
## How to test

### 🌎 Bee Project is available online:
  - 📝 **Note:** The web page may take some time to load because it's using the free [Heroku](https://www.heroku.com/) tier [(Click here to see why)](https://blog.heroku.com/app_sleeping_on_heroku#:~:text=When%20Do%20Apps,put%20to%20sleep.)
  - 📡 Live web app: (**In maintenance. Will be available soon...**)
  
### 🐋 If you want to test it locally using Docker:
  - **Will be available soon**
  
### 🏠 If you want to test it locally without Docker:
  - Install PostgreSQL and Node.js to the desired OS;
  - Clone this repository;
  - Inside the project directory:
    - On "pgAdmin", restore the **backup script** of the tables to the desired database, located at `src/database` (*DB_BACKUP*) or create the tables manually by running the SQL scripts located at `src/database/schemas`;
    - `npm install` to install all the project dependencies;
    - Create a `.env` file in the root directory and add the following properties: `JWT_SECRET`, `DB_HOST`, `DB_USER`, `DB_NAME` and `DB_PASSWORD`, where:
      - `JWT_SECRET` is the secret of the json web token (authentication purposes). You can type anything you want, like "Bee Project" or gibberish like "o48r0c234r";
      - `DB_HOST` is the host IP address. If hosted locally (the database and server), you can type `127.0.0.1` (loopback address);
      - `DB_USER` is the username of the desired PostgreSQL (default is `postgres`);
      - `DB_NAME` is the name of the desired database where the restored tables are;
      - `DB_PASSWORD` is the defined password of the `DB_NAME` database.
      - At the end, the `.env` file should look like this:
      
        <img src="https://user-images.githubusercontent.com/54741310/181845361-7e5bf5f0-41af-4aab-b7bc-09130827b6ae.png" width=400 />

    - `npm start` to execute the server.
  
## 🤝 Contributions and feedback

  - 🛠️ If you have any suggestions, want to report an issue or give general feedback, feel free to make a pull request or email me at `pedrobatista0704@gmail.com` with the suggestion or detailed description of the problem 😀.

## 💻 Technologies

### Frontend ([Repository](https://github.com/pedro742k2/bee-project))
  - React
  - chart.js

### Backend
  - Node.js
  - Express
  - Bcrypt
  - JSON Web Token
  - Database: PostgreSQL, Redis
