# `Full Stack App`!

Is a system that includes logging in and registering users as a standard or editor user,

Signing in with a standard user allows you to follow after users and like posts,

Signing in with a editor user allows you to create new posts. and CRUD them.

If user signin with same email 3 times with fake password the user will blok to 24 hours.

### See Deployment https://fs-front-z2fz.onrender.com/

## Server-Side

Using `node.js` && `express` to building the server.

Using `mongo-db` && `mongoose` to store the data and building controllers.

Using `Json Web Token` to authenticate users.

### Run in terminal :

```
cd server
```

```
npm i
```
### Change the ".env.example" file to ".env" and enter the various variables.
```
npm run dev
```


## Client-Side

The client-side based on `React` framework.

Using `react-router-dom` for building router and navigate between other paths.

#### You can follow the structure folders in /src/pages to understand the router structure,

Using `redux` for provide globaly states to auth and theme.

### Run in terminal :

```
cd front
```

```
npm i
```
### Change the ".env.example" file to ".env" and enter the various variables.

```
npm start
```

Now it's all ready to go!

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
