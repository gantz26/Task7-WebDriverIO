# Summary

This repository contains auto tests for verifying login, actions with products and checkout on the [Swag Labs](https://www.saucedemo.com/) website.

## Requirements

The next requirements must be completed to run tests:
1. Install [Visual Studio code](https://code.visualstudio.com/)
2. Install [Node.js](https://nodejs.org/en)

## Steps to install, launch and creating a report

1. Firstly, make a copy of this repository:
```
git clone https://github.com/gantz26/Task7-WebDriverIO.git
```

2. Then, open this folder in Visual Studio Code and install all dependencies:
```
npm ci
```

3. Create .env file and add the username and the password there
```
VALID_USERNAME="<your_username>"
VALID_PASSWORD="<password>"
```

4. To run the tests use one of the next commands:
```
npm run wdio:run:chrome
npm run wdio:run:firefox
npm run wdio:run:chrome:headless
npm run wdio:run:firefox:headless
```

5. To generate and view a report:
```
npm run allure:generate
npm run allure:open
```