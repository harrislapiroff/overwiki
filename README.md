Overwiki
--------

One wiki to rule them all.

Development Installation
========================

These instructions assume that you have [Python][], [pip][], and [virtualenvwrapper][] installed.

[Python]: https://www.python.org/
[pip]: https://pip.pypa.io/
[virtualenvwrapper]: https://virtualenvwrapper.readthedocs.io/

```bash
# Clone the repo
git clone https://github.com/harrislapiroff/overwiki
cd overwiki

# Make a virtual environment
mkvirtualenv overwiki

# Install the requirements
pip install -r requirements.txt

# Create the database
./manage.py migrate
```

Development Server
==================

```bash
# Activate the virtual environment
workon overwiki

# Run the server
./manage.py runserver
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
