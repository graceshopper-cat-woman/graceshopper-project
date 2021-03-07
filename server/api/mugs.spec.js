const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Mug = db.model('mug')

describe('Mug routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('/api/mugs/', () => {
    const name = 'mug1'
    const description = 'This is a sample mug'
    const price = 1099
    const color = 'red'
    const size = 18
    const inventory = 50

    beforeEach(() => {
      return Mug.create({
        name,
        description,
        price,
        color,
        size,
        inventory
      })
    })

    it('GET /api/mugs', async () => {
      const res = await request(app)
        .get('/api/mugs')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].description).to.be.equal(description)
    })
  }) // end describe('/api/users')
  /*       describe('/api/mugs/:mugId', () => {
        const name = 'mug2'
        const description = 'This is sample mug 2'
        const price = 1150
        const color = 'blue'
        const size = 12
        const inventory = 30
    
        beforeEach(() => {
          return Mug.create({
            name,
            description,
            price,
            color,
            size,
            inventory
          })
        })
    
        it('DELETE /api/mugs/:mugId', async () => {
          const mug = await request(app)
            .delete('/api/mugs/2')
            .expect(204)
    
            const isMugStillThere = await Mug.findByPk(mug.id)
            expect(isMugStillThere).to.equal(null)
        }) */
}) // end describe('/api/users')
