const express = require('express')
const app = express()
const router = express.Router()
const path = require('path')
const requestify = require('requestify');
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'public')))

requestify.get('https://raw.githubusercontent.com/jozefchmelar/slovensky-kalendar-menin/master/sk-meniny.csv')
  .then(response => {
    var namedays = response.getBody().split("\n")
    namedays.shift()
    var nameDaysDictionary = {}
    
    namedays.forEach(nameday => {
      const month = Number(nameday.split(",")[0].split("-")[0])
      const day   = Number(nameday.split(",")[0].split("-")[1])
      const monthDay = month + "" + day
      const name  = nameday.split(",")[1]
      nameDaysDictionary[monthDay] = name
    });        

    app.get('/', (req,res)=>{
      res.send("hello")
    })
    app.get('/month/:mesiac/day/:den', (req,res) => {
      const month = Number(req.params.mesiac)
      const day   = Number(req.params.den)
      res.json({ "nameday" : nameDaysDictionary[month+ "" +day]})
    })

    app.listen(PORT, () => console.log(`Listening on ${PORT}`))
  })
  .catch(err => {
    app.get('*', (req,res)=>{
      res.json({"error" : err})
    })
    app.listen(PORT, () => console.log(`Listening on ${PORT}`))

  }
  );