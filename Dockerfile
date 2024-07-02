From node:18.20.0
ARG ENVIRONMENT=production
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps 
COPY . .

RUN sed -i "s/NODE_ENV =.*/NODE_ENV = ${ENVIRONMENT}/g" .env

RUN sed -i "s/NEXT_PUBLIC_APP_ENV =.*/NEXT_PUBLIC_APP_ENV = ${ENVIRONMENT}/g" .env

RUN npm run build

CMD ["npm","run","start"]
