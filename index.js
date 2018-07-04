const express = require('express')
const app = express()
const router = express.Router()
const path = require('path')
const fs = require('fs');
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'public')))

fs.readFile('sk-meniny.csv','utf8', (err,data) => {
    var namedays = data.split("\n")
    var nameDaysDictionary = {}    
    namedays.forEach(nameday => {
      const month = Number(nameday.split(",")[0].split("-")[0])
      const day   = Number(nameday.split(",")[0].split("-")[1])
      const monthDay = month + "" + day
      const name  = nameday.split(",")[1]
      nameDaysDictionary[monthDay] = name
    });        

    app.get('/', (req,res)=>{
      const today = new Date();
      const month = Number(today.getMonth()+1)
      const day = Number(today.getDate())
      res.json({ "nameday" : nameDaysDictionary[month+ "" +day]})
    })

    app.get('/month/:mesiac/day/:den', (req,res) => {
      const month = Number(req.params.mesiac)
      const day   = Number(req.params.den)
      res.json({ "nameday" : nameDaysDictionary[month+ "" +day]})
    })

    app.listen(PORT, () => console.log(`Listening on ${PORT}`))
  }) ;