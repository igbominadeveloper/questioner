# Questioner
Crowd-sourcing questions for meetups
[![Build Status](https://travis-ci.com/igbominadeveloper/questioner.svg?branch=develop)](https://travis-ci.com/igbominadeveloper/questioner) [![Coverage Status](https://coveralls.io/repos/github/igbominadeveloper/questioner/badge.svg?branch=develop)](https://coveralls.io/github/igbominadeveloper/questioner?branch=develop)

Questioner is an API driven application that crowd-sources questions and comments for meetups. It uses a voting algorithm that calculates the importance of a question asked under a meetup so the organizers can attend to them in order of importance and factor it into the planning of the event
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
Node and Npm must be installed on your machine.

### Installing
Clone the Repository
```
run git clone github/igbominadeveloper/questioner
```

CD into the questioner project directory you just cloned

```
run cd path/to/questioner 
```

Install project dependencies
```
run npm install
```

- Create a .env file following the example stated in the .env.example file in the project directory
- Start any Database of your choice and put the connection string into the .env file you created

Run Migrations
```
In your terminal, npm run migrate

```

Now start the development server
```
run npm start and the Application is running on localhost:3000
```

## Running the tests


```
Open your terminal and run the command - npm run test
```


```
Authentication test
```

## Deployment

```
Run npm-heroku-deploy
```
## Testing Tools

* [Mocha](https://mochajs.org/) - Test framework
* [Expect](https://github.com/Automattic/expect.js/) - Assertion Library


## Built With

* [Node](http://nodejs.org/) - Javascript runtime environment used
* [Express](https://expressjs.com/) - Web Framework
* [Eslint](https://eslint.org/): [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) - Style Guide


## Author

* **Favour Afolayan** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Adewale Aladeusi
* Jeffrey Way
