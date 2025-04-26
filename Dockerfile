FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT} 9229

CMD sh -c "npm test && npm run migrate-seed && npm run dev"

#ToProd
# CMD sh -c "npm test && npm run migrate-seed && node dist/server.js"