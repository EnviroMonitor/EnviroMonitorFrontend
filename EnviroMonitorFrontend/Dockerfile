FROM node:7.2.1-alpine
ENV NODE_ENV=development
ENV DEFAULT_UID=1000
ENV DEFAULT_GID=1000
ENV HOST=0.0.0.0
ENV PORT=8080
WORKDIR /install
COPY ./package.json /install/
RUN npm install
ADD ./docker/docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
EXPOSE "8080"
CMD ["start"]
