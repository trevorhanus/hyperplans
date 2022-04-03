## HyperPlans

This is an app that generates floor plans from constraints.

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
