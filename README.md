# KubernetesMicroserviceApp

This is a type speed testing application written in Node.js. The application is split into "Microservices" each of which present a RESTFUL api using json web tokens for authentication. The purpose of this project  was to gain experience using docker and writing Node.js restful api's. I use the term "microservices" loosely in this projects description. Under normal circumstances one would want to seperate a monolithic application into tightly microservices which each perform interactions with an isolated database. The microservices for this applcation were determined by the way they access the database. Their is a Read, Create, Update, and Delete service (CRUD) all of which handle their unique seperate intaraction with the DB. 

## Installation

This project requires that your local machine have docker installed. 

```bash
docker-compose up
```

This will build each microservice and a mySQL database in a docker image, configure all networking requirements and host the applicaiton on localhost:8080 
