# Setup for nginx deployment

This application can be deployed with a two server setup in nginx. The marketplace.conf and marketplace-api.conf files allow for that setup.

## marketplace api

The marketplace api has to be run as a node js application (preferably with pm2 to daemonize it). Once the application is launched an nginx server can be used to reverse proxy requests from the configured domain (ex: api.marketplace.com) to http://localhost:5020. This assumes that the server has been setup with an appropriate hosts file entry similar to
```
127.0.0.1 api.marketplace.com
```

## marketplace client application with react router
The marketplace client side application is a react application that needs react-router for client side routing. To enable that the marketplace.conf file has the appropriate setup with the following assumptions

- the markeplace client application is being served off of a subdirectory
- the wwww/marketplace folder exists or is symlinked to the client/build directory in this project after running `npm run build` in the client directory
- there is a local hosts entry or a public URL corresponding to the server name (in this file it is set to `local.marketplace.com`)