#Build Stage Start

#Specifing node as base image
FROM node:12.2.0-alpine as reactCrudFrontend

#Specifing app is working directory
WORKDIR /app/frontend/ 

#Coping the package file
COPY frontend/package.json /app/frontend/

#Installing dependencies
RUN npm install --silent

#Coping the package file
COPY frontend/ /app/frontend/

#port no is 8000
#EXPOSE 8000

#Run the project 
CMD ["npm","start"]

##############################################################

#Specifing node as base image
FROM node:12.2.0-alpine as reactCrudBackend

#Specifing app is working directory
WORKDIR /app

#Coping the package file
COPY package.json /app/package.json

#Installing dependencies
RUN npm install --silent

#Coping backend files
COPY backend /app/backend

#Coping css for backend files
COPY css /app/css

#Coping js for backend files
COPY js /app/js

#Coping vendor for backend files
COPY vendor /app/vendor

#Coping .gitignore file 
COPY .gitignore /app/.gitignore

#Coping package-lock.json for backend 
COPY package-lock.json /app/package-lock.json

#port no is 4000
# 	EXPOSE 4000

#Building the project 
CMD ["node", "server"]

##########################################

#Specifing node as base image
FROM node:12.2.0-alpine as reactCrudnlp

#Coping the package file
COPY nlp/ /app/nlp/

#Specifing app is working directory
WORKDIR /app/nlp/

#Installing dependencies
RUN npm install --silent

#port no is 8000
#EXPOSE 8080

#Building the project 
#CMD ["node", "classifier"]

##########################################


# Specifing nginx as base image
FROM nginx:1.16.0-alpine

#Copy build file to server
COPY --from=reactCrudFrontend /app/frontend/build /usr/share/nginx/html

#Copy build file to server
COPY --from=reactCrudBackend /app/ /usr/share/nginx/html

#Copy build file to server
COPY --from=reactCrudnlp /app/nlp/ /usr/share/nginx/html

#Port no to 80
EXPOSE 80

#Application console will open automatically once server start
#CMD ["nginx", "-g", "daemon off;"]

#Databsae connecting from backend server 
#CMD ["npm", "start"]