# Back


## Install project 

Run `composer install` to install project and dependancies.

## Development server

Run `php bin/console server:start` for a dev server which will not run in background. Run `php bin/console server:run` if you want the server to run in the background.
Navigate to `https://localhost:8000/` to access your backend.

## Https & ssl

The back in working with https and ssl.

## Database 

To create the database, ensure you have well modify the .env or in the .env.local file

This line is the line you need to modify. The serverVersion isn't mandatory, you can't remove it.
DATABASE_URL="mysql://root:@127.0.0.1:3306/madera_db?serverVersion=mariadb-10.4.17"

Here, the name of the database will be `madera_db`

To create the database : 

`php bin/console doctrine:database:create`

And then you'll need to apply all the migrations by doing :

`php bin/console doctrine:migrations:migrate`

If you encounter some issue with the migration, try to uncomment this line `auto_commit: false` in the file `Back/config/packages/doctrine.yaml` and then try to relunch the command

We gave you in the files a dump of our database which is fill with tests values which is name `madera_db.sql`.

## Api platform

Since your backend server in launch, you can access all the api routes in this url : `https://localhost:8000/api`