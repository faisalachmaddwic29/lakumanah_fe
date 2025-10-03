FROM node:24-bullseye

WORKDIR /usr/src/app

COPY package.json ./

# RUN unlink package-lock.json
RUN rm -rf node_modules && npm install --omit=dev

COPY . .

RUN npm run build --verbose

RUN npm install pm2 -g

# CMD ["pm2-runtime","start", "ecosystem.config.js"]
# CMD ["node", "./.output/server/index.mjs"]

CMD ["npx", "pm2-runtime", "./.output/server/index.mjs"]
