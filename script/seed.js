'use strict'

const db = require('../server/db')
const faker = require('faker')
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

  //sample mugs
  const mugArr = [
    {
      name: 'Pumpkin',
      imageUrl: '../images/pumpkin.jpg',
      description:
        'Carved of stoneware and finished in a modern matte glaze, this mug-sized pumpkin makes a festive holder for ginger beer, warm apple cider and other fall favorites',
      price: 1500,
      color: 'orange',
      size: 18,
      inventory: 100
    },
    {
      name: 'Pete the Rabbit',
      imageUrl: '../images/pete-the-rabbit.jpg',
      description:
        'Bring the beloved once-upon-a-time tale to your table with the Peter Rabbit™ Collection. Each nostalgic design comes from the whimsical, imaginative drawings of famed illustrator and children’s storyteller Beatrix Potter™, making for the sweetest of springtime celebrations.',
      price: 1600,
      color: 'white',
      size: 21,
      inventory: 5
    },
    {
      name: 'Buddies Central Perk',
      imageUrl: '../images/central-perk.jpg',
      description:
        "In celebration of the show's 25th anniversary, we teamed up with our Buddies to create a special collection for fans everywhere. Sip your favorite morning brew from this Gunther-approved mug, which will make you feel like you're in a cozy coffee shop.",
      price: 1950,
      color: 'white',
      size: 14,
      inventory: 60
    },
    {
      name: 'Smelly Cat',
      imageUrl: '../images/smelly-cat.jpg',
      description:
        'A scent-sational gift for any Friends lover on your holiday list, this quirky mug features a line from Phoebe’s iconic ballad. (Warning: It may inspire a singalong.)',
      price: 1850,
      color: 'white',
      size: 14,
      inventory: 200
    },
    {
      name: 'For the Coffee Lovers',
      imageUrl: '../images/coffee.jpg',
      description:
        'It’s always the quiet gestures of giving that truly make the holidays meaningful. We donate 50% of the purchase price of select items sold during the holiday season to the Give a Little Hope campaign, which benefits organizations that provide temporary and long-term housing for youth and families.',
      price: 1350,
      color: 'white',
      size: 16,
      inventory: 80
    },
    {
      name: 'Blue Stoneware',
      imageUrl: '../images/blue-stoneware.jpg',
      description:
        'Replicated from a hand-thrown original, this mug reveals an organic textural feel and look. Artisans apply the glazed detail by hand. This synthesis between the artist and designer results in fine dinnerware that you will want to use for elegant dinners as well as casual meals.',
      price: 2099,
      color: 'blue',
      size: 16,
      inventory: 40
    },
    {
      name: 'Every Day is Earth Day',
      imageUrl: '../images/earth-day.jpg',
      description:
        'As part of our commitment to do things more mindfully, we partner with nonprofits to offer limited-edition products that give back to causes we care about. In celebration of Earth Day this year, we are partnering with the Forest Stewardship Council® to bring this important reminder to your home. FSC® is a worldwide land-management organization that works to prohibit deforestation, protect the rights of indigenous peoples, and protect rare, threatened, and endangered species – and 25% of the proceeds from your purchase of this mug will directly support that work.',
      price: 1500,
      color: 'white',
      size: 16,
      inventory: 35
    },
    {
      name: 'Lemon Leaves',
      imageUrl: '../images/lemon.jpg',
      description:
        'The Lemon Leaves mug is masterfully painted by hand to create its signature leaves, vines and citrus. Artists in Mexico City use precise brushstrokes in a classic palette of tonal blues and yellows to bring the designs to life; no two pieces are exactly the same.',
      price: 950,
      color: 'white',
      size: 16,
      inventory: 35
    },
    {
      name: 'Stone',
      imageUrl: '../images/stone.jpg',
      description:
        'Crafted in Portugal, famed for its exceptional ceramics, the Stone mug has an authentic artisanal look and feel. With gently scalloped rims that are embossed and hand rubbed along the edges with a soft patina, this fine stoneware exhibits a light texture and has a decidedly romantic appeal.',
      price: 1900,
      color: 'grey',
      size: 12,
      inventory: 55
    },
    {
      name: 'The Classic',
      imageUrl: '../images/classic.jpg',
      description:
        'Graceful contours and a silky-smooth glaze give our clean-lined Classic mug artisanal appeal. Shaped from stoneware, these mugs are coated in a subtle reactive glaze and kiln-fired to perfection.',
      price: 2050,
      color: 'red',
      size: 13,
      inventory: 60
    },
    {
      name: 'Trevor',
      imageUrl: '../images/trevor.jpg',
      description:
        'Graceful contours In celebration of Pride this year, we are partnering with The Trevor Project to bring this colorful collection to your home. The Trevor Project is the world’s largest suicide prevention and crisis intervention organization for young LGBTQ people. It offers free, confidential counseling and support programs – and 25% of the proceeds from your purchase of this mug will directly support that work.',
      price: 1500,
      color: 'white',
      size: 16,
      inventory: 40
    },
    {
      name: 'Festive Reindeer',
      imageUrl: '../images/reindeer.jpg',
      description:
        'This perky reindeer joins the festivities. Perfect for eggnog on Christmas Eve or rich hot cocoa while opening presents, this hand-painted figural mug makes it all the more cozy.',
      price: 2199,
      color: 'brown',
      size: 12,
      inventory: 25
    }
  ]

  //bulk create mugs in database
  //const [pumpkin, peteTheRabbit, buddies, smelly, coffee, blue, earth, lemon, stone, classic, trevor, reindeer] = await Mug.bulkCreate(mugs)
  const mugs = await Mug.bulkCreate(mugArr)
  console.log('Seeded Mugs')

  //sample orders
  const statuses = ['inCart', 'processing', 'shipped', 'delivered']
  const getRandomStatus = () =>
    statuses[Math.floor(Math.random() * statuses.length)]

  function generateOrders(num) {
    let orders = []
    for (let i = 0; i < num; i++) {
      orders.push({
        number: faker.random.number(),
        orderStatus: getRandomStatus()
      })
    }
    return orders
  }

  //bulk create orders in database
  const orders = await Order.bulkCreate(generateOrders(16))
  console.log('Seeded Orders')

  //sample users
  function generateUsers(num) {
    let users = []
    for (let i = 0; i < num; i++) {
      users.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        isAdmin: faker.random.boolean(),
        shippingStreet: faker.address.streetAddress(),
        shippingState: faker.address.state(),
        shippingCity: faker.address.city(),
        shippingZip: faker.address.zipCode()
      })
    }
    return users
  }

  //bulk create users in database
  const users = await User.bulkCreate(generateUsers(6))
  console.log('Seeded Users')

  //assign orders to users
  await users[0].setOrders(orders.slice(0, 2))
  await users[1].setOrders(orders.slice(2, 4))
  await users[2].setOrders(orders.slice(4, 6))
  await users[3].setOrders(orders.slice(6, 9))
  await users[4].setOrders(orders.slice(9, 12))
  await users[5].setOrders(orders.slice(12, 17))

  //assigning mugs to orders
  const mugOrders = [
    {
      mugId: mugs[0].id,
      orderId: orders[0].id,
      quantity: 2
    },
    {
      mugId: mugs[0].id,
      orderId: orders[1].id,
      quantity: 1
    },
    {
      mugId: mugs[1].id,
      orderId: orders[0].id,
      quantity: 3
    },
    {
      mugId: mugs[1].id,
      orderId: orders[1].id,
      quantity: 2
    },
    {
      mugId: mugs[2].id,
      orderId: orders[2].id,
      quantity: 1
    },
    {
      mugId: mugs[2].id,
      orderId: orders[3].id,
      quantity: 3
    },
    {
      mugId: mugs[4].id,
      orderId: orders[2].id,
      quantity: 1
    },
    {
      mugId: mugs[3].id,
      orderId: orders[2].id,
      quantity: 2
    },
    {
      mugId: mugs[5].id,
      orderId: orders[4].id,
      quantity: 1
    },
    {
      mugId: mugs[7].id,
      orderId: orders[4].id,
      quantity: 2
    }
  ]

  await MugOrder.bulkCreate(mugOrders)
  console.log('Seeded MugOrders')

  //assign orders to mugs
  //await mugs[2].setOrders(orders[1])
  //await mugs[1].setOrders(orders.slice(2,4))
  //await mugs[2].setOrders(orders.slice(4,6))
  //await mugs[3].setOrders(orders.slice(6,8))
  //await mugs[4].setOrders(orders.slice(8,12))
  //await mugs[5].setOrders(orders.slice(12,14))
  //await mugs[6].setOrders(orders.slice(14,16))
  //await mugs[7].setOrders(orders.slice(16,17))

  //assign mugs to orders
  //await orders[0].setMugs(mugs.slice(0,2))
  //await orders[1].setMugs(mugs.slice(2,4))
  //await orders[2].setMugs(mugs.slice(4,6))
  //await orders[3].addMugs(mugs.slice(6,8))
  //await orders[4].addMugs(mugs.slice(8,10))
  //await orders[5].addMugs(mugs.slice(10,12))

  /* const mugOrders = await MugOrder.findAll()
  for (let i = 0; i < mugOrders.length; i++) {
    await mugOrders[i].update({
      quantity: Math.floor(Math.random() * 20),
      price: i * 10
    })
  } */

  //await MugOrder.bulkCreate(mugOrders)
  //  console.log('Seeded MugOrders')
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
