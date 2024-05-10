# CS24-p2-BSMRSTU_Prefect_Number
<h1 align="center">
EcoSync - CS24 Task
</h1>

Tools and Technolgoies use for implement this project is [Node.js, Express.js , MongoDb, React/Redux ]

## Clone or Download From Github
$ git clone 

## Project Structure
```
LICENSE
backend/
   package.json
   .env
   .gitignore
frontend/
   package.json
   .gitignore
...

```

# How To Run This Project
Frontend and Backend runs concurrently in different terminal session, in order to make them talk to each other

### Frontend run at PORT: 3000
Run follwoing command in Terminal

```
$ cd frontend        //Navigate to frontend folder
$ npm i              // npm install packages
$ npm start          // run it locally
```

### Backend run at PORT: 5000

Run follwoing command in Terminal
```
$ cd backend          //Navigate to backend folder
$ npm i               // npm install packages
$ npm start           // run it locally
```

.env file in backend must contains following informations
PORT = 5000
DB_URL = mongodb+srv://roni:173120@cluster0.cuyitno.mongodb.net/EcoSyncDB
SECRET_KEY=rons173120



### Login as admin
- userEmail: demo@gmail.com
- userPassword: demo

### Login as STS manager
- userEmail: demo.sts@gmail.com
- userPassword: 123456

### Login as Landfill manager
- userName: demo.lf@gmail.com
- userPassword: 123456

### License



### Frontend github: https://github.com/MdImranHosen1/cs-frontend
