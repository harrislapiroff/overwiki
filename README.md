Overwiki
--------

One wiki to rule them all.

Development Installation
========================

These instructions assume that you have [Python][], [pip][], and
[virtualenvwrapper][] installed.

[Python 3]: https://www.python.org/
[pip]: https://pip.pypa.io/
[virtualenvwrapper]: https://virtualenvwrapper.readthedocs.io/

**Note:** If you are not sure where Python 3 is installed on your machine, try
using `which python3` to locate it.

```bash
# Clone the repo
git clone https://github.com/harrislapiroff/overwiki
cd overwiki

# Make a virtual environment
mkvirtualenv overwiki -p /path/to/python3

# Install the requirements
pip install -r requirements.txt
npm install

# Create the database
./manage.py migrate
```

Configuration
=============

Overwiki requires some configuration variables be set. We recommend you create
a `.env` file and set these variables on your own dev machine in that file,
like so:

```bash
workon overwiki
SECRET_KEY="SECRET"  # This is required. Set to anything.
DATABASE_URL="postgres://root:password@server/dbname"  # Default: sqlite:///db.sqlite3
```

You can now use `source .env` to properly activate your environment or use
a utility like [autoenv][].

[autoenv]: https://github.com/kennethreitz/autoenv

Development Server
==================

You will need multiple shells to run the server: one for Django and one for
Webpack.

Django:

```bash
# Run the server
./manage.py runserver
```

Webpack:

```bash
npm run start
```

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
