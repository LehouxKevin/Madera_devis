# Front

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4.


## Install project 

Run `npm install` to install project and dependancies.

## Development server

Run `ng serve` for a dev server. Navigate to `https://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Https & ssl

Run `npm start` to run the pre-config script to enable ssl and get https
This use the generated key and crt in the ssl folder
If you need to exec the command manually, use this command line : `ng serve --ssl --ssl-cert C:\Users\kevin\IdeaProjects\Madera_devis\Front\ssl\domain.crt --ssl-key C:\Users\kevin\IdeaProjects\Madera_devis\Front\ssl\domain.key`

Navigate to `https://localhost:4200/`

You can also run `ng serve --ssl` which is well configured to use the key and the certificate from the ssl folder.

If you want your browser to thrust this certificate, you can add it in your `mmc` on your local machine.


## Users account examples 

Administrateur : `admin@admin.fr`
mdp:  `admin`

Commercial : `com@com.fr`
mdp:  `com`

Bureau d'études : `bd@bd.fr`
mdp : `bd`