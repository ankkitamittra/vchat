# ChatBox

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.

## Run the application
Run `npm install ` and then `ng build && node ./bin/www`, 
use this if `ng` gives error before using ng command -> ` alias ng="./node_modules/@angular/cli/bin/ng" `

## MongoDb setup
Download mongodb
Then create a folder mongodb/data/db

go to location download mongodb and then go to bin open terminal
Run ` ./mongod --dbpath <mongodbpath> `
eg. -> ` ./mongod --dbpath /Users/ankmitra/Documents/PROJECT_WORK/Mongodb/ `

Then Run ` ./mongo `
mongo prompt opens then setup the db and collection for application
` use vchatdb `
` db `
` db.createCollection("userAccountDetails") `
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
