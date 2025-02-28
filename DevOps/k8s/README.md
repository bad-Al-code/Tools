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

### ReplicaSets

- its' make sure that a specified number of replicates of a pod match the pods' actual state
  (almost) all the time.
  > ReplicaSet’s primary function is to ensure that the specified number of replicas of service are (almost) always running.

```yaml
spec:
  replicas: 2
```

### Deployments

- For getting zero downtime.
- Kubernetes deployments provides us with the tools that can hemp use avoid such failures by
  allowing us to update our application without downtime.

  > Pods must bot be created directly, but through _ReplicaSets_ which, similarly, must nit
  > be created directly, but through _Deployments_. They are the objects taht allows us not to
  > creates the ReplicaSets and Pods, but that caan be updated without producing any downtime

### Volumes

- preserve the state across container crashes.

### ConfigMaps

- allows to _inject_ configurations into containers.

```bash
kubectl create configmap my-config --from-file=<filename>
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: configmap-pod
spec:
  containers:
    - name: test
      image: busybox:1.28
      command: ["sh", "-c", 'echo "The app is running!" && tail -f /dev/null']
      volumeMounts:
        - name: config-vol
          mountPath: /etc/config
  volumes:
    - name: config-vol
      configMap:
        name: log-config
        items:
          - key: log_level
            path: log_level.conf
```
