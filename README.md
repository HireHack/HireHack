# HireHack
<img src="https://i.ibb.co/560P863/Screenshot-2021-05-13-at-12-13-06.png" data-canonical-src="https://i.ibb.co/560P863/Screenshot-2021-05-13-at-12-13-06.png" width="100%" />
<br/>

### Developers: Ángela Herrador López & Javier Repilado López.
<p>HireHack is a job hunt portal developed as a responsive full-stack web application.</p>
<p>If you want to check it out go to <a href="https://hire-hack.herokuapp.com/">HireHack</a>
<p>To watch the full live demo on YouTube <a href="https://www.youtube.com/watch?v=8TWo-3_LpZA" target="_blank">click here</a>

## Technologies
- **Server:** Node.js with Express
- **Data base:** MongoDB with Mongoose
- **Server-side** rendering with **Handlebars**
- Authentication with Passport: local, googleOauth2 and linkedinOauth2
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
| GET    | /candidate-profile        | Candidate profile.                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| GET    | /candidate-signup        | Signup form                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| POST    | /candidate-signup  | Sends email activation                                                                                                           | ![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png)|
| GET   | /activate-candidate/:token               | Account validation                                                                          |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /candidate-login          | Login form |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| POST    | /candidate-login       | Candidate Login | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /authenticate/google        | Google login                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /authenticate/google/callback       | Google login callback                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| POST    | /candidate-logout  | Candidate logout                                                                                                           | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET   | /candidate-edit/:id               | Edit candidate profile form                                                                          |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| POST    | /candidate-edit/:id          | Edit candidate profile |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| POST    | /candidate-update-email       | Sends email confirmation to get candidate email update form | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /candidate-edit-email       |Update candidate email | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /candidate-edit-email/:token       | Get candidate email update form | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /candidate-update-password       | Send email confirmation to get candidate password update form | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /candidate-edit-password/:token       | Get candidate password update form | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /candidate-edit-password       | Update candidate password | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /delete-candidate       | Send email to delete candidate | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /delete-candidate/:token       | Delete candidate | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|

### Companies
| Method | Endpoint            | Action                                                                                                                                  | Passport Auth |
| ------ | ------------------- | ------------------------------------------------------  | ---- |
| GET    | /company-profile        | Company profile                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| GET    | /company-signup        | Signup form                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| POST    | /company-signup  | Sends email activation                                                                                                          | ![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png)|
| GET   | /activate-company/:token               | Account validation                                                                          |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /company-login       | Login form |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| POST    | /company-login       | Company login  | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /auth/google       | Google login | ![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png)|
| GET    | /auth/google/callback       | Google login callback | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /company-logout       | Company logout | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /company-edit/:id       | Edit company profile form | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /company-edit/:id       | Edit company profile | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /company-update-email      | Sends email confirmation to get company email update form | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /company-edit-email       | Update company email | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /company-edit-email/:token       | Get company email update form | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /company-update-password     | Send email confirmation to get company password update form | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /company-edit-password       | Update company password | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /company-edit-password/:token       | Get company password update form | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /delete-company       | Send email to delete company  | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /delete-company/:token       | Delete company | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|

### Offers
| Method | Endpoint            | Action                                                                                                                                  | Passport Auth |
| ------ | ------------------- | ------------------------------------------------------  | ---- |
| GET    | /offers-list        | Main list of offers published                                                                                                            |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /offer-detail/:id        | Offer details                                                                                                       |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /offer-creation  | Render offer creation form                                                                                                          | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST   | /offer-creation               | Create offer                                                                          |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| GET    | /edit-offer/:id          | Render offer edit form |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| POST    | /edit-offer/:id        | Edit offer | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /delete-offer/:id       | Delete offer | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /search-offers        | Search filters to find offers | ![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png)|
| POST    | /offers/:id/paid        | Payment form | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| POST    | /offers/webhook        | Payment confirmation | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|


### Job Application
| Method | Endpoint            | Action                                                                                                                                  | Passport Auth |
| ------ | ------------------- | ------------------------------------------------------  | ---- |
| GET    | /application-detail/:id       | Details of applicants to offer                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png) |
| POST    | /apply/:id        | A logged in candidate applies to offer                                                                                                          |![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|
| GET    | /application-search  | Filters to select the candidates                                                                                                        | ![image](https://user-images.githubusercontent.com/70661191/118108893-d440e100-b3e0-11eb-8e9e-857e9883e2c8.png)|

### Misc
| Method | Endpoint            | Action                                                                                                                                  | Passport Auth |
| ------ | ------------------- | ------------------------------------------------------  | ---- |
| GET    | /        | Go home                                                                                                           |![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png) |
| GET    | /search  | Search offers from main manu                                                                                                           | ![image](https://user-images.githubusercontent.com/70661191/118108909-d86cfe80-b3e0-11eb-8ef1-f76295aa55ea.png)|

## Frontend
Hirehack is rendered into the frontend using _Handlebars_ and includes the following features:

#### - Find suitable job opportunities as a candidate among thousands of offers and apply to them:
<img src="https://i.ibb.co/bJj8zLQ/Offer-Candidate.gif" data-canonical-src="https://i.ibb.co/bJj8zLQ/Offer-Candidate.gif" width="75%" />


#### - How to publish an offer as a company?
<img src="https://raw.githubusercontent.com/HireHack/HireHack/main/public/img/CreateOffer.gif" data-canonical-src="https://raw.githubusercontent.com/HireHack/HireHack/main/public/img/CreateOffer.gif" width="75%" />


#### - Find the perfect candidate among all applicants: 
<img src="https://i.ibb.co/WgnxDbR/Application.gif" data-canonical-src="https://i.ibb.co/WgnxDbR/Application.gif" width="%"/>

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
