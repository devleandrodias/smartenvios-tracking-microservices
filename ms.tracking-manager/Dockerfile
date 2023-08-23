FROM node:18

# Set the working directory inside the container
WORKDIR /usr/app/ms-tracking-manager

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application will run on
EXPOSE 4000

# Define the command to run your application
CMD [ "npm", "run", "start:prod" ]
