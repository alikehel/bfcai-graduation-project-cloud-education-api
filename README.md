# Cloud Education

> A Complete Education System on the cloud that aims to be a replacement for the traditional offline school or university education.

This repository contains the backend API for the Online University Web Application. The application provides various features for multiple universities and schools, including user management, course management, exams, chatting, leaderboard, and more.

## Features

- Multiple universities and schools can use the application and create their own instances.
- Each organization has its own admin, teachers, and students.
- Courses, exams, chatting, and leaderboard are available for each organization.
- Users have individual profile pages.
- Course reviews are scanned for sentiment analysis and toxic/bad words using AI.
- Comments sections are scanned for bad words using AI.
- Essay questions in exams are graded using AI by comparing student answers with model answers.
- Course content is summarized using AI.
- Students receive notifications when exams are graded or flagged for bad words.
- Leaderboard points are updated when students submit exams.
- Duration of exams is enforced, preventing entry after the time limit.

## Links

- [Cloud Education Demo - YouTube](https://youtube.com/playlist?list=PLzrcxuCFsyhCcLVWrTsY1RooZffVfrVHj)
- [Swagger API Docs](https://cloud-education-api.up.railway.app/api-docs-dark-theme/)
- [Cloud Education API URL](https://cloud-education-api.up.railway.app/)
- [Cloud Education URL](https://www.cloud-education.systems/) or [Cloud Education URL](https://lecture-dashboard.vercel.app/)
- [Front-End Repo](https://github.com/wagihmohamed/lecture-dashboard/)

## Technology Stack

The backend API is built using the following technologies and modules:

- Node.js - JavaScript runtime environment.
- Express - Web application framework for Node.js.
- TypeScript - Static typing for JavaScript.
- PostgreSQL - Relational database.
- Prisma - ORM for database access and modeling.
- JWT - JSON Web Tokens for authentication.
- Bcrypt - Password hashing.
- Zod - Data validation.
- CORS - Enable CORS for API access.
- Helmet - Security middleware.
- Swagger - API documentation.
- ESLint - Linter.
- Prettier - Code formatter.

## Getting Started

To set up the development environment for the backend API, follow these steps:

### Prerequisites

- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/en/)

### Installation Steps

1. Clone the repository from GitHub to your local machine:

```
git clone https://github.com/alikehel/bfcai-graduation-project-cloud-education-api.git
```

2. Navigate into the project directory: 

```
cd bfcai-graduation-project-cloud-education-api
```

3. Install dependencies:

```
npm install
```

4. Rename `.example.env` to `.env` and update the environment variables to match your local setup:

```
PORT=
NODE_ENV=""
JWT_SECRET=""
JWT_EXPIRES_IN=""
SECRET=""
DATABASE_URL=""
AWS_S3_BUCKET=""
AWS_PROFILE=""
AWS_REGION=""
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
```

5. Run the Postgres database if not already running. 

6. Create the database specified in `.env` if it doesn't exist:

```
createdb cloud-education
```

7. Run database migrations if the project has them to setup schema.

8. Start the Node.js application:

```
npm start
```

9. The API should now be running on `http://localhost:3000` or the port defined in code.

10. Test API endpoints.

## Development Roadmap

The project is currently under development, and the following tasks are being worked on:

- [ ] Improve Error Handling
- [ ] Improve Input Validation Messages
- [ ] Improve the UI and the Landing Page
- [ ] Improve the Database Design
- [ ] Improve API Swagger Documentations
- [ ] Improve API Security Best Practices
- [ ] Implement Pricing System
- [ ] Implement Jest Testing
- [ ] Implement JWT Refresh Tokens
- [ ] Implement CI/CD with CircleCI / GitHub Actions
- [ ] Implement the Chat System
- [ ] Implement API Logging for Better Debugging
- [ ] Refactor to Cleaner Code
- [ ] Integrate with AWS services
- [ ] Move from Prisma to Drizzle-ORM for better performence and less abstractions
- [ ] API versioning and Caching
- [ ] Try artillery or k6 for load testing

## Contributing

### Non-substantive changes

For any minor updates to the curriculum, such as fixing broken URLs, correcting spelling or syntax errors, and other non-substantive issues, we welcome you to submit a pull request. You can do this by following the guidelines in [pull request guide](https://www.freecodecamp.org/news/how-to-make-your-first-pull-request-on-github-3/).

### Substantive changes

If you have specific and substantial feedback or concerns about the content, we encourage you to open an issue. Please refer to [open an issue](https://help.github.com/articles/creating-an-issue/) for assistance.

## License

This project is licensed under the [MIT License](LICENSE).
