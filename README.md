# MERN Login Authentication with JWT

This is a minimal full-stack **MERN** app with authentication using JSON web tokens and PassportJS. 

Key Technologies used:
- `react`, `react router`, `material-ui` for front-end
- `node`, `express`, `passport`, `jsonwebtoken` for server-side and authentication
- `mongo`, `mongoose` for the database
- `redux` for application state management between components

## Quick Start
```javascript
// Install dependencies for server & client
npm install && npm run client-install

// Run client & server with concurrently
npm run dev

// Server will run on http://localhost:3001 and client on http://localhost:3000
```

## Configuration
Don't forget to add your own `mongoURI` from your mLab database instance, and your JWT secret `key` in `config/keys.js`.
```javascript
module.exports = {
    mongoURI: '<your_mongo_uri_here>',
    secretOrKey: '<your_secret>'
}
```

And remove the comments in `server.js` and `routes/api/users.js` for the above object.
