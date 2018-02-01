const Sqlssb = require('../../source')
const config1 = require('../service1.config.json')
const config2 = require('../service1.config.json')
const service1 = new Sqlssb(config1)
const service2 = new Sqlssb(config2)

service1.on('//sqlssb/demo_message', ctx => {
  console.log(ctx.messageBody)
  if (ctx.messageBody === 'STOP') {
    service1.stop()
    return
  }

  const n = parseInt(ctx.messageBody, 10)

  if (n) {
    console.log(n)
    ctx.reply('//sqlssb/demo_message', n * 2)
  }
})

service2.on('//sqlssb/demo_message', ctx => {
  console.log(ctx.messageBody)
  const n = parseInt(ctx.messageBody, 10)

  if (n > 10) {
    ctx.reply('//sqlssb/demo_message', 'STOP')
    service2.stop()
    return
  }

  if (n) {
    console.log(n)
    ctx.reply('//sqlssb/demo_message', n * 2)
  }
})

Promise.all([
  service1.start(),
  service2.start()
]).then(() => {
  return service1.send('sqlssb_demo_service_2', '//sqlssb/demo_message', 1)
}).catch(err => {
  console.error(err)
})
