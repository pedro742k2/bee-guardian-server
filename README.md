# 🐝 Bee Guardian Project

### Note
- This is the back-end (API Server) repository of the Bee Guardian Project. To access the front-end repository [click here](https://github.com/pedro742k2/bee-guardian-webapp) (Its description will be available soon...)

## 🍯 What is the Bee Project and what is it used for

Bee Guardian is a React web app with the goal of speeding up the process of checking beehives health and production by monitoring multiple factors such as weight, internal and external temperatures and humidity.This is possible with the presence of an electronic device installed inside the hive container which is sending new readings regularly.
<br/><br/>
This project allows the beekeepers not to have to wear a special suit and move every day or week to the location of the hive(s) just to check if they are in place and producing.
  
## How to test

### 🌎 Bee Project is available online:
  - 📝 **Note:** The web page may take some time to load because it's using the free [Heroku](https://www.heroku.com/) tier [(Click here to see why)](https://blog.heroku.com/app_sleeping_on_heroku#:~:text=When%20Do%20Apps,put%20to%20sleep.)
  - 📡 Live web app: (**In maintenance. Will be available soon...**)
  
### 🐋 If you want to test it locally using Docker:
  - Clone the repository;
  - Create a ".env" file with environment variables in the root directory. The env. variables are the following:

    - ![imagem](https://user-images.githubusercontent.com/54741310/182219237-46602423-c888-4611-80d3-89ce29927498.png)
    - Where `JWT_SECRET` is the secret string of the Json Web Token, for authentication purposes and `DB_*` are the database connection and credentials.
    
  - Run `docker-compose up --build` to run the container.

## 🤝 Contributions and feedback

  - 🛠️ If you have any suggestions, want to report an issue or give general feedback, feel free to make a pull request or email me at `pedrobatista0704@gmail.com` with the suggestion or detailed description of the problem 😀.

## 💻 Technologies

### Frontend ([Repository](https://github.com/pedro742k2/bee-project))
  - React.js

### Backend
  - Node.js
  - Express
  - Bcrypt
  - JSON Web Token
  - Database: PostgreSQL, Redis
