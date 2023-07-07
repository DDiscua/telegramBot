
FROM node:18-alpine3.15

USER root

WORKDIR /home/node/src

# Copy package.json, package-lock.json, tsconfig.json, and .env to the WORKDIR
COPY package*.json tsconfig.json ./


# Install app dependencies
RUN npm ci --only=production

# Copy the rest of the project files to the WORKDIR
COPY . .


# Start the app
CMD ["npm", "run", "dev"]
