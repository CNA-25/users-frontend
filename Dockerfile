# Stage 1: Build the React app
FROM node:20 AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:latest

# Use OpenShift-compatible directory
WORKDIR /opt/app-root/src

# Remove default Nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy built React files to OpenShift-friendly directory
COPY --from=builder /app/dist/ .

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set correct permissions for OpenShift
RUN chmod -R 777 /opt/app-root/src /var/cache/nginx /var/run /var/log/nginx

# Expose port 8080 (avoid port 80)
EXPOSE 8080

# Remove `USER nginx` since OpenShift already enforces non-root users
CMD ["nginx", "-g", "daemon off;"]
