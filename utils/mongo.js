import { MongoClient } from "mongodb";

const connectionURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@victoria-weather.hzivz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


// Connection URL
export const client = new MongoClient(connectionURL);
