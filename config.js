module.exports = {
  MONGODB: `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.aob2c.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
}