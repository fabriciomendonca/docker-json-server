# docker-json-server-https

[JSON Server](https://github.com/typicode/json-server) provides REST API mocking based on plain JSON.
This is a [docker](https://www.docker.io) image that eases setup. [1](https://github.com/clue/docker-json-server)

It was initially forked from the [docker-json-server](https://github.com/clue/docker-json-server) project. Because the [supremotribunalfederal](https://github.com/supremotribunalfederal) team was in need to run it over https in a lightweight image, we decided to refactor the original project and create a new image using [Alpine](https://alpinelinux.org/) and a self signed certificate.

The server will run with the [nodemon](https://nodemon.io/) library, so it is possible to update the JSON files and server restarts automatically.

> NOTE: Nodemon will not work properly if you are using VM Ware because the container can not see that the file were changed in the host.

If you don't need to run the json-server over HTTPS, please use the original [json-server](https://hub.docker.com/r/clue/json-server/) image. You can also [write your own server.js file] and run it over HTTP, but I do recommend to use docker-json-server image in this case.

## Basic Usage

To run this image you will need to create a folder where you will store your JSON files. (see [basic example](https://github.com/fabriciomendonca/docker-json-server-https/tree/master/examples/basic))

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

It is possible to store your JSON database in any folder inside your project, all you have to do is map them to the `/data/custom` folder in the container.

### JSON source

[JSON Server](https://github.com/typicode/json-server) will convert all first level properties of your `db.json` file into an endpoint.

```json
{
  "users": [
    {
      "id": 123,
      "username": "fabriciomendonca",
      "full_name": "Fabricio Mendonça Rodrigues"
    }
  ],
  "posts": [
    {
      "id": 1,
      "title": "Lorem Ipsum",
      "description": "Lorem Ipsum dolor sit amet...",
      "user": 123
    }
  ]
}
```

The server will provide these endpoints:

```
https://localhost:8443/users
https://localhost:8443/posts
```

Please see the [JSON Server documentation](https://github.com/typicode/json-server) for further information.

## URL Rewriting

If you have to rewrite URLs or match some patterns, just create a `routes.json` file inside your mapped folder. (See [rewrite example](https://github.com/fabriciomendonca/docker-json-server-https/tree/master/examples/rewrite))

```json
{
  "/posts/:id/comments": "/comments?postId=:id",
  "/api/*": "/$1",
  "/identities/users": "/users",
  "/identities/users/*": "/users/$1"
}
```

## Public folder

Map a folder with your static files to /data/public folder in the container. (See [public folder example](https://github.com/fabriciomendonca/docker-json-server-https/tree/master/examples/public_folder))

```
docker run -d -p 8443:8000 -v $PWD/examples/public_folder/custom:/data/custom \
-v $PWD/examples/public_folder/dist:/data/public \
fabriciomendonca/json-server-https
```

Then access the URL `https://localhost:8443/static.js`
