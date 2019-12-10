FROM node:11-alpine
# RUN apk add --no-cache bash
ENV NODE_fullmektigsNavn production

WORKDIR usr/src/app
COPY server server/
COPY build build/

WORKDIR server
RUN npm install

CMD ["node", "./server.js"]

EXPOSE 8080

