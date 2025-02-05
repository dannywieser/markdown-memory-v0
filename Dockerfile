FROM nginx
RUN rm -drf /usr/share/nginx/html/50x.html
RUN rm -drf /etc/nginx/conf.d/default.conf
COPY dist/index.html /usr/share/nginx/html
COPY dist/assets /usr/share/nginx/html/assets
COPY nginx.conf /etc/nginx/conf.d