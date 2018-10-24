FROM node

RUN apt-get update          && \
    apt-get -y install vim

RUN npm update -g           && \
    npm --version           && \
    npm install    assert   && \
    npm install    lodash   && \
    npm install -g istanbul && \
    npm install -g jshint   && \
    npm install -g mocha    && \
    npm list

COPY package.json ./

RUN npm install

CMD bash
