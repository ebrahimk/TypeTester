# TypeTester 

This is a type speed testing application written in Node.js. The application is split into "Microservices" each of which present a RESTFUL api using json web tokens for authentication. The purpose of this project  was to gain experience using docker and writing Node.js restful api's. I use the term "microservices" loosely in this project's description. From personal research I have found that under normal circumstances one would want to seperate a monolithic application into microservices which each perform interactions with an isolated database. The microservices for this applcation were determined by the way they access the database. Their is a Read, Create, Update, and Delete service (CRUD) all of which handle their unique seperate intaraction with the DB. The application can be readily set up on any local machine using docker-compose. To gain further experience with cloud services, builds and deployments, I configured builds in Azure DevOps which build each microservice into a Docker image and publish that image to a private Azure container registry. The release for this application spins up the microservices containers in an AWS Kubernetes Cluster. Due to financial constraints the application is no longer hosted though if you have Docker Desktop for Mac you can deploy the application to a local Kubernetes cluster.

##In Depth Walkthrough
If you are looking for an indepth walkthrough and explanation of this applications architecture, using Docker, and Kubernetes then check out my wesite <LINK WEBSITE HERE>.

## Installation (Docker-Compose)

This project requires that your local machine have docker installed, clone the repository and sumply run the folllowing command: 

```bash
docker-compose up
```

This will build each microservice and a mySQL database in a docker image, configure all networking requirements and host the application on localhost:8080 

## Installation (Kubernetes)

Deploying this application to a local Kubernetes cluster requires that you have a local cluster set up (I used Docker Desktop for Mac).

```bash
chmod +777 kube_local.sh
./kube_local.sh
```
