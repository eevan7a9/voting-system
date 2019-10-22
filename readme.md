# Survey Voting System

> Laravel vue js application that enables users to create surveys and allow users to vote. a method used for collecting data on certain topics that gets you the insights you need.

## Backend Quick Start

> inside voting-backend/

```
copy .env.example
paste as .env
```

```


# Install Dependencies
composer install

# Run Migrations
php artisan migrate

# Add database dummies
php artisan db:seed

# Install Laravel Passport
php  artisan passport:install

# key
php artisan key:generate
```

#### Add database connection and info

    ```
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=database_name
     DB_USERNAME=root
     DB_PASSWORD=database_password
    ```

\*\* Frontend Quick start

```
# install npm dependencies
 npm install

# set base url of you're backend
    src/store.js
    axios.defaults.baseURL = "http://localhost:8000/api/";
```
