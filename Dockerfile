FROM node:12 as build
WORKDIR /CA2CBWA
ADD index.js /CA2CBWA
ADD package.json /CA2CBWA
RUN npm i 

FROM node:12-slim as release
COPY --from=build /CA2CBWA /app
WORKDIR /app
EXPOSE 3000
CMD ["npm","run","start"]