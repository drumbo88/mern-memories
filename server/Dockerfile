FROM node
WORKDIR /app/server
COPY ./package.json /app/server/
RUN npm install
COPY . /app/server
EXPOSE 5000
CMD ["node", "index.js"]
