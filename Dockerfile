FROM node:12

WORKDIR /project/ms-node-emailing

COPY . ./

RUN npm install && \
    npm run build && \
    npm run test:prod

CMD [ "node", "./dist", "--profilePath=setup/profile.prod.yml" ]

EXPOSE 8001
