# OctoBook - Mini Social App

![repo size](https://img.shields.io/github/repo-size/pankaryp/Mini-social-app.svg) ![node 10.15.1](https://img.shields.io/badge/node-10.15.1-brightgreen.svg)    

> A mini social app for developers 💻

### Table of Contents

* [Description](#description)
* [Getting Started](#getting-started)
    * [Available Scripts](#available-scripts)
    * [Remote Database](#remote-database)
    * [Local Database](#local-database)
    * [Heroku Deployment](#heroku-deployment)
    * [Production Build](#production-build)
* [Application Overview](#application-overview)
    * [Register-Login](#register-login)
        * [Authedication](#authedication)
        * [Error Handling](#error-handling)
        * [Password hashing](#password-hashing)
    * [Public Users](#public-users)
    * [Dashboard](#dashboard)
        * [Profile](#profile)
            * [Gravatar](#gravatar)
            * [Github API](#github-api)
        * [Edit Profile](#edit-profile)
        * [Add Experience](#add-experience)
        * [Add Education](#add-education)
     * [Chat](#chat)
     * [Post Feed](#post-feed)
        * [Likes-Comments](#likes-comments)
* [Technologies Used](#technologies-used)
    * [Folder Structure](#folder-structure)
    * [Back End](#back-end)
        * [Config](#config)
        * [REST Api](#rest-api)
        * [Mongoose Models](#mongoose-models)
        * [Authedication - JWT](#authedication-jwt)
        * [Validation](#validation)
        * [Hashing](#hashing)
        * [Websockets](#websockets)
    * [Front End](#front-end)
        * [Bootstrap](#bootstrap)
        * [React](#react)
            * [Components](#components)
            * [State Management - Redux](#state-management-redux)
        * [Custom Styles](#custom-styles)
* [Contribution](#contribution)
* [License](#license)

# Description

This repository is an attempt to make a full stack application with an interactive interface using at least one javascript framework. Octobook is a mini social network, where you can register/login, create a profile, add personal information, post on the public wall, like-comment other's posts and chat in a public chatroom with other users.

# Getting Started

You can view a live demo of the application on [Heroku here](https://heroku.com)!

If you want to set up your own development enviroment, just clone this repository:
```bash
git clone https://github.com/pankaryp/Mini-social-app.git
```
Install server and client dependencies
```bash
cd Mini-social-app
npm install && npm client-install
```

__NOTE: In order to run the app, you need a Local MongoDB installation or a Remote Database (which is a quicker solution), for example at MLab [MLab](https://mlab.com). We will cover both options below.__

## Available Scripts

Script | Desc
--- | --- 
npm run client-install  | Installs client dependencies
npm run client | Starts the react server
npm run start | Starts the express server
npm run server | Starts the express server with live-reloading
npm run ws-server | Starts the websocket server with live-reloading
npm run dev | Starts react, express and websocket server together
npm run heroku-postbuild | Heroku based script for creating the production build

## Remote Database

Create an account on [MLab](https://mlab.com), login into your account and on the dashboard screen, create a new Database (first button on the right "Create new"). 

![mongo-1](img-samples/mongo-1.png?raw=true)

Choose a cloud provider. For the moment lets go with Amazon Web Services. Choose "SandBox", which is the free plan and press ok. You will need to wait 5-10 secs for the database to be created. 

![mongo-2](img-samples/mongo-2.png?raw=true)

Last step is to create a user for the database. 

![mongo-3](img-samples/mongo-3.png?raw=true)

After creating a user, copy the "To connect using a driver via the standard MongoDB URI" link (something like this, 
_mongodb://<dbuser>:<dbpassword>@ds139435.mlab.com:39435/network_), replacing "<dbuser>" and "<dbpassword>" with your current user's credentials, into /config/keys_dev.js.

![mongo-4](img-samples/mongo-4.png?raw=true)

```javascript
module.exports = {
    //mongoURI: 'mongodb://localhost/mernsocialapp',
    mongoURI: 'mongodb://testuser:testpass@ds139435.mlab.com:39435/network',
    secretOrKey: 'secret'
};
```

Now you are ready to start the development server:
```bash
npm run dev
```

## Local Database

Download and install [MongoDB Community Server](https://www.mongodb.com/download-center/community). More information about the installation [here](https://docs.mongodb.com/manual/administration/install-community/).

_It is suggested to install MongoDB as a service and to not install Mongo Compass._

After installing Mongo as a service, run the below command with Administrative privileges. 
```bash
"C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe"
```

Create a new database
```bash
use minisocialapp
```

Go to /config/keys_dev.js, comment out mongoURI and secretOrKey and uncomment the first line , replacing "mern social app" with the name of your own database.
```javascript
module.exports = {
    mongoURI: 'mongodb://localhost/minisocialapp',
    //mongoURI: 'mongodb://pankaryp3:pankaryp3@ds131765.mlab.com:31765/mini-social-app',
    //secretOrKey: 'secret'
};
```

Now you are ready to start the development server:
```bash
npm run dev
```

## Heroku Deployment

Log in into your heroku account and create a new application in the heroku dashboard.

Go to "Deploy" section at the bottom and follow the instructions, in order to upload your app to heroku using heroku-cli. 

At "Settings" section , under the "Config Vars" area, add two global variables for the database, using your MLab mongo uri and your secret (_/config/keys_dev.js):
```
MONGO_URI : mongodb://pankaryp3:pankaryp3@ds131765.mlab.com:31765/mini-social-app
SECRET_OR_KEY : secret
```

__NOTE: The "heroku-postbuild" script, creates a production build after your code gets uploaded to heroku, so there is no need to worry about this. __

## Production Build

If for some reason want to create an optimized build, just run:
```bash
cd client
npm run build
```

# Application Overview

![landing](img-samples/landing.png?raw=true)

## Register-Login



### Authedication



### Error Handling



### Password hashing



## Public Users



## Dashboard



### Profile



#### Gravatar



#### Github API



### Edit Profile



### Add Experience



### Add Education



## Chat



## Post Feed



### Likes-Comments



# Technologies Used



## Folder Structure



## Back End



### Config



### REST Api



### Mongoose Models



### Authedication - JWT



### Validation



### Hashing



### Websockets



## Front End



### Bootstrap



### React



#### Components



#### State Management - Redux



### Custom Styles



# Contribution



# License


