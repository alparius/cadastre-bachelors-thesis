# Kataszter helm chart

### Installation steps

0. create **Namespace** in the Project (e.g.: `kataszter`)
<!--- --->

1. create **Registry Credentials** using the commands below or on the Rancher UI
    ```
    ./kubectl.exe create secret docker-registry backend-regcred --docker-server=r.edu.codespring.ro --docker-username=gitlab-ci-token --docker-password=[secret] -n kataszter
    ./kubectl.exe create secret docker-registry frontend-regcred --docker-server=r.edu.codespring.ro --docker-username=gitlab-ci-token --docker-password=[secret] -n kataszter
    ```
<!--- --->

2. create **Ingress Controller**
    - needs to be done by a Rancher admin
    - Rancher UI -> Apps -> Launch -> `nginx-ingress` from *helm3-library* catalog
    - Name: `nginx-ingress-kataszter`
    - Namespace: `kataszter`
    - Settings / Ingress Class: `nginx-kataszter`
    - all else default, click `Launch` at the bottom of the page
<!--- --->

3. install/update or uninstall
    ```
    # get the dependencies and install/update
    ./helm.exe dependency update
    ./helm.exe upgrade --install kataszter .\kubernetes\ -n kataszter -f .\kubernetes\values-ros10.yaml

    # delete
    ./helm.exe delete kataszter -n kataszter
    ```


### Database management

There is a `mongoexpress.yaml` file just outside the chart folder in the git repo, containing everything necessary (ConfigMap, Deployment, Service, Ingress) for manually deploying a [mongo-express](https://github.com/mongo-express/mongo-express) instance, connecting to the app's database.

It is separated from the chart, since it should not be installed together with it and it should not stay installed outside of maintenance sessions, for obvious security reasons.

Thus it has to be manually installed:
- edit `mongoexpress.yaml` to place in MongoDB's root password and another password of your choice for the mongo-express UI itself.
- `kubectl apply -f mongoexpress.yaml -n kataszter`
- access is only possible through the company intranet, on the `http://kataszter-mongoexpress.kube.codespring.ro` URL
- after the collections were inspected/exported/imported, the instance should be terminated using the `kubectl delete -f mongoexpress.yaml -n kataszter` command
