FROM node:10
WORKDIR /srv/web
COPY ./src package*.json *.config.js /srv/web/
RUN npm install
VOLUME ["/srv/web"]
EXPOSE 5000
CMD ["npm", "start-production"]

