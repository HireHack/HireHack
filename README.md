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
| GET    | /candidate-profile        | Get a candidate profile.                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| GET    | /candidate-signup        | Create a new user (the fields are username, password, age, weight, height and email)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| POST    | /candidate-signup  | Confirm account send a email to you                                                                                                           | ![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png)|
| GET   | /activate-candidate/:token               | Get a user                                                                          |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /candidate-login          | Edit user. Response includes the fields of req.body |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| POST    | /candidate-login       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /authenticate/google        | Get a user (the fields are username and password)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /authenticate/google/callback       | Create a new user (the fields are username, password, age, weight, height and email)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| POST    | /candidate-logout  | Confirm account send a email to you                                                                                                           | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET   | /candidate-edit/:id               | Get a user                                                                          |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| POST    | /candidate-edit/:id          | Edit user. Response includes the fields of req.body |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| POST    | /candidate-update-email       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /candidate-edit-email       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /candidate-edit-email/:token       | Confirm activation from email link | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /candidate-update-password       | Confirm activation from email link | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /candidate-edit-password/:token       | Confirm activation from email link | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /candidate-edit-password       | Confirm activation from email link | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /delete-candidate       | Confirm activation from email link | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /delete-candidate/:token       | Confirm activation from email link | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|

### Companies
| Method | Endpoint            | Action                                                                                                                                  | Passport Auth |
| ------ | ------------------- | ------------------------------------------------------  | ---- |
| GET    | /company/profile        | Get a user (the fields are username and password)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| GET    | /company/signup        | Create a new user (the fields are username, password, age, weight, height and email)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| POST    | /company/signup  | Confirm account send a email to you                                                                                                           | ![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png)|
| GET   | /activate-company/:token               | Get a user                                                                          |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /company/login       | Edit user. Response includes the fields of req.body |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| POST    | /company/login       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /auth/google       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png)|
| GET    | /auth/google/callback       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /company-logout       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /company-edit/:id       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /company-edit/:id       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /company-update-email      | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /company-edit-email       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /company-edit-email/:token       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /company-update-password     | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /company-edit-password       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /company-edit-password       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /company-edit-password/:token       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /delete-company       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /delete-company/:token       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|

### Offers
| Method | Endpoint            | Action                                                                                                                                  | Passport Auth |
| ------ | ------------------- | ------------------------------------------------------  | ---- |
| GET    | /offers-list        | Get a user (the fields are username and password)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /offer-detail/:id        | Create a new user (the fields are username, password, age, weight, height and email)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /offer-creation  | Confirm account send a email to you                                                                                                           | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST   | /offer-creation               | Get a user                                                                          |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| GET    | /edit-offer/:id          | Edit user. Response includes the fields of req.body |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| POST    | /edit-offer/:id        | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /delete-offer/:id       | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /search-offers        | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png)|
| POST    | /offers/:id/paid        | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /offers/webhook        | Delete user | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|

### Job Application
| Method | Endpoint            | Action                                                                                                                                  | Passport Auth |
| ------ | ------------------- | ------------------------------------------------------  | ---- |
| GET    | /application-detail/:id       | Get a user (the fields are username and password)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| POST    | /apply/:id        | Create a new user (the fields are username, password, age, weight, height and email)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /application-search  | Confirm account send a email to you                                                                                                           | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|


### Misc
| Method | Endpoint            | Action                                                                                                                                  | Passport Auth |
| ------ | ------------------- | ------------------------------------------------------  | ---- |
| GET    | /        | Get a user (the fields are username and password)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /main-login        | Create a new user (the fields are username, password, age, weight, height and email)                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /search  | Confirm account send a email to you                                                                                                           | ![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png)|



## Frontend
Hirehack is rendered into the frontend using _Handlebars_ and includes the following features:

<img src="https://i.ibb.co/bJj8zLQ/Offer-Candidate.gif" data-canonical-src="https://i.ibb.co/bJj8zLQ/Offer-Candidate.gif" width="50%" />

<img src="https://i.ibb.co/XJpMVK7/Create-Offer.gif" data-canonical-src="https://i.ibb.co/XJpMVK7/Create-Offer.gif" width="50%" />

<img src="https://i.ibb.co/WgnxDbR/Application.gif" data-canonical-src="https://i.ibb.co/WgnxDbR/Application.gif" width="50%"/>

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
