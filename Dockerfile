FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT}

# CMD ["node", "dist/server.js"]
CMD sh -c "npx sequelize-cli db:migrate && node dist/server.js"