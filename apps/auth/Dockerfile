FROM node:alpine As development

# Install Python and build tools
RUN apk add --no-cache python3 build-base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build auth

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

# Expose the debugging port
EXPOSE 9229

CMD ["node", "--inspect=0.0.0.0:9229",  "dist/apps/auth/main"]