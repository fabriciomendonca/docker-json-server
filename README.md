# docker-json-server-https

[JSON Server](https://github.com/typicode/json-server) provides REST API mocking based on plain JSON.
This is a [docker](https://www.docker.io) image that eases setup. [1](https://github.com/clue/docker-json-server)

It was initially forked from the [docker-json-server](https://github.com/clue/docker-json-server) project. Because the [supremotribunalfederal](https://github.com/supremotribunalfederal) team was in need to run it over https in a lightweight image, so we decided to refactor the original project and create a new image using [Alpine](https://alpinelinux.org/) and a self signed certificate.

The server will run with the [nodemon](https://nodemon.io/) library, so it is possible to update the JSON files and server restarts automatically.

> NOTE: Nodemon will not work properly if you are using VM Ware because the container can not see that the file were changed in the host.

If you don't need to run the json-server over HTTPS, please use the original [json-server](https://hub.docker.com/r/clue/json-server/) image. You can also [write your own server.js file] and run it over HTTP, but I do recommend to use docker-json-server image in this case.

## Basic Usage

To run this image you will need to create a folder where you will store your JSON files. (see [basic example](https://github.com/fabriciomendonca/docker-json-server-https/tree/master/examples))

```
examples/basic/custom
  db.json
```

This command runs from the example folder mapping the container port 8000 to host port 8443.

```
docker run -d -p 8443:8000 -v $PWD/basic/custom:/data/custom fabriciomendonca/json-server-https
```

To see your json-server running:

```
https://localhost:8443
```

Try changing your db.json file and refresh the browser to see the changes reflected.

### The custom folder

### JSON source


