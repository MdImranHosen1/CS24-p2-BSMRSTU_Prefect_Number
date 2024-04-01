# # Use official Node.js image as base
# FROM node:latest

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application
# COPY . .

# # Expose port 5000
# EXPOSE 5000

# # Set environment variables
# ENV PORT=5000
# ENV DB_URL=mongodb+srv://roni:173120@cluster0.cuyitno.mongodb.net/EcoSyncDB
# ENV SECRET_KEY=rons173120

# # Command to run the application
# CMD ["npm", "start"]

# Use official Node.js image as base
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# install bcrypt
RUN npm install bcrypt

# Copy the rest of the application
COPY . .

# Expose port 5000
EXPOSE 5000

# Set environment variables
ENV PORT=5000
ENV DB_URL=mongodb+srv://roni:173120@cluster0.cuyitno.mongodb.net/EcoSyncDB
ENV SECRET_KEY=rons173120

# Command to run the application
CMD ["npm", "start"]

