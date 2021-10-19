# car-web-dev

## Quick start 

- You can spin up a local environment including a Node.js app and a MongoDB instance running in Docker containers respectively.

- After the environment is up, you can `create a car`, `retrieve a car by id`, `update a car` and `delete a car` through RESTful APIs.

#### Tools required
- Docker
- Docker-compose

#### Run the app

##### 1. Download source

```
$ git clone git@github.com:ng-the-engineer/car-web-dev.git
```

##### 2. In the project root folder, run

```
$ docker-compose up
```

Or, you may run it in background with detached mode

```
$ docker-compose up -d

```

##### 3. You can access the web with the followed endpoints 
| Action | URL | HTTP Method |
| -------- | ----- | --------|
| Create a car | http://localhost:80/car | POST |
| Get a car    | http://localhost:80/car/{id} | GET |
| Update a car | http://localhost:80/car/{id} | PUT |
| Delete a car | http://localhost:80/car/{id} | DELETE |

> Note: For API details, head to section `Swagger (API documentation)`

##### 4. Shutdown an environment

```
$ docker-compose down
```

---
## Stories Implemented
- [x] "As a Developer, I want my code to be covered by tests, so I know if a change has broken something"
- [x] "As a Consumer of the API, when reading the car model information I would like to see an additional field containing a string of a few words that sound like the model of the cars I have added" (using http://www.datamuse.com/api/ as the source).
- [x] "As a Consumer of the API, I would like to be able to update my existing cars"
- [x] "As a Consumer of the API, I would like any cars I add through the API to persist between application restarts (persistent storage)"
- [x] "As a Consumer of the API, I would like cars to be represented as two separate, hierarchically linked resources: Make, Model

---

## Development

To run the app without Docker, use `yarn run dev`. Please note that there is no MongoDB connected in this case.

Things to do before committing changes:
1. Run unit test, under directory `backend/`, run `yarn run test`
2. Standardize code format, run `yarn run format`
3. Linting, run `yarn run lint`

A default code coverage is displayed after you ran `yarn run test`. An additional HTML test report is generated at `backend\jest_html_reporters.html`

If change is made, rebuild the containers by

```
$ docker-compose up --build
```

**Attention!**

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
### Swagger (API documentation)

To view the swagger

1. Run `yarn global add @redocly/openapi-cli` to install [Redocly](https://redoc.ly/docs).

2. Under root folder, run `openapi preview-docs car-web-dev-swagger.yaml`.

3. Navigate to http://127.0.0.1:8080/ to access the swagger.

---

### Project Structure

```
.
├── LICENSE
├── README.md
├── backend                                    - root folder of the app
│   ├── car-web-dev-swagger.yaml               - Open API 3.0 Swagger
│   ├── Dockerfile
│   ├── build                                  - The compiled code by Typescript
│   ├── jest.config.json
│   ├── jest_html_reporters.html               - Generated test report
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

