# Awesome Weather App

## The setup

I used Nextjs version 14.0.4 and node version 20.10.0

I used Neon as a Postregs sql database. Prisma serves as an ORM. The database schema is visible in `prisma/schema.prisma`. Prisma provides CRUD operations for the database. 

## Getting Started

To run the app locally, you need to install the dependencies and run the development server:
```bash
npm run dev
```

The .env file contains (the API_KEY is from OpenWeatherMap):
```
API_KEY=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
DATABASE_URL=
SHADOW_DATABASE_URL=
```

- To get an API_KEY, you need to create an account on https://openweathermap.org/ and create an API key.
- To get a GITHUB_ID and GITHUB_SECRET, you need to create a GitHub App. You can do this here: https://github.com/settings/apps
- You can generate a NEXTAUTH_SECRET here: https://generate-secret.vercel.app
- The DATABASE_URL and SHADOW_DATABASE_URL are the urls to your database. I used a free Neon database. You can create a project with 2 databases here: https://console.neon.tech/app

## Project

- I defined the API endpoints in app/api. It is handy for development purposes. To further decouple the client-server relationship, I would create a separate repository for the server (using express for example).

- I used next-auth to handle user authentication. Since 100% of my target audience has GitHub, I used github as the authentication provider. I would add more providers in a production environment.
    - Note: I used a callback in authOptions to add the GitHub userId to the session at login. The email was not as readily available. If I'd add other login providers, I look deeper into it so email is abailable in the session. It is available in the signIn callback profile variable. I would either store it from there or I'd look into the GitHub App permissions. 

- You can look up a city and get the weather. The data source is https://openweathermap.org/. I defined an APi wrapper in app/api/getweather/route.jsx. Searches are saved in the database. 

- Every logged in user can see their previous searches on their user page: '/user'. They reach it by clicking on the profile image symbol when they are logged in. 

- CRUD functionality is set up and every user search is saved for a logged in user. So a query through prisma can be made to count the number of searches per month. 

- The API endpoints can implement a rate limiter (using a count query). This is not yet implemented.

- app/admin/page.jsx is a page that displays all users and all searches. Currenly every user can access this page, for development purposes. In a production environment, I would add an "admin" role to the User and only allow admins to access this page.

- The data on the admin page can only be viewed, not edited.

- I would add a backend test by testing one API endpoint. Test if it handles different data correclty.
