'use strict'

const db = require('../server/db')
const {User, Mug, Order, MugOrder} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'})
  // ])

  // console.log(`seeded ${users.length} users`)
  // console.log(`seeded successfully`)
  const mugs = [
    {
      name: 'Pumpkin',
      description:
        'Carved of stoneware and finished in a modern matte glaze, this mug-sized pumpkin makes a festive holder for ginger beer, warm apple cider and other fall favorites',
      price: 15.0,
      color: 'orange',
      size: 18,
      inventory: 100
    },
    {
      name: 'Pete the Rabbit',
      description:
        'Bring the beloved once-upon-a-time tale to your table with the Peter Rabbit™ Collection. Each nostalgic design comes from the whimsical, imaginative drawings of famed illustrator and children’s storyteller Beatrix Potter™, making for the sweetest of springtime celebrations.',
      price: 16.0,
      color: 'white',
      size: 21,
      inventory: 5
    },
    {
      name: 'Buddies Central Perk',
      description:
        "In celebration of the show's 25th anniversary, we teamed up with our Buddies to create a special collection for fans everywhere. Sip your favorite morning brew from this Gunther-approved mug, which will make you feel like you're in a cozy coffee shop.",
      price: 19.5,
      color: 'white',
      size: 14,
      inventory: 60
    },
    {
      name: 'Smelly Cat',
      description:
        'A scent-sational gift for any Friends lover on your holiday list, this quirky mug features a line from Phoebe’s iconic ballad. (Warning: It may inspire a singalong.)',
      price: 18.5,
      color: 'white',
      size: 14,
      inventory: 200
    }
  ]

  //bulk create mugs in database
  const [pumpkin, peteTheRabbit, buddies, smelly] = await Mug.bulkCreate(mugs)
  console.log('Seeded Mugs')

  const orders = [
    {
      number: 123
      // userId: Lauryn.id,
    },
    {
      number: 357,
      orderStatus: 'processing'
      // userId: Hatibe.id,
    },
    {
      number: 34,
      orderStatus: 'delivered'
      // userId: Traci.id,
    }
  ]

  //bulk create orders in database
  const [orderOne, orderTwo, orderThree] = await Order.bulkCreate(orders)
  console.log('Seeded Orders')

  //sample users
  const users = [
    {
      firstName: 'Lauryn',
      lastName: 'Kim',
      email: 'lauryn@email.com',
      password: 'lauryn1122',
      isAdmin: true
      // orderId: orderOne.id
    },
    {
      firstName: 'Hatibe',
      lastName: 'K',
      email: 'hatibe@email.com',
      password: 'hatibek44',
      isAdmin: true,
      shippingStreet: '123 Costco Chicken Rd',
      shippingState: 'Costco',
      shippingCity: 'Poultry',
      shippingZip: '39652'
    },
    {
      firstName: 'Ari',
      lastName: 'Kamarchevakul',
      email: 'ari@email.com',
      password: 'arilikescats',
      isAdmin: false,
      billingStreet: '44 cat blvd',
      billingState: 'Feline',
      billingCity: 'Paw Town',
      billingZip: '75719'
    },
    {
      firstName: 'Traci',
      lastName: 'H',
      email: 'traci@email.com',
      password: 'traci4579',
      isAdmin: false
    }
  ]

  //bulk create users in database
  const [Lauryn, Hatibe, Ari, Traci] = await User.bulkCreate(users)
  console.log('Seeded Users')

  //assign orders to users
  await Lauryn.addOrder(orderOne)
  await Hatibe.setOrders(orderTwo)
  await Ari.setOrders(orderThree)

  //assigning mugs to orders
  const mugOrderOne = {
    mugId: smelly.id,
    orderId: orderTwo.id,
    price: smelly.price,
    quantity: 20
  }

  const mugOrderTwo = {
    mugId: pumpkin.id,
    orderId: orderOne.id,
    price: pumpkin.price,
    quantity: 4
  }

  await MugOrder.create(mugOrderOne)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
