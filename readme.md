## Deployed

<a href="https://reactjs.org/" title="React"><img src="https://drive.google.com/uc?export=view&id=154DyzBtGMP4PjB_6h6zBQUMlUOJoZexG" alt="React" width="21px" height="21px"></a>/Link: https://www.leakit.netlify.app

## Screenshots

![App Screenshot](https://drive.google.com/uc?export=view&id=1152Y8LbEatcQ_qr557lunyxjwleH9AFw)

## Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/7af3bb67-2e3f-4d2d-ad0c-a29c43b1a12b/deploy-status)](https://app.netlify.com/sites/leakit/deploys)

## Tech Stack

**Client:** <a href="https://reactjs.org/" title="React"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React" width="21px" height="21px"></a>
<a href="https://redux.js.org/" title="Redux"><img src="https://github.com/get-icon/geticon/raw/master/icons/redux.svg" alt="Redux" width="21px" height="21px"></a>
<a href="https://redux-toolkit.js.org/" title="RTK-query"><img src="https://github.com/get-icon/geticon/raw/master/icons/redux.svg" alt="RTK-query" width="21px" height="21px"></a>
<a href="https://tailwindcss.com/" title="Tailwind CSS"><img src="https://github.com/get-icon/geticon/raw/master/icons/tailwindcss-icon.svg" alt="Tailwind CSS" width="21px" height="21px"></a>

**Server:** <a href="https://nodejs.org/" title="Node.js"><img src="https://github.com/get-icon/geticon/raw/master/icons/nodejs-icon.svg" alt="Node.js" width="21px" height="21px"></a>
<a href="https://expressjs.com/" title="Express"><img src="https://github.com/get-icon/geticon/raw/master/icons/express.svg" alt="Express" width="21px" height="21px"></a>
<a href="https://mongoosejs.com/" title="Mongoose"><img src="https://github.com/get-icon/geticon/raw/master/icons/mongoose.svg" alt="Mongoose" width="21px" height="21px"></a>

# Leakit (Anonymous forum app)

- This is an anonymous forum application created in MERN stack.
- It's inspired by 4chan forum application which initially was anonymous
- It can be used to confess.express.chat anonymously.
- Only IP of users are stored nothing else.

# Flow

- Board- There are boards, boards encapsulates all other objects like threads and replies.
- Person can create a board and reply to threads or other replies

# Authentication Flow:

- No authentication needed
- Just a session is created for each user who visits inside mongdo db database using mongodb store package from npm.

## API Reference

There are 3 core/base routes:

- Board route:

```http
/api/boards
```

- Reply route:

```http
/api/reply
```

- Thread route:

```http
/api/thread
```

---

- SUB ROUTES FOR /boards :-

```http
GET /
GET /board
POST /create
```

- SUB ROUTES FOR /reply :-

```http
GET /replies
GET /childReplies
GET /thread
POST /create
```

- SUB ROUTES FOR /thread :-

```http
GET /threads
GET /thread
GET /threads/board
POST /create
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/unreal0901/anonymous_forum.git
```

For running the project locally,
first clone the project using git clone

- Project has 2 sections

1. frontend directory
2. backend directory

requirement:

- node and npm should be installed

Go to the project directory

```bash
   cd backend
 npm i
 npm run start

cd ..
cd frontend
npm i
npm run start
```

With this both backend and frontend will be running locally in development environment.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Frontend:

- `REACT_APP_BASE_URL`="http://localhost:8000" (replace with your backend url)

### Backend:

- `NODE_ENV=development`
- `DEPLOY_STAGE`
- `MONGODB_USERNAME=(any username for mongodb)`
- `MONGODB_PASSWORD=(any pass)`
- `MONGODB_DATABASE_NAME=(Enter any database name)`
- `MONGODB_SESSION_DATABASE_NAME`
- `SESSION_SECRET`
