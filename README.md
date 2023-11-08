# Competitive E-Commerce ORM

## Project Overview

This project is an Object-Relational Mapping (ORM) solution for e-commerce websites that require a back-end database. It allows for efficient manipulation and querying of data in an e-commerce database using JavaScript and Sequelize.

## Features

- Create, read, update, and delete (CRUD) operations for products, categories, and tags.
- Data associations between products and tags through a ProductTag join.
- Configurable connection to MySQL database using Sequelize.
- Easy-to-use API routes for front-end integration.

## Installation

To get started with this project, clone the repository and install dependencies:

```
bash
git clone https://github.com/your-username/competitive_ecommerce_orm.git
cd competitive_ecommerce_orm
npm install
```

## Setup

1. Create a `.env` file in the root directory with the following details:

```
env
DB_NAME='your_database_name'
DB_USER='your_database_username'
DB_PW='your_database_password'
```

2. Run the `schema.sql` in your MySQL Workbench to create the database.
3. Use `npm start` to initiate the server after configuring your database.

## Usage

After setting up the project and database, you can use the provided API routes to perform CRUD operations on the database:

- `GET /api/categories` - Retrieve all categories.
- `POST /api/categories` - Create a new category.
- `PUT /api/categories/:id` - Update a category by its `id`.
- ... (other routes)

## License

This project is free software under the terms of the Unlicense. See the [LICENSE](LICENSE) file for more information.
