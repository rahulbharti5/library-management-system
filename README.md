# Library Management System

## Overview

This project is a Library Management System connected to a MySQL server. Follow the steps below to set up your environment and run the application.

## Getting Started

### Prerequisites

Make sure you have the following software installed on your machine:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- MySQL: [Download and Install MySQL](https://dev.mysql.com/downloads/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rahulbharti5/Library-Management-System.git

2. Navigate to the project directory:
   ``` bash
   cd Library-Management-System
   
3. Install dependencies:
   ```bash
    npm install
   
4. Create a ".env.development" file in the root of the project and provide the necessary configurations. Example:
   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_DATABASE=library_database
   SECRET_KEY=mysecretkey
   
Adjust the values according to your MySQL server configuration and application needs.

### Running the Application
   Use nodemon to run the application. Nodemon automatically restarts the server when changes are detected.
    ```bash
    npm run dev
    
   Visit http://localhost:3000 in your browser to view the application.

### Additional Configuration
Update other configuration settings in the .env.development file as needed.
Feel free to explore and modify the code to suit your project requirements.

### Contributing
If you would like to contribute to this project, please follow the [contribution guidelines](https://github.com/github/docs/contribute)
.

### License
This project is licensed under the  [Apache License 2.0](https://github.com/rahulbharti5/Library-Management-System/blob/master/LICENSE)
.



 

