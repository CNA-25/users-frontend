# Stage 1: Build the React app
FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:latest

WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy built React app from the previous stage
COPY --from=builder /app/dist/ .

# Ensure proper permissions for OpenShift (fixing permission issue)
RUN chmod -R 777 /var/cache/nginx /var/run /var/log/nginx

# Copy custom Nginx config
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
USER 1001  # Run as non-root user

CMD ["nginx", "-g", "daemon off;"]