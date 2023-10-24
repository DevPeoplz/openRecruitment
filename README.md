This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

After clone the repo:

### Run project

- Install dependencies:

```bash

npm i

```

- Create .env.local file and add the following variables:

```bash
NEXT_PUBLIC_URL_PROTOCOL=
NEXT_PUBLIC_VERCEL_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
DB_HOST=
DB_HOST_PORT=
DB_CONTAINER_PORT=
DB_POSTGRES_USER=
DB_POSTGRES_PASSWORD=
DB_POSTGRES_DB=
POSTGRES_PRISMA_URL=postgresql://${DB_POSTGRES_USER}:${DB_POSTGRES_PASSWORD}@${DB_HOST}:${DB_HOST_PORT}/${DB_POSTGRES_DB}
POSTGRES_URL_NON_POOLING=${POSTGRES_PRISMA_URL}
NEXTAUTH_URL=${NEXT_PUBLIC_URL_PROTOCOL}://${NEXT_PUBLIC_VERCEL_URL}
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=
```

- Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Open database

- start container services (you need have docker installed)

```bash
docker-compose  --env-file .env.local up -d
```

- generate Prisma client

```bash
npx prisma generate
```

- run migrations

```bash
  npx prisma migrate dev
```

or (Using .env.local)

```bash
  npm run prismaMigrate
```

- open prisma studio

```bash
  npx prisma studio
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
