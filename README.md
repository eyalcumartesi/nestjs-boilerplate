<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>


<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
<a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>


Description

Nest framework TypeScript starter repository. This boilerplate includes a setup.sh script that helps streamline the initial project setup, removing the original repository and adding your own remote repository, as well as setting up other project dependencies.

Project setup

Cloning the Repository

To get started with this boilerplate, clone the repository and run the setup script:

# Clone the repository
git clone https://github.com/eyalcumartesi/nestjs-boilerplate.git your-new-project-name

# Navigate to the project folder
cd your-new-project-name

# Run the setup script
./setup.sh

What the Setup Script Does

	1.	Install Dependencies: Installs all necessary npm dependencies.
	2.	Remove Original Remote: Automatically removes the existing origin Git remote.
	3.	Add New Remote: Prompts you to add a new Git remote for your own repository.
	4.	Environment Setup: Copies the .env.example file to .env (if .env.example exists).
	5.	Run Migrations (Optional): Offers to run database migrations immediately after setup.

Manual Setup (if needed)

If you prefer not to use the setup script, you can follow these steps:

# Install dependencies
npm install

# Add your new Git remote
git remote remove origin
git remote add origin <your-new-repo-url>

Compile and run the project

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

Run tests

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

Resources

Check out these resources for more information on working with NestJS:

	•	NestJS Documentation
	•	Official NestJS Courses
	•	Discord Channel
	•	NestJS Devtools
	•	Enterprise Support
	•	Follow us on X and LinkedIn
	•	NestJS Jobs Board

Stay in touch

	•	Author - Kamil Myśliwiec
	•	Website - https://nestjs.com
	•	Twitter - @nestframework

License

Nest is MIT licensed.

