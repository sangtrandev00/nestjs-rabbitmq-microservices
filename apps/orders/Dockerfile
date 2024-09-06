FROM node:alpine As development

# Install Python (Meaning of this line ?)
# Explain this line below
# Install Python and build tools
RUN apk add --no-cache python3 build-base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine as production
# Install Python and build tools
RUN apk add --no-cache python3 build-base

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/orders/main"]