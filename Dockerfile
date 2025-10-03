FROM node:24-bullseye

WORKDIR /usr/src/app

COPY package.json ./

# RUN unlink package-lock.json
RUN rm -rf node_modules && npm install --omit=dev

COPY . .

RUN npm run build --verbose

CMD ["npx", "pm2-runtime", "./.output/server/index.mjs"]
