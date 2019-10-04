# General

The main purpose of this project is demonstration of workability of application based on three technologies:
1) Client side on React-Admin framework;
2) Server side on Node-Red tool.
3) Database provided by Redis

# React-Admin

React-Admin is a framework based on ReactJS-library. Basis functionality of this tool is adaptated to create the client side of CMS.

It was developed and maintains by french Marmelab company.

Tutorial for React-Admin framework is available by this link:
https://marmelab.com/react-admin

# Node-Red 

Node-RED is a flow-based programming tool for wiring together hardware devices, APIs and online services in new and interesting ways.
                                                                          
It provides a browser-based editor that makes it easy to wire together flows using the wide range of nodes in the palette that can be deployed to its runtime in a single-click.

It was developed by IBM’s Emerging Technology Services team and now a part of the JS Foundation.

Tutorial for Node-Red is available by this link:
https://nodered.org

# Redis

We are combining **NodeRed** and **Redis** as separate elements in this project.

**Redis** is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes with radius queries and streams. More information about this technology is presented by this link: https://redis.io/ 
  

# Installation

This application is available by GitHub link:
https://github.com/RippleOSI/ReactAdmin-NodeRed-Redis-v1

Create a directory for your application:
```
$ mkdir RA-NR-demo

```

Clone the project from GitHub:
```
$ git clone https://github.com/RippleOSI/ReactAdmin-NodeRed-Redis-v1 .
```

Install all required dependencies:
```
$ cd RA-NR-demo
$ npm install
```

Run the application locally:
``` 
$ npm start
```

After this application is available at your local machine by the link http://[localhost]:3000, but your application can't work because server side hasn't been installed yet.

You should install Node-Red at your local machine:
``` 
$ docker run -it -d -p 1880:1880 --name my-nodered nodered/node-red-docker
$ docker exec -it my-nodered bash
$ npm install node-red-contrib-redis
$ exit
$ docker stop my-nodered
$ docker start my-nodered
$ docker run -it -p 6379:6379 -d -v 'DIRECTORY_PATH'/redis.conf:/usr/local/etc/redis/redis.conf --name my-redis redis redis-server /usr/local/etc/redis/redis.conf
``` 

NB be aware of related issue with the NodeRed Redis contrib module that means the version needs to be specific one thats working steadily
[How to install node-red-contrib-redis v1.1.7 on the docker instance.pdf](https://github.com/RippleOSI/ReactAdmin-NodeRed-Redis-v1/files/3690339/How.to.install.node-red-contrib-redis.v1.1.7.on.the.docker.instance.pdf)

Node-Red is available by this link: http://[localhost]:1880

For this reason you should define domain name in the `public/index.html` file:

```
<html>
    <head>
    ...
    </head>
    <body>
        <div id="root"></div>
        <script type="text/javascript">
          window.config = {
            domainName: "http://[my-localhost-name]:1880"
          }
        </script>
    </body>
</html>
```

After this you should import required flows to your local Node-Red. Flows are located inside your project in the **/flows** directory.

Once you have imported flows on our local Node-Red, you should configure server settings for Redis node on the flow.
see these guides here

[How to configure redis nodes on node red admin panel](https://github.com/RippleOSI/ReactAdmin-NodeRed-Redis-v1/files/3690347/How.to.configure.redis.nodes.on.node.red.admin.panel.pdf)




You can get IP address of my-redis docker.

```
$ docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' my-redis
```

Once you obtain the IP address, double click on the redis node and edit Server settings.

Fill the Host IP address as docker IP address.

Some tips to access local dev server from external source.

You have to add firewall rule to allow 3000 port

```
$ ufw allow 3000/tcp
```

You will then need to trigger set up of Users and Posts via a POST trigger, either via Postman (consider firewall port issues), Curl (easier if doing this on local dev machine) or an inject trigger on NodeRed

## Screenshots

![React Admin demo frontpage for Users ](/img/ReactAdminOnNR.PNG)

![Node Red flows for Users ](/img/NR_flowsforRAdemo.PNG)
