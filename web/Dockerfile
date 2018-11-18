FROM node:10 as web-builder
WORKDIR /srv/web
COPY . /srv/web/
ARG DOMAIN
ARG PORT
ARG API_URL
ARG RECAPTCHA_KEY
RUN npm install && \
    npm run build
# VOLUME ["/srv/web"]

FROM nginx
COPY --from=web-builder /srv/web/dist /srv/web/dist
COPY nginx /srv/web/nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
