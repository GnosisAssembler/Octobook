# OctoBook - Mini Social App

![repo size](https://img.shields.io/github/repo-size/pankaryp/Mini-social-app.svg) ![node 10.15.1](https://img.shields.io/badge/node-10.15.1-brightgreen.svg)    

> A mini social app for developers 💻

### Table of Contents

* [Description](#description)
* [Getting Started](#getting-started)
    * [Available Scripts](#available-scripts)
    * [Github Auth App](#github-auth-app)
    * [Remote Database](#remote-database)
    * [Local Database](#local-database)
    * [Heroku Deployment](#heroku-deployment)
    * [Production Build](#production-build)
* [Application Overview](#application-overview)
    * [Register-Login](#register-login)
        * [Gravatar](#gravatar)
        * [Authedication](#authedication)
        * [Error Handling](#error-handling)
        * [Password hashing](#password-hashing)
    * [Public Users](#public-users)
    * [Dashboard](#dashboard)
        * [Profile](#profile)
            * [Github API](#github-api)
        * [Edit Profile](#edit-profile)
        * [Add Experience](#add-experience)
        * [Add Education](#add-education)
     * [Chat](#chat)
     * [Post Feed](#post-feed)
        * [Likes-Comments](#likes-comments)
* [Technologies Used](#technologies-used)
    * [Folder Structure](#folder-structure)
* [Contribution](#contribution)
* [License](#license)

# Description

This repository is an attempt to make a full stack application with an interactive interface using at least one javascript framework. Octobook is a mini social network, where you can register/login, create a profile, add personal information, post on the public wall, like-comment other's posts and chat in a public chatroom with other users.

# Getting Started

You can view a live demo of the application on [Heroku here](https://octobook.herokuapp.com/)!

If you want to set up your own development enviroment, just clone this repository:
```bash
git clone https://github.com/pankaryp/Mini-social-app.git
```
Install server and client dependencies
```bash
cd Mini-social-app
npm install && npm run client-install
```

__NOTE: In order to run the app, you need a Local MongoDB installation or a Remote Database (which is a quicker solution), for example at [MLab](https://mlab.com). Also you will need an Auth Github App registered for the "latest repositories functionality". We will cover all that below.__

## Github Auth App

Create a new [Github Auth App](https://github.com/settings/applications/new)

Open _/client/src/components/profile/ProfileGithub.js_ and replace __"clientId"__ and __"clientSecret"__ with your own. 

```javascript
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
    constructor(props) {
        super(props);
        this.state = {
        clientId: '',
        clientSecret: '',
        count: 5,
        sort: 'created: asc',
        repos: []
        };
    }
    ...
```

Also you must go in the newly created app's [dashboard](https://github.com/settings/developers) and replace __"Homepage URL"__ and __"Authorization callback URL"__ either with _http://localhost:3000_ if you are going to run the app locally, or with your __heroku link__ if you are going to deploy the app to heroku. 

![git](img-samples/git.png?raw=true)

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

Create an account on [MLab](https://mlab.com), login into your account and on the dashboard screen, create a new Database (first button on the right __"Create new"__). 

![mongo-1](img-samples/mongo-1.png?raw=true)

Choose a cloud provider. For now lets go with __Amazon Web Services__. Choose __"SandBox"__, which is the free plan and press ok. You will need to wait 5-10 secs for the database to be created. 

![mongo-2](img-samples/mongo-2.png?raw=true)

Last step is to create a __user__ for the database. 

![mongo-3](img-samples/mongo-3.png?raw=true)

After creating a user, copy the __"To connect using a driver via the standard MongoDB URI"__ link (something like this, 
_mongodb://<dbuser>:<dbpassword>@ds139435.mlab.com:39435/network_), replacing __"\<dbuser\>"__ and __"\<dbpassword\>"__ with your current user's credentials, _into /config/keys_dev.js_.

![mongo-4](img-samples/mongo-4.png?raw=true)

```javascript
module.exports = {
    //mongoURI: 'mongodb://localhost/octobooksocialapp',
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

Go to _/config/keys_dev.js_, comment out __mongoURI__ and __secretOrKey__ and uncomment the first line , replacing __"octobook social app"__ with the name of your own database.
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

Go to __"Deploy"__ section at the bottom and follow the instructions, in order to upload your app to heroku using __heroku-cli__. 

At __"Settings"__ section , under the __"Config Vars"__ area, add two global variables for the database, using your MLab __mongo uri__ and your __secret__ (_/config/keys_dev.js_):
```
MONGO_URI : mongodb://pankaryp3:pankaryp3@ds131765.mlab.com:31765/mini-social-app
SECRET_OR_KEY : secret
```

__NOTE: The "heroku-postbuild" script, creates a production build after your code gets uploaded to heroku, so there is no need to worry about this.__

## Production Build

If for some reason you want to create an optimized build, just run:
```bash
cd client
npm run build
```

# Application Overview

![landing](img-samples/landing.png?raw=true)

## Register-Login

Users can register and login with their email adress.

![register](img-samples/register.png?raw=true)

![login](img-samples/login.png?raw=true)

### Gravatar

The application is using [Gravatar](https://el.gravatar.com/) for users' profile picture. That's why users are encouraged to use a gravatar email.

### Authedication

Authedication is being achieved with __Json Web Tokens Strategy__ using [Passport](http://www.passportjs.org/). All users have private access to their profile, where they can see and change information that other users can't. There are also public places that all users can see, like "Developers" and "Chat". 

### Error Handling

All the forms are being validated for empty spaces, invalid emails, password length, unmatched passwords etc.

![err](img-samples/err.png?raw=true)

### Password hashing

The passwords are being hashed with a 10 digit salt, using [BCrypt](https://github.com/kelektiv/node.bcrypt.js/).

## Public Users

All the users that have signed up to the network can be seen publicly under the "Developers" link.

![users](img-samples/users.png?raw=true)

## Dashboard

Every user has his own dashboard, where he can create a profile, if he doesnt have one, or add/edit his information.

![dash-non](img-samples/dash-non.png?raw=true)

![dash-full](img-samples/dash-full.png?raw=true)

### Profile

Every user has his private profile section, where he can preview all his info.

![prof-1](img-samples/prof-1.png?raw=true)

#### Github API

If the user add his github username, the application fetches his latest repositories from github.

![prof-2](img-samples/prof-2.png?raw=true)

### Edit Profile

The user can edit his profile's information.

![ed-prof-1](img-samples/ed-prof-1.png?raw=true)

Social links section is optional.

![ed-prof-2](img-samples/ed-prof-2.png?raw=true)

### Add Experience

Users can add experience.

![exp](img-samples/exp.png?raw=true)

### Add Education

Users can add education.

![edu](img-samples/edu.png?raw=true)

## Chat

There is a public chatroom where all users can send messages in real time.
The chatroom uses the [Websocket server API for Node js](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

![pub-chat](img-samples/pub-chat.png?raw=true)

![chat](img-samples/chat.png?raw=true)


## Post Feed

There is a semi-private section where all users can make posts and get likes/comments from other users. 

![post](img-samples/post.png?raw=true)

### Likes-Comments

![comments](img-samples/comments.png?raw=true)

# Technologies Used

* Node js
* Express
* React
* Redux 
* MongoDB - Mongoose
* Bootstrap

## Folder Structure

<pre>
│   .gitignore
│   license
│   package-lock.json
│   package.json
│   README.md
│   server.js
│   ws-server.js
│
├───client
│   │   .gitignore
│   │   package-lock.json
│   │   package.json
│   │
│   ├───public
│   │       favicon.ico
│   │       index.html
│   │       manifest.json
│   │
│   └───src
│       │   App.css
│       │   App.js
│       │   App.test.js
│       │   index.css
│       │   index.js
│       │   registerServiceWorker.js
│       │   store.js
│       │
│       ├───actions
│       │       authActions.js
│       │       postActions.js
│       │       profileActions.js
│       │       types.js
│       │
│       ├───components
│       │   ├───add-credentials
│       │   │       AddEducation.js
│       │   │       AddExperience.js
│       │   │
│       │   ├───auth
│       │   │       Login.js
│       │   │       Register.js
│       │   │
│       │   ├───chat
│       │   │       Chat.js
│       │   │       ChatInput.js
│       │   │       ChatMessage.js
│       │   │
│       │   ├───common
│       │   │       InputGroup.js
│       │   │       PrivateRoute.js
│       │   │       SelectListGroup.js
│       │   │       spinner.gif
│       │   │       Spinner.js
│       │   │       TextAreaFieldGroup.js
│       │   │       TextFieldGroup.js
│       │   │
│       │   ├───create-profile
│       │   │       CreateProfile.js
│       │   │
│       │   ├───dashboard
│       │   │       Dashboard.js
│       │   │       Education.js
│       │   │       Experience.js
│       │   │       ProfileActions.js
│       │   │
│       │   ├───edit-profile
│       │   │       EditProfile.js
│       │   │
│       │   ├───layout
│       │   │       Footer.js
│       │   │       Landing.js
│       │   │       Navbar.js
│       │   │
│       │   ├───not-found
│       │   │       NotFound.js
│       │   │
│       │   ├───post
│       │   │       CommentFeed.js
│       │   │       CommentForm.js
│       │   │       CommentItem.js
│       │   │       Post.js
│       │   │       PostFeed.js
│       │   │       PostForm.js
│       │   │       PostItem.js
│       │   │       Posts.js
│       │   │
│       │   └───profile
│       │           Profile.js
│       │           ProfileAbout.js
│       │           ProfileCreds.js
│       │           ProfileGithub.js
│       │           ProfileHeader.js
│       │           ProfileItem.js
│       │           Profiles.js
│       │
│       ├───img
│       │       octo.jpg
│       │       prof.png
│       │
│       ├───reducers
│       │       authReducer.js
│       │       errorReducer.js
│       │       index.js
│       │       postReducer.js
│       │       profileReducer.js
│       │
│       ├───utils
│       │       setAuthToken.js
│       │
│       └───validation
│               is-empty.js
│
├───config
│       keys.js
│       keys_dev.js
│       keys_prod.js
│       passport.js
│
├───img-samples
│       chat.png
│       comments.png
│       dash-full.png
│       dash-non.png
│       ed-prof-1.png
│       ed-prof-2.png
│       edu.png
│       err.png
│       exp.png
│       git.png
│       landing.png
│       login.png
│       mongo-1.png
│       mongo-2.png
│       mongo-3.png
│       mongo-4.png
│       post.png
│       prof-1.png
│       prof-2.png
│       pub-chat.png
│       register.png
│       users.png
│
├───models
│       Post.js
│       Profile.js
│       User.js
│
├───routes
│   └───api
│           posts.js
│           profile.js
│           users.js
│
└───validation
        education.js
        experience.js
        is-empty.js
        login.js
        post.js
        profile.js
        register.js
</pre>

# Contributing

If something is unclear, wrong, or needs to be refactored, please let me know. Pull requests are always welcome. Please open an issue before submitting a pull request. 

# License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.


