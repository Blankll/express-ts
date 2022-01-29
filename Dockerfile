FROM node:16.13.2-slim@sha256:9f9f74f4227a4400a179ea3f30c74711dda9f05cc0ee17ecfdd00ba79bb94c3c


WORKDIR /app
COPY . /app
RUN npm ci
RUN npm run build

EXPOSE 3000
ENTRYPOINT ["node", "./dist/src/app.js"]
