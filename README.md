# Connect Four App
Based of the pair programming interview question I got at Shopify in Waterloo. There are two versions of this project. The `rest` branch
contains an implementation based on the discussions I had with Jesse, using React and REST. However this implementation require constant
polling of the server to fetch updates.

The `master` branch implementation simplifies things by creating a real-time app using [socket.io](https://socket.io/).

## Running
Start a MongoDB instance on the default port (27017)

### Yarn
```
yarn install
yarn start-server
yarn start-client
```

### npm
```
npm install
npm start-server
npm start-client
```

Navigate to http://localhost:8080 to connect to the client. 

Open another tab or window at the same address to connect as player 2.

Click `Join New Game` to be placed into a game.

## Stuff I used to make it
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](http://mongoosejs.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
#### REST implementation only
- [fetch](https://github.com/github/fetch)
#### Socket implementation only
- [Socket.io](https://socket.io/)
