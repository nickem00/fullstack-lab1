# Lab 1 - Fullstack Course @ HKR

This project was created as a part of a lab in the Fullstack course (DA219B) at Kristianstad University.

## Purpose
The purpose of this lab was to create a RESTful API using Express and MongoDB as database, and connect it to a simple frontend built with HTML, CSS and JavaScript. The API handles basic CRUD operations for a collection of dishes.

## Technologies Used
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- HTML / CSS / JavaScript (Vanilla)

## Features
- View all dishes
- Add a new dish
- Modify an existing dish
- Delete a dish
- API also supporting fetch by name, but not implmented in frontend

## How to run the project locally
1. Clone the repository:
```console
git clone https://github.com/nickem00/fullstack-lab1.git
```
2. Install dependencies:
```console
npm install
```
3. Create a `.env` file in the root folder with the following:
```
CONNECTION_URL=<your-mongodb-connection-string>
PORT=5000
```
4. Start the server:
```
npm run dev
```
5. Open browser and go to:
[http://localhost:5000](http://localhost:5000)

## API Endpoints
| Method | Endpoint            | Description                    |
|--------|---------------------|--------------------------------|
| GET    | /api/dishes         | Get all dishes                 |
| GET    | /api/dishes/:name   | Get dish by name              |
| GET    | /api/dishes/id/:id  | Get dish by ID                |
| POST   | /api/dishes         | Create a new dish             |
| PUT    | /api/dishes/:id     | Update dish by ID            |
| DELETE | /api/dishes/:id     | Delete dish by ID            |
