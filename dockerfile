FROM nginx:1.20.2-alpine
COPY build /var/www/html/react/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
