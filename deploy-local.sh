#!/bin/bash

echo "Building Docker images for each service..."
docker-compose build

echo "Handing off containerized serivces to local Kubernetes Cluster, hosting on localhost:8080..."
echo "Mounting ./Database/data..." 
kubectl create -f kube-deployment.yaml 

echo "Waiting for containers to complete initialization..."
wait 15

echo "Opening browser at localhost:8080..."
open http://localhost:8080/

read -p "Press enter to delete Kubernetes deployment and remove all local contianers..."

echo "Deleting all deployments..." 
kubectl delete deployments --all 

echo "Deleting all Services..."
kubectl delete Services --all

echo "Removing all persistent data" 
rm -rf ./Database/data/*

echo "Deleting all local Docker images..."
docker rmi kubernetesmicroserviceapp_update kubernetesmicroserviceapp_delete kubernetesmicroserviceapp_create kubernetesmicroserviceapp_read kubernetesmicroserviceapp_portal 

echo "Process Complete!" 

