Overwiki
--------

One wiki to rule them all.

Development
===========

### Installation

The quickest way to get up and running is to use our Docker configuration. First ensure that you have [Docker installed and running][docker].

Then, from a shell in the `overwiki` top level directory, run

```bash
docker-compose up
```

This will create and build the three containers necessary for this application:

1. `postgres`: PostgreSQL
2. `webpack`: Node/Webpack
3. `web`: Python/Django

Once all three containers are running, you can access the application from your web browser at http://localhost:8000/

[docker]: https://www.docker.com/community-edition

### Running Commands

Some common tasks require running commands from inside the docker containers. Provided are a couple examples of how to do this.

Installing a new node dependency:

```bash
docker-compose exec webpack npm install react --save
```

Creating a new database migration:

```bash
docker-compose exec web ./manage.py makemigrations overwiki
```

Dropping into a Django shell:

```bash
docker-compose exec web ./manage.py shell
```

### Advanced Development Environments

It is possible not to use Docker or to use Docker only for _some_ of the application's required services, though documentation for this is not (yet) provided here.

### Connecting to the Database

The database is a PostgreSQL database that (presuming you are using the Docker setup) will be available with these connection details:

* **Server:** `localhost`
* **Port:** `15432`
* **User:** `overwiki`
* **Password:** `onewikitorulethem`
* **Database:** `overwiki`

Deployment
==========

Overwiki can be deployed to Dokku or Heroku using git:

```bash
git remote add dokku serverurl
git push dokku master
```

Refer to the [Dokku][] or [Heroku][] documentation for further information.

[Dokku]: http://dokku.viewdocs.io/
[Heroku]: https://devcenter.heroku.com/
