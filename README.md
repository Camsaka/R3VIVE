This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
This project uses tailwindcss and flow-bite components for styling.

## Web3 
This project interact with a smrt contract at this address 0xEcBa8C709A7bc96e77561494b8F9A62576277541
To interact with blockchain and web3 features, this project uses wagmi stuff as web3modal, hooks and actions : (https://wagmi.sh/, https://docs.walletconnect.com/web3modal/about)
In the .env.local file you should implement the same address without "0x" caracter at the beginning to respect wagmi hooks adn actions specifications

## Deploy on Vercel

This project actual version is deploy on vercel, try it yourself at : https://r3vive.vercel.app/

## Prisma
```
vercel link
vercel env pull .env.development.local 
prisma generate (when changing the schema)
dotenv -e .env.local (or .env.development.local) -- npx prisma db push (to synchronize vercel db with schema)
```