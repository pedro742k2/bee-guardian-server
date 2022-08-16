FROM node:16

WORKDIR /app

# Copy and install dependencies on the container
COPY package.json .
RUN npm install && npm i -g typescript

# Copy the local files to the container working directory (/app)
COPY . .

CMD ["npm", "run", "dev"]