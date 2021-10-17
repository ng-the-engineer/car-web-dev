# car-web-dev

### Quick start 

#### Docker-compose

To start
```
$ docker-compose up -d
```

Access the app on http://localhost:80

To add a car, e.g.

```
HTTP method: POST
URL: localhost:80/car
Body: {
    "make": "Honda",
    "model": "a",
    "year": 2016,
    "color": "BRONZE"
}
```
To get a car, e.g.

```
HTTP method: GET
URL: localhost:80/car/3
```

To update a car, e.g.

```
HTTP method: PUT
URL: localhost:80/car/3
Body:
{
    "make": "Honda",
    "model": "new 2",
    "year": 2016,
    "color": "BRONZE"    
}
```
To stop

```
$ docker-compose down
```

#### Docker

To build
```
$ docker build -t car-web-dev .
```

To run
```
docker run -d --rm -p 80:8088 car-web-dev
```

### Development

```
$ yarn run dev
```

### Unit Test

```
$ npx jest
```

### Linting

```
$ yarn lint
```



