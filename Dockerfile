# Use Node.js version 20
FROM node:20-slim

# Create app directory 
WORKDIR /app

# Install Grafbase
RUN npm install -g grafbase

# Copy current directory to app directory in image

EXPOSE 4000

# Set up a volume to map the current directory to /app inside the container
VOLUME ["/app"]

COPY . .

# Start Grafbase dev server on container startup
CMD ["grafbase", "dev", "--port", "4000"] 
