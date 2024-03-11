# LinkUp - Social Site (Backend)
This repository contains the backend code for a server, serving as the backend of a web application. It utilizes Node.js and Express.js for server-side functionality, MongoDB with Mongoose as the database, and various middleware and utilities to enhance the development experience.

##  About Me
###  Hi, I'm Amrish! 👋
#### I'm a full stack developer[MERN]...

[![portfolio](https://img.shields.io/badge/my_portfolio-fb923c?style=for-the-badge&logo&logoColor=white)](https://www.amrishpratapsingh.com/) [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/amrishkush/)

## Frontend Part 
Click to See Code!
[Frontend Code](https://github.com/Amrishkush/linkup-social-site-client)

## Features

- Controllers
- Multer to handle upload Images
- Encrypting of Passoword
- Token Generation (Refresh and Access)
- Cloudinary for Image uploads. 

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Amrishkush/linkup-social-site-server

   ```

2. Navigate to the project directory:

   ```bash
   cd linkup-social-site-server

   ```

3. Install dependencies:

   ```bash
   npm install

   ```

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Bcrypt for password hashing
- Cloudinary for cloud-based image storage
- Cookie-parser for handling cookies
- Cors for Cross-Origin Resource Sharing
- Dotenv for managing environment variables
- Jsonwebtoken for authentication
- Multer for handling file uploads
- Nodemon for development server auto-restart
- Prettier for code formatting

## Project Structure

 - **public/**
 - **src/**
    - **controllers/**
        - user.controller.js
    - **db/**
        - index.js
    - **middlewares/**
        - auth.middleware.js
        - multer.middleware.js
    - **models/**
        - user.model.js
    - **routes/**
        - user.routes.js
    - **utils/**
        - ApiError.js
        - ApiResponse.js
        - asyncHandler.js
        - cloudinary.js
    - app.js
    - constants.js
    - index.js
    


## Demo

Click to Visit!
[LinkUp](https://linkup.amrishpratapsingh.com)