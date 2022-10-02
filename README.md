# 🐝 Bee Guardian Project

### Note
- This is the back-end (API Server) repository of the Bee Guardian Project. To access the front-end repository [click here](https://github.com/pedro742k2/bee-guardian-webapp).

## 🍯 What is the Bee Project and what is it used for

Bee Guardian is a React web app with the goal of speeding up the process of checking beehives health and production by monitoring multiple factors such as weight, internal and external temperatures and humidity.This is possible with the presence of an electronic device installed inside the hive container which is sending new readings regularly.
<br/><br/>
This project allows the beekeepers not to have to wear a special suit and move every day or week to the location of the hive(s) just to check if they are in place and producing.
  
 
## Web App Screenshots (Dashboard page only)

### Dashboard Navigation
<img width="980" alt="dashboard navigation" src="https://user-images.githubusercontent.com/54741310/192089981-aa2d9bfd-754b-4808-ad21-beebf117cbc1.png">

### Hive Selector
<img width="980" alt="hive selector" src="https://user-images.githubusercontent.com/54741310/192089811-e2ae483d-9c5b-4118-b05b-0630c13d2abf.png">

### Last Readings & Add Hive Menu
<img width="980" alt="last readings   add hive" src="https://user-images.githubusercontent.com/54741310/192089834-0ace284c-1a5e-4863-a22a-4350d1129821.png">

### Chart Reading Options
<img width="980" alt="chart options selector" src="https://user-images.githubusercontent.com/54741310/192089851-d6b484aa-0ec8-4b45-9fab-ce7f07bf6711.png">

### Hive Readings
<img width="980" alt="chart readings" src="https://user-images.githubusercontent.com/54741310/192089874-80901bb5-b221-4283-897d-6eab04f0cd38.png">

### Hive Notes
<img width="980" alt="hive notes" src="https://user-images.githubusercontent.com/54741310/192089882-6c5403a3-39ff-4ad8-807c-a26389efbe08.png">

## Database Entity Relationship Diagram

<img width="980" alt="image" src="https://user-images.githubusercontent.com/54741310/193444668-c39d3bf8-d4ad-4413-bb37-5ca4acfb9303.png">

## Mock scheme (Concept of real implementation)

<img width="980" alt="image" src="https://user-images.githubusercontent.com/54741310/193444541-12467f29-f13b-41d1-9d31-928108bf6b5d.png">

## How to test

### 🌎 Bee Guardian Project is available online:
  - 📡 Live web app: [Click here](https://pedro742k2.github.io/bee-guardian-webapp)
  
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
  - Typescript

### Backend
  - Node.js
  - Typescript
  - Express
  - Bcrypt
  - JSON Web Token
  - Database: PostgreSQL, Redis
