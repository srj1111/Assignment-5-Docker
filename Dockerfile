FROM node:16-alpine 
WORKDIR /app2
COPY . .
RUN npm install
CMD [ "npm","run","dev"]