# Albins Songs

A songbook app for DaTe/KK songs built with Gatsby using Contentful as a headless CMS.

## Getting started

### Prerequisites

This project requires [Docker](https://www.docker.com) and [Docker Compose](https://docs.docker.com/compose/)

### Installing

To build the Docker image use:

```
docker-compose build
```

if you are getting some redux errors during build use:

```
sudo rm -r ./cache
```

To run the project use:

```
docker-compose up
```

The project should now be running in development mode at:

```
localhost:8000
```

## Deployment

The project is currently continously deployed to Netlify
You can build the project by changing the command in .entrypoint.sh

```
gatsby develop -H 0.0.0.0
```

to

```
gatsby build
```

and then serve the static files however you like
