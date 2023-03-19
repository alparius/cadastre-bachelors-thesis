# Docker Compose

### Production environment

To stop the test server, you can manually trigger the `stop-compose` CI job on this repo's pipelines.

To see the server's logs, use the `view-logs` job.

To start or restart the deployment, you can trigger the `start-compose` job. If you want to use newer versions of the backend or frontend servers, first trigger the corresponding `create_image_manual`/`create_image_production` CI jobs, then edit the images in `docker-compose.yml` file with the new tags copied from the corresponding repo's registries.

### Development environment

To locally run the full stack inside containers, you only need the [Docker Compose](https://docs.docker.com/compose/install/) tool. After having it set up, starting and stopping the whole stack is as easy as `docker-compose up` and `docker-compose down`.

However, note that SPAs cannoy use environment variables, the contents of the .env files are 'burned' into the bundle at building.

On the [frontend repo](https://git.edu.codespring.ro/kataszter/kataszter-web-client) the production build is automatic, but if you want to create a development (localhost) docker-compose, then manually trigger the `build_development` CI job, then the `create_image_development` job after that.

This way an image will be created to be used in the localhost environment. This image will have a name of the form `r.edu.codespring.ro/kataszter/kataszter-web-client:BRANCH_NAME-development`. Plug that file into `dev-compose/docker-compose.yml` and you are good to go.
