# Ifconnector v1.0
IfConnector - Iftop to Elasticsearch

This program is developped in NodeJS for the purpose to store informations
created by an Iftop process to an Elasticsearch Server.

Author: Corentin Dekimpe

Company: Telkea

## File structure :

* app.js: Entry point of the application, will just check if no fatal error in the configuration file.
* config.json: Configruation file to parameter. Check options lower in this file.
* datafile.js: Class that handles all the methods to deal with files created by Iftop.
* elastc.js: Class that handles connections to the Elasticsearch server.
* iftop.js: Class that launches the process and handle his closure.

## Configuration file options :

### Iftop

All the configuration about the iftop process

* interface: Interface that Iftop will listen to.
* networks: Array of networks written with the common writing _x.x.x.x/y_.
* onlynetworks: Boolean if put on true only the data from the networks defined will be send to Elasticsearch.
* duration: _2, 10 or 40_ is the time iftop process will run before stopping and write the file.

### Data

All the configuration about the Data saved by Iftop process

* path: Set data path where to store the files created from iftop. Default is : /tmp/ifconnector.
* keep: Boolean set on true if you want to keep the data once sent, otherwise set on false.
* ext: File extension.

### Elasticsearch

All the configuraiton about the Elasticsearch server

* host: Hostname or Ip Address of the server.
* port: Port to communicate with the server. Default for Elasticsearch : 9200.
* index: Index of the Elasticsearch database to keep.
* type: Name of the Type to store in Elasticsearch.