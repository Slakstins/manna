https://itnext.io/angular-development-in-docker-with-dev-containers-49d2cabad445


https://medium.com/bb-tutorials-and-thoughts/how-to-develop-and-build-angular-app-with-nodejs-e24c40444421

To run frontend for debugging:
1. Start a terminal in the manna-app folder
2. npm install
3. ng serve
4. http://localhost:4200/


To run server for debugging:
1. Start a terminal in the server folder
2. npm install
3. npm start

To build frontend for distribution
1. Start a terminal in the manna-app folder
2. npm run build
3. Start a terminal in the server folder
4. npm start
5. http://localhost:3000/

To build and publish the docker image on the 116VB Network
1. Start a terminal in the server folder on a system with docker.
2. docker build -t manna-app ./
3. docker image tag manna-app registry.3.116vb.dns9.co/manna-app
4. docker push registry.3.116vb.dns9.co/manna-app

Build and publish notes:
1. Tested using DNS910DT01W that has Docker Desktop installed.
2. Tested using the wsl folder for the Dev Container volume.

To use the docker image on the 116VB Network
1. Stop the manna-app stack on Portainer at <http://10.101.0.3:9000/#!/2/docker/stacks/manna-app?id=51&type=2&regular=true&external=false&orphaned=false>
2. delete image being used by Portainer for the manna-app <http://10.101.0.3:9000/#!/2/docker/images>
3. Start the manna-app stack on Portainer at <http://10.101.0.3:9000/#!/2/docker/stacks/manna-app?id=51&type=2&regular=true&external=false&orphaned=false>
4. https://manna-app.3.116vb.dns9.co/