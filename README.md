# SweetDreams

The SweetDreams is an e-commerce app for sweets, with it you can order your favorite sweets, make the payment and receive them at your home in just a few clicks!

<img src="src/assets/sweetDreams-usage.gif" />

API available at https://sweet-dreams-api.herokuapp.com/

Try it out now at https://sweet-dreams-front.vercel.app/

## About

In this web application you will have a varied menu, with the most sublime sweets in the galaxy! Come in and fall in love with our delights! Below are the implemented features:

- Sign up
- Log in
- List full extract
- List products
- Search for products
- Add products to cart
- Change quantity of products
- Make payment
- Submit delivery address

## Technologies
The following tools and frameworks were used in the construction of the project:<br>
<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/styled-components%20-%2320232a.svg?&style=for-the-badge&color=b8679e&logo=styled-components&logoColor=%3a3a3a'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/axios%20-%2320232a.svg?&style=for-the-badge&color=informational'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/react-app%20-%2320232a.svg?&style=for-the-badge&color=60ddf9&logo=react&logoColor=%2361DAFB"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/react_route%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/mongobd%20-%2320232a.svg?&style=for-the-badge&color=yellowgreen&logo=mongodb&logoColor=%2361DAFB%27'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/nodejs%20-%2320232a.svg?&style=for-the-badge&color=blue&logo=javascript&logoColor=%2361DAFB%27'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/express%20-%2320232a.svg?&style=for-the-badge&color=green&logo=express&logoColor=%2361DAFB%27'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/sweetalert2%20-%2320232a.svg?&style=for-the-badge&color=important&logo=sweetalert2&logoColor=%2361DAFB%27'>
  
</p>

## How to run

1. Clone this repository
2. Install back-end dependencies
```bash
npm i
```
3.Create an environment variables file in the project root (.env) and configure a variable with the name 'PORT' that receives the port you want to use, and another called 'MONGO_URI' with the url of the bank, Example:
```bash
MONGO_URI = mongodb://localhost/:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=ApiSweetDreams
PORT=5000
```
4. Run the back-end with
```bash
npm start or node app.js
```
5. Clone the front-end repository at https://github.com/kethllen/MyWallet_Fronf
6. Follow instructions to run back-end at https://github.com/kethllen/MyWallet_Fronf
