FROM node:alpine

RUN npm install --save json-server

WORKDIR /data
VOLUME /data

EXPOSE 8000

ADD run.sh /run.sh
ENTRYPOINT ["sh", "/run.sh"]
CMD []
