FROM node:latest

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

ARG STOCK_INTERVAL_ARG
ARG STOCK_DATABASE_ARG

ENV STOCK_INTERVAL = ${STOCK_INTERVAL_ARG}
ENV STOCK_DATABASE = ${STOCK_DATABASE_ARG}

RUN npm install

RUN npm run build

## Stage 2: Serve app with nginx server
#
## Use official nginx image as the base image
#FROM nginx:latest
#
## Copy the build output to replace the default nginx contents.
#COPY --from=build /usr/local/app/dist/sample-angular-app /usr/share/nginx/html
#
## Expose port 80
#EXPOSE 80
