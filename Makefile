
init:
	nvm use 14; npm -y init; touch index.js; npm i apollo-server graphql mongoose

start:
	DBNAME=notesdb DBUSER=dbuser DBPASS=dbuser1234 node index.js
