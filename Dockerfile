# Stage 1: Runtime
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets to nginx folder
COPY . /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set permissions for nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Use non-root user for security
# Note: Alpine nginx image doesn't always support running as non-root on port 80 easily without tweaks
# For simplicity in this demo we stay as nginx user but if needed we could move to port 8080

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
