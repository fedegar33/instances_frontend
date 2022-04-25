# instances_demo_frontend_fg

## Summary

The app consists of two pages(routes).
A login form is displayed in the main page (/). If the user enter valid credentials then its redirected to /instances page
and a table of instances is displayed. Table can be sorted and paginated as requested.
The user can logout and is redirected to the main page.
When an unauthorized user tries to visit /instanes page it will be redirected to the login page.
When any user tries to enter a non existing page a "Not found" page will be displayed.

I created a very simple REST Node backend which exposes two methods:

- /login (POST) which receives a username and password as the body. Returns a JWT token if the user is valid.
- /ec2instances which returns a list of EC2 instances if the proper JWT token is sent through an "Authorization" header. If JWT is invalid a 403 status code is returned.

## Deployed app

Go to: https://instance-demo-frontend-fg.herokuapp.com/

Valid users that can login:

- Username: test1@sample.com Password: 1234
- Username: test2@sample.com Password: 4567

## Backend info

- Backend is hosted here: https://instances-demo-fg.herokuapp.com
- Backend repo is here: https://github.com/fedegar33/instances_backend

## Stack

I used the following tools:

- React and create-react-app
- Typescript
- Material UI with styled components (used the sx prop a lot)
- Jotai, to persiste the authenticated user data. I used atomWithStorage to persist the user auth token in local storage. Probably not the best approach but just for demo purposes.
- Jest, react-testing-library and msw for unit testing.
- Cypress for integration testing.
- NodeJS, Express and JWT for the backend.

## Available Scripts

Basic create-react-app scripts like: **npm start**, **npm test**, **npm run build** & **npm run eject**. I addd an **npm run e2e** command.

## Tests

There are some unit tests (npm test) and a couple of integration tests (npm e2e).
I dind't have time to create more tests but at least the login and the table is unit tested.
Login and Logout funcionalities are covered by e2e testing(Cypress).
