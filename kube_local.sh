#!/bin/bash

echo "$(tput setaf 6)Building Docker images for each service...$(tput sgr 0)"
docker-compose build

dir=$(pwd)
sed -i -e "s/RELATIVE_PATH/${dir//\//\\/}/g" ./kube-deployment.yml

echo "$(tput setaf 6) Handing off containerized serivces to local Kubernetes Cluster, hosting on localhost:8080...$(tput sgr 0)"
echo "$(tput setaf 6)Mounting ./Database/data...$(tput sgr 0)" 
kubectl create -f kube-deployment.yml 

echo "$(tput setaf 6)Waiting for containers to complete initialization, approx 30 seconds...$(tput sgr 0)"
Sleep 30

echo "$(tput setaf 6)Opening browser at localhost:8080...$(tput sgr 0)"
open http://localhost:8080/

read -p "$(tput setaf 2)Press enter to delete Kubernetes deployment and remove all local contianers...$(tput sgr 0)"

echo "$(tput setaf 6)Deleting all deployments...$(tput sgr 0)" 
kubectl delete deployments --all 

echo "$(tput setaf 6)Deleting all Services...$(tput sgr 0)"
kubectl delete Services --all

echo "$(tput setaf 6)Removing all persistent data$(tput sgr 0)" 
rm -rf ./Database/data/*

echo "$(tput setaf 6)Deleting all local Docker images...$(tput sgr 0)"
docker rmi kubernetesmicroserviceapp_update kubernetesmicroserviceapp_delete kubernetesmicroserviceapp_create kubernetesmicroserviceapp_read kubernetesmicroserviceapp_portal 

sed -i -e "s/${dir//\//\\/}/RELATIVE_PATH/g" ./kube-deployment.yml

echo "$(tput setaf 2)Process Complete!$(tput sgr 0)" 

