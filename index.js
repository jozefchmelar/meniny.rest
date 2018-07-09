const express = require('express')
const app = express()
const fs = require('fs')
const PORT = process.env.PORT || 5000

fs.readFile('sk-meniny.csv', 'utf8', (err, data) => {
  const toMonthDay = (month, day) => month + "" + day
  var namedays = {}
  data.split("\n").forEach(nameday => {
    //03-19,Jozef -> "319" "Jozef"
    const month = Number(nameday.split(",")[0].split("-")[0])
    const day = Number(nameday.split(",")[0].split("-")[1])
    const name = nameday.split(",")[1]
    namedays[toMonthDay(month,day)] = name
  })

  app.get('/', (req, res) => {
    const today = new Date()
    const month = Number(today.getMonth() + 1)
    const day = Number(today.getDate())
    res.json({ "nameday": namedays[toMonthDay(month,day)] })
  })

  app.get('/month/:mesiac/day/:den', (req, res) => {
    const month = Number(req.params.mesiac)
    const day = Number(req.params.den)
    res.json({ "nameday": namedays[toMonthDay(month,day)] })
  })

  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
})