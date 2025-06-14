# Monolithic React Fastify App

This project is a monolithic application that combines a React frontend with a Fastify backend. It serves as a full-stack application template, allowing for easy development and deployment.

## Project Structure

```
monolithic-react-fastify-app
├── src
│   ├── client
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── components
│   │       └── ExampleComponent.jsx
│   ├── server
│   │   ├── index.js
│   │   └── routes
│   │       └── api.js
│   └── shared
│       └── utils.js
├── public
│   └── index.html
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd monolithic-react-fastify-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

### Running the Application

To run both the client and server, use the following command:

```
npm start
```

This will start the Fastify server and serve the React application.

### Building the Client

To build the client for production, run:

```
npm run build
```

This will create an optimized build of the React application in the `build` directory.

### API Endpoints

The Fastify server exposes various API endpoints defined in `src/server/routes/api.js`. You can access these endpoints to interact with the backend.

### Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements.

### License

This project is licensed under the MIT License.