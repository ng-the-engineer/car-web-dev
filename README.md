# car-web-dev

### Quick start 

- You can spin up an local environment including a Node.js app and a MongoDB instance running in Docker containers respectively.

- After the environment is up, you can `create a car`, `retrieve a car by id`, and `update a car` through RESTful API.

#### Pre-requisites
Please install below tools:
- Docker
- Docker-compose
- Node
- Yarn
- Typescript
- Jest

#### Create an environment

In the project root folder, run

```
$ docker-compose up
```

You may run it as background mode with detached mode

```
$ docker-compose up -d

```

| Action | URL | HTTP Method |
| -------- | ----- | --------|
| Create a car | http://localhost:80/car | POST |
| Get a car    | http://localhost:80/car/{id} | GET |
| Update ca car | http://localhost:80/car/{id} | PUT |
| Delete a car | http://localhost:80/car/{id} | DELETE |

#### Shutdown an environment

```
$ docker-compose down
```

#### Destroy an environment

```
$ docker-compose destroy
```

---
### Stories Implemented
- [x] "As a Developer, I want my code to be covered by tests, so I know if a change has broken something"
- [x] "As a Consumer of the API, when reading the car model information I would like to see an additional field containing a string of a few words that sound like the model of the cars I have added" (using http://www.datamuse.com/api/ as the source).
- [x] "As a Consumer of the API, I would like to be able to update my existing cars"
- [x] "As a Consumer of the API, I would like any cars I add through the API to persist between application restarts (persistent storage)"
- [x] "As a Consumer of the API, I would like cars to be represented as two separate, hierarchically linked resources: Make, Model

---

### Development

#### Local

To run the app without Docker, use `yarn run dev`. Please note that there is no MongoDB connected in this case.

Things to do before committing changes:

- Run unit test, under directory `backend/`, run `npx jest`
- Standardize code format, run `yarn run format`
- Linting, run `yarn run lint`

#### Docker-compose

**Attention**

If you need to change the initial username and password of MongoDB, please destroy the attached volume before bringing up the environment.

1. Check the volume name
```
$ docker volume ls
```

2. Remove the volume
```
$ docker volume rm {THE_NAME_OF_VOLUME}
```

---

### Project Structure

```
.
├── LICENSE
├── README.md
├── backend                                    - root folder of the app
│   ├── Dockerfile
│   ├── build                                  - The compiled code by Typescript
│   ├── jest.config.json
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── data
│   │   │   └── car
│   │   │       ├── database.test.ts           - Unit test
│   │   │       ├── database.ts                - Manage CRUD with MongoDB
│   │   │       ├── make-model.map.ts          - Definition of Car Make and Car Model relationship
│   │   │       ├── model.ts                   - Type definition of Car
│   │   │       └── schema.ts                  - MongodB schema of Car
│   │   ├── index.ts                           - App entry point
│   │   └── service
│   │       ├── car.test.ts                    - Unit test
│   │       ├── car.ts                         - Business logic of addCar, getCar and updateCar 
│   │       ├── enrichment.test.ts             - Unit test
│   │       ├── enrichment.ts                  - Integrate the third party API to enrich the similar model words
│   │       ├── enrichment.types.ts            - Type definition of the third party API response
│   │       ├── make-model.validation.test.ts  - Unit test
│   │       └── make-model.validation.ts       - Function to validate the Car Make and Car Model relationship
│   ├── tsconfig.json                          
│   ├── yarn-error.log
│   └── yarn.lock
├── docker-compose.yaml                        
├── env
│   ├── backend.env                            - Environment variables for accessing database
│   └── mongo.env                              - Environment variables to initiate MongoDB
├── package.json
└── yarn.lock
```

