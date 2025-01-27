# Stage 1
# Build docker image of react app
FROM node:23-alpine as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the React app's source code
COPY . .

# Build the react app
RUN npm run build

# Stage 2
# Copy the react app build above in nginx
FROM nginx:alpine as production-stage

# Ensure the necessary directories have proper permissions
RUN mkdir -p /var/cache/nginx /var/log/nginx && chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx

# Copy the build output from the build-stage
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80 to the outside
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]