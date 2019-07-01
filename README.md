# MERN Login Authentication with JWT

This is a minimal full-stack **MERN** app with authentication using JSON web tokens and PassportJS. 

Click [here](https://mern-login-auth.herokuapp.com/) to checkout deployed application via Heroku.


## Key Technologies:
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
And remove the comments in `server.js`, `/config/passport.js` and `routes/api/users.js` for the above `mongoURI` and 'secretOrKey` properties when using `config/keys.js`. 


### Tutorial/Medium Series
Huge thanks to the tutorial series by Rishi Prasad on Medium!
- [Build a Login/Auth App with the MERN Stack - Part 1 (Backend)](https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669)
- [Build a Login/Auth App with the MERN Stack - Part 2 (Frontend & Redux Setup)](https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82)
- [Build a Login/Auth App with the MERN Stack - Part 3 (Linking Redux with React Components)](https://blog.bitsrc.io/build-a-login-auth-app-with-the-mern-stack-part-3-react-components-88190f8db718)
