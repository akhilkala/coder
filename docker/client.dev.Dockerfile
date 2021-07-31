FROM node:14

WORKDIR "/usr/src/client"

COPY package.json ./
RUN npm install -g npm@7.13.0
RUN npm install --force

COPY . .

CMD ["npm", "run", "start"]