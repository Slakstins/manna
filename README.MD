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

To build docker container
1. Start a terminal in the server folder on a system with docker
2. docker build -t manna-app ./
3. docker image tag manna-app registry.3.116vb.dns9.co/manna-app
4. docker push registry.3.116vb.dns9.co/manna-app