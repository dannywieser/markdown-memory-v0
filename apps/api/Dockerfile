FROM node
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
CMD ["node", "/app/main.js"]
