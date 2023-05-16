connectionString = 'mongodb+srv://seth:eYRrN999CHU0ijzo@cluster0.8aqzx0f.mongodb.net/mannaDB?retryWrites=true&w=majority' 
const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")

const app = express();

app.use(express.json());
app.use(express.static(process.cwd()+"/../manna-app/dist/manna-app/"));


mongoose.connect(connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const cors = require('cors');
app.use(cors({
    origin: '*'
}));


app.use(Router);


app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/../manna-app/dist/manna-app/index.html")
});

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});