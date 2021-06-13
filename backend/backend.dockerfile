FROM node:12.19.0-alpine as build
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

# Expose port 1000 for accessing  the app
EXPOSE 1000

# start api
CMD ["npm", "start"]