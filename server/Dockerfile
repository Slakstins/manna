# Define node version
FROM node:16-alpine
# Define container directory
WORKDIR /usr/src/app
# Copy package*.json for npm install
COPY package*.json ./
# Run npm clean install, prod dependencies only
RUN npm ci --only=production
# Copy all files
COPY . .
# Expose port 3000 for server
EXPOSE 3000
# Run "node server.js"
CMD ["node", "server.js"]