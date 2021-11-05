# Portfolio Builder

This web application allows you to build your Portfolio Websites without having
you worried about actually coding a website. Just Sign-Up, fill in your details, and you will
get your Portfolio Site in minutes. Not only this, you can create as many portfolios you want based
on your desired work type. 

**This site is deployed on `Netlify - Client Site` and `Heroku - Server Side`. 
Available At : [Portfolio Builder](https://portfolio-builder.prajwalp.com.np "Portfolio Builder")**

## Technology Used

This site is built from **scratch** without being dependent on pre-made portfolio templates. 

* **`Frontend [Client Side]`**: It is a single page application which is powered by `React`, `Material UI`, `Bootstrap`, 
`HTML`, and `CSS`. `Axios` is used to send API requests to server. 

* **`Backend [Server Side]`**: I have used `Node JS`, `Express JS`, `JOI` - for schema validations, `MongoDB` - a No-SQL 
database from the backend to store user details.

## Installation Guide

First you need to `clone` this repository and run `npm install` to 
install all the dependencies used in the project and then you can start
the project with `npm start`. If you are running locally, you have to set
your `base_url` to direct to localhost in the client side.

**`For Backend:`** Before you run `npm start`, there are some `config` variables that you need to set. 

```
set portfolio_jwtPrivateKey=YourSecretTokenHere
set portfolio_db="DB URI HERE"
``` 

#
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

