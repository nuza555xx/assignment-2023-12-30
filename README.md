# CMS
```mermaid
erDiagram
  Category {
    _id ObjectID
    label String
    slug String "unique"
    sequence Number
  }

  Hashtag {
    _id ObjectID
    label String
    slug String "unique"
    sequence Number
  }

 Engagement {
    _id ObjectID
    action ActionBy
    ip String
    refId ObjectID
  }

  News {
    _id ObjectID
    title String
    content String
    coverImage ImageResolution
    sequence Number
    category String
    hashtags String[]
    galleries ImageResolution[]
    metadata Meta
    createdBy String
    updatedBy String
  }

  Engagement }|--|{ News : contains
  Category }|--|{ News : contains
  Hashtag }|--|{ News : contains


```

## Installation

```bash
$ npm install
```

## Environment with docker swarms

```bash
# docker build image cms service
$ docker build -t cms:latest  -f Dockerfile .
```


```bash
# source for service
$ docker-compose up -d
```

## Script mock before running app


```bash
# before
$ npm run build
```

```bash
$ npm run mock:dev
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
