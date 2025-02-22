# Kubernetes

- Kubernetes was first developed by a team at Google
- Kubernetes is not only a container scheduler, but also a lot more:
  - We can use it to deploy our services, roll out new releases without downtime, and scale (or de-scale) those services.
  - Kubernetes can place replicas of a service on the most appropriate server, restart them when needed, replicate them, and scale them.
  - Zero-downtime deployments, fault tolerance, high availability, scaling, scheduling, and self-healing add significant value to Kubernetes.
  - It can load balance requests and monitor resources.
- The list of what Kubernetes does is long and rapidly expanding.

### Pods

- A Pod is a way to represent a running process in a cluster.
- A Pod encapsulates one or more containers. It provides a unique network IP, attaches storage resources, and decides how containers should run.

- **Pods as wrapper for containers**
  - Even though a pod can contain any number of containers, the most coomon use case is to use
    _single-container-in-a-pod_ model.

###### How Pods Created?

1. API server
   - central component of a Kubernetes cluster, and it runs on the primary node.
   - All other components interact with the API server and keep watch for changes.
2. Scheduler
   - also runs on primary node.
   - its job to watch for unassigned Pods and assign them to node with available resources (CPU
     and memory) matching pod requirements.
3. Kubelet
   - runs on each node.
   - its job is to make sure that assigned Pods are running on the node.
   - It watches for any new Pod assignments for the node

- Pods are designed to run multiple cooperative processes that should act as a cohesive unit.

> A Pod is a collection of containers. However, that does not mean that multi-container Pods are common. They are rare. Most Pods you’ll create will be single container units.
> Do not create Pods by themselves. Let one of the controllers create Pods for you.
