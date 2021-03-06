FROM node:11.2.0

ADD ./package.json /tmp/

RUN cd /tmp/ && npm install

RUN npm install -g pm2

ADD ./ /code/

RUN cp -r /tmp/node_modules/ /code/

EXPOSE 3004

WORKDIR /code

ENTRYPOINT ["pm2-docker", "index.js"]
