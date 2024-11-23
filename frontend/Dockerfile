# stage1 as builder
FROM node:lts-alpine as builder
WORKDIR /app
# Copy the package.json and install dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

# Build the react web app for production
FROM nginx:alpine as production-build
RUN addgroup -S react && adduser -S react -G react
RUN mkdir -p /var/cache/nginx/ /var/run/nginx \
    && chown -R react:react /var/cache/nginx /var/run/nginx
COPY nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stage 1
COPY --chown=react:react --from=builder /app/dist /workspace/build
EXPOSE 3000
USER react
ENTRYPOINT ["nginx", "-g", "daemon off;"]
