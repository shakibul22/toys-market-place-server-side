const express = require("express");
const app = express();
var cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()


// Middleware

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hyww9ng.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const toysCollection = client.db('toys-market-place').collection('toys')

    app.post('/postToy', async (req, res) => {
      const body = req.body;
      const result = await toysCollection.insertOne(body);
      res.send(result)
      console.log(body);
    })

    // subCategory
    app.get('/allToys/:text', async (req, res) => {
      const result = await toysCollection.find({
        subCategory
          : req.params.text
      }).toArray();
      return res.send(result)
    })

    app.get("/myToys/:email", async (req, res) => {
      console.log(req.params.email);
      const toys = await toysCollection
        .find({
          sellerEmail : req.params.email,
        })
        .toArray();
      res.send(toys);
    });



   


    app.get('/allToys', async (req, res) => {
      const cursor = toysCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })

 ;


  

    //Update

    // app.put("/updateToy/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const body = req.body;
    //   console.log(body);
    //   const filter = { _id: new ObjectId(id) };
    //   const updateDoc = {
    //     $set: {

    //       category: body.category,
    //     },
    //   };
    //   const result = await toysCollection.updateOne(filter, updateDoc);
    //   res.send(result);
    // });
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });


    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Toys market place is running');
})
app.listen(port, () => {
  console.log(`Toys market place is running on port ${port}`);
})