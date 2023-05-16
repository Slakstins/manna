https://itnext.io/angular-development-in-docker-with-dev-containers-49d2cabad445


https://medium.com/bb-tutorials-and-thoughts/how-to-develop-and-build-angular-app-with-nodejs-e24c40444421

To run frontend for debugging:
1. Start a terminal in the manna-app folder
2. npm install
3. ng serve


To run server for debugging:
1. Start a terminal in the server folder
2. npm install
3. npm start

To build frontend for distribution
1. Start a terminal in the manna-app folder
2. npm run build
3. Alter server.js to include serving files from /manna-app/dist folder
4. Start a terminal in the server folder
5. npm start
