FROM node:16-alpine as builder
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.20.2-alpine
COPY --from=builder build /var/www/html/react/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
