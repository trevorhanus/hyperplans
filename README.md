## HyperPlans

This is an app that generates floor plans from given constraints.

Once running you can Sign In with your email address and any password. A new user for an unrecognized email will be created on first sign in. Once signed in you will be able to navigate to the Generate a Floor Plan page. Here you can fill out the form to generate a new floor plan. On success, you will be taken back to the list page. Click on any plan to go to the viewer page. On the view page, you can see the floor plan. You can also zoom and pan on this page to inspect different parts of the plan.

## Running locally

First install dependencies:

```
npm install
```

Create an `.env` file in the root:

```
DATABASE_URL="the_db_url"
NEXTAUTH_URL="http://localhost:3000"
```

Run the development server:

```
npm run dev
```

Check it out at `http://localhost:3000`

## Deployments

Deployments are kicked off automatically via Vercel when we push the `main` branch to Github.
