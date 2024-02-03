#!/bin/sh
cd server 
npm run dev >../server.log &
cd ../client
npm start >../client.log