FROM node:10.15.1
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json /app/
RUN npm install
RUN npm install -g @vue/cli
# Copy entrypoint script as /entrypoint.sh
COPY ./entrypoint.sh /entrypoint.sh

# Grant Linux permissions and run entrypoint script
RUN chmod +x /entrypoint.sh
#ENTRYPOINT ["/entrypoint.sh"]
CMD ["/entrypoint.sh"]
COPY . ./

CMD ["npm", "run","serve"]
EXPOSE 8080
