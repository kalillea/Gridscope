# **GRIDSCOPE**

Gridscope is a dashboard built with **Angular**, **Material UI**, and **Chart.js**, designed for managing and visualizing the state of energy network components such as meters, batteries, transformers, and chargers.

The project consists of two separate repositories:

* **Gridscope**. Angular frontend application (this repo).
* **GridScope-api**. Node.js/Express REST API providing component and history data.


## Stack

### **Frontend**

* Angular (Typescript)
* Angular Material UI
* Chart.js

### **Backend** (in GridScope-api repository)

* Node.js and Express

The API follows RESTful design principles.


## Project Structure (Frontend)

```
src/
 ├─ app/
 │   ├─ components/
 │   │   ├─ component-list/        # Table of components
 │   │   ├─ history-chart/         # Chart.js component
 │   │   ├─ toolbar/               # Header bar
 │   ├─ models/
 │   │   ├─ energy-component.model.ts
 │   ├─ services/
 │   │   ├─ energy-component.service.ts
 │   │   ├─ history.service.ts
 │   ├─ app.ts                     # Root component
 │   ├─ app.routes.ts
 │   ├─ app.config.ts
 └─ index.html
```

---

## Initialize

### 1. Clone the frontend repository

```bash
git clone https://github.com/your-user/Gridscope.git
cd Gridscope
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the Angular development server

```bash
ng serve
```

---

## Backend Setup (GridScope-API)

Clone the API repository:

```bash
git clone https://github.com/your-user/Gridscope-api.git
cd Gridscope-api
```

Install dependencies:

```bash
npm install
```

Run the API:

```bash
npm run dev
```

By default, it listens on:

```
http://localhost:3000
```

---

## API Endpoints (from GridScope-API)

### **Components**

| Method | Endpoint                       | Description              |
| ------ | ------------------------------ | ------------------------ |
| GET    | `/api/components?offset&limit` | Get paginated components |
| GET    | `/api/components/:id`          | Get component by ID      |
| POST   | `/api/components`              | Create new component     |
| PUT    | `/api/components/:id`          | Update component         |
| DELETE | `/api/components/:id`          | Delete component         |

### **History**

| Method | Endpoint           | Description               |
| ------ | ------------------ | ------------------------- |
| GET    | `/api/history/:id` | Get history for component |

History is randomly generated per component at server startup and provides 50 timestamp/value pairs per component.

