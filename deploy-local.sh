#!/bin/bash

echo "Building Docker images for each service..."
docker-compose build

echo "Handing off containerized serivces to Kubernetes Cluster..."
kubectl create -f kube-deployment.yaml 
