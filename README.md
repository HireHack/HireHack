# HireHack
<img src="https://i.ibb.co/560P863/Screenshot-2021-05-13-at-12-13-06.png" data-canonical-src="https://i.ibb.co/560P863/Screenshot-2021-05-13-at-12-13-06.png" width="100%" />
<br/>

### Developers: Ángela Herrador López & Javier Repilado López.
<p>HireHack is a job hunt portal developed as a responsive full-stack web application.</p>
<p>If you want to check it out go to <a href="https://hire-hack.herokuapp.com/">HireHack</a>

## Technologies
- **Server:** Node.js with Express
- **Data base:** MongoDB with Mongoose
- **Server-side** rendering with **Handlebars**
- Authentication with Passport: local, googleOauth2 and linkedingOauth2
- Design with CSS and Bootstrap V5
- External API’s: Stripe and Google Maps (geocoder)
- Cloudinary
- Connect-flash
- Nodemailer and MJML
- Deployment: Heroku

## Development Methodologies
- Agile SCRUM
- Agile Kanban

## Backend
HireHack is structured as a server-side rendered application whose endpoints are:

### Candidates
| Method | Endpoint            | Action                                                                                                                                  | Passport Auth |
| ------ | ------------------- | ------------------------------------------------------  | ---- |
| POST    | /user/login        | Get a user (the fields are username and password)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| POST    | /user/signup        | Create a new user (the fields are username, password, age, weight, height and email)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /user/activate/{{token}}  | Confirm account send a email to you                                                                                                           | ![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png)|
| GET   | /user/profile               | Get a user                                                                          |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| PUT    | /user/edit          | Edit user. Response includes the fields of req.body |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| DELETE    | /user/delete       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|

### Companies
| Method | Endpoint            | Action                                                                                                                                  | Passport Auth |
| ------ | ------------------- | ------------------------------------------------------  | ---- |
| POST    | /user/login        | Get a user (the fields are username and password)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| POST    | /user/signup        | Create a new user (the fields are username, password, age, weight, height and email)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /user/activate/{{token}}  | Confirm account send a email to you                                                                                                           | ![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png)|
| GET   | /user/profile               | Get a user                                                                          |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| PUT    | /user/edit          | Edit user. Response includes the fields of req.body |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| DELETE    | /user/delete       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|

### Offers
| Method | Endpoint            | Action                                                                                                                                  | Passport Auth |
| ------ | ------------------- | ------------------------------------------------------  | ---- |
| POST    | /user/login        | Get a user (the fields are username and password)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| POST    | /user/signup        | Create a new user (the fields are username, password, age, weight, height and email)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /user/activate/{{token}}  | Confirm account send a email to you                                                                                                           | ![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png)|
| GET   | /user/profile               | Get a user                                                                          |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| PUT    | /user/edit          | Edit user. Response includes the fields of req.body |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| DELETE    | /user/delete       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|

### Job Application
| Method | Endpoint            | Action                                                                                                                                  | Passport Auth |
| ------ | ------------------- | ------------------------------------------------------  | ---- |
| POST    | /user/login        | Get a user (the fields are username and password)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| POST    | /user/signup        | Create a new user (the fields are username, password, age, weight, height and email)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /user/activate/{{token}}  | Confirm account send a email to you                                                                                                           | ![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png)|
| GET   | /user/profile               | Get a user                                                                          |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| PUT    | /user/edit          | Edit user. Response includes the fields of req.body |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| DELETE    | /user/delete       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|

### Misc
| Method | Endpoint            | Action                                                                                                                                  | Passport Auth |
| ------ | ------------------- | ------------------------------------------------------  | ---- |
| GET    | /        | Get a user (the fields are username and password)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /main-login        | Create a new user (the fields are username, password, age, weight, height and email)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /search  | Confirm account send a email to you                                                                                                           | ![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png)|

## Frontend
Hirehack is rendered into the frontend using _Handlebars_ and includes the following features:

- A **Signup/Login** page with different options:
  - __Login__
  - __Signup__
  - _Go to email validation_
  - _Email validated_
  - __Finish profile__
- A **Meal** page where you can display the main food diary, which has two main subsections:
  - _Total Calories and Macros Summary_
  - _Recipes List_
- A **Single Recipe** page to display the details of a recipe the user clicked on. The user can add a recipe to its menu from this page.
- A **Sport** page to display the live running/walking tracker which has two options:
  - _Activity summary whenever an activity has been logged for the specific date_
  - _Activity tracker where the user can start an activity whenever there is no activity logged_
- A **Profile** page to show a form where the user can edit his parameters and personal information.

## Setup
- Fork this repo
- Clone this repo

```shell
$ cd HireHack
$ npm install
$ npm start
```

## Contribute
- Create a new branch:
  ```
  git checkout -b "contribution_[feature to add/edit]"
  ```
  
- Upon completion, run the following commands:
  ```
  git add .
  git commit -m "contribution_[your GitHub username]"
  git push origin branch-name
  ```
  
- Create Pull Request so we can check up your work and start a discussion.
