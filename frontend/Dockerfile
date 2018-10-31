FROM node

WORKDIR /usr
COPY package*.json /usr/

RUN npm install
ENV PATH /usr/node_modules/.bin:$PATH

WORKDIR /usr/frontend
COPY . /usr/frontend

EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
