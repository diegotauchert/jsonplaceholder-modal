ARG img
FROM $img

WORKDIR /app

# Instalando dependências da aplicação e armazenando em cache.
COPY package.json /app/package.json
RUN yarn install
RUN yarn global add react-scripts

# start app

ENTRYPOINT ["yarn", "start"]

