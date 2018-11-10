FROM node:10 as web-builder
WORKDIR /srv/web
COPY . /srv/web/
ARG DOMAIN
ARG RECAPTCHA_KEY
ARG PORT
RUN npm install && \
    npm run build
# VOLUME ["/srv/web"]

FROM nginx
COPY --from=web-builder /srv/web/dist /srv/web/dist
COPY nginx.conf /etc/nginx/conf.d/default.conf
