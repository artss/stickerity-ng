FROM node:10

WORKDIR /srv/api
COPY . /srv/api
RUN npm install && \
    npm run build
CMD ["npm", "run", "production"]
