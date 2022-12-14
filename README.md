# Drops

Wanting to learn a new technology and getting overwhelmed because of so many resources lying around the internet and not knowing where to start is a common issue. That is why Drops is here. It is a web application that allows a user to create collection of curated resources which anyone can access to accelerate their learnings.

## Usage

Deployed link -> https://drops-mauve.vercel.app/

Demo video -> Coming soon!!!

**Note** -> On adding some URL the page might not show any image, title or description. It is because the metadata of the given URL cannot be scraped. So adding such URL is not recommended. A new feature of adding custom data to counter this will be coming soon.

## Features

#### Current Features

- User Authentication
- Create Collections
- Upvote Collections
- Edit/Delete Resources
- Add/Delete Resources to Collections

## Screenshots

#### Register Page 
![Register](https://user-images.githubusercontent.com/65884232/207628278-ab2d3097-bef0-4678-abc9-8f0bafd6a097.png)

#### Login Page
![Login](https://user-images.githubusercontent.com/65884232/207628592-0b698647-1a06-43e7-b0d4-0ae08c31f351.png)

#### Dashboard Page
![Dashboard](https://user-images.githubusercontent.com/65884232/207628633-bee2810e-8d00-4b67-a0d7-46e16960c12e.png)

#### Single Collection Page
![SinglePage](https://user-images.githubusercontent.com/65884232/207628657-de6365f1-d833-46c9-9a28-ddb19723775b.png)

#### Future Plans

- Library Page for user to view all their collections
- Bookmark Collections Feature
- About page for user profile details
- Image upload in user registration
- UI Improvements

## Tech Stack

#### Client

- [Typescript](https://www.typescriptlang.org/) - TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale
- [Next js](https://nextjs.org) - Next.js is an open-source web development framework created by Vercel enabling React-based web applications
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework that can be composed to build any design, directly in your markup.

#### Server

- [NodeJS](https://nodejs.org/en/) - Node.js is an open-source, cross-platform, back-end JavaScript runtime environment
- [Express](https://expressjs.com/) - Express is a fast, unopinionated, minimalist web framework for Node.js
- [MongoDB Atlas](https://www.mongodb.com/atlas/database) - MongoDB Atlas is a fully-managed cloud database that handles all the complexity of deploying
- [HTML metadata parser](https://www.npmjs.com/package/html-metadata-parser) - Html Metadata scraper and parser for Node.js

## Contributing

#### Client

Change into the client folder : `cd client`
Install dependencies : `npm install`
Start the client : `npm run dev`

#### Server

Change into the server folder : `cd server`
Install dependencies : `npm install`
Start the server : `node index.js`