const {db} = require('./server/db')
const {CartItem, Mug, Order, User} = require('./server/db/models')

const seed = async () => {
  try {
    await db.sync({force: true})

    //sample mugs
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

    //sample users
    const users = [
      {
        firstName: 'Lauryn',
        lastName: 'Kim',
        email: 'lauryn@email.com',
        password: 'lauryn1122',
        isAdmin: true
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

    //sample orders
    const orders = [
      {
        number: 123,
        shippingStatus: 'shipped',
        mugId: buddies.id,
        userId: Lauryn.id
      },
      {
        number: 357,
        shippingStatus: 'processing',
        mugId: peteTheRabbit.id,
        userId: Hatibe.id
      },
      {
        number: 34,
        shippingStatus: 'delivered',
        mugId: smelly.id,
        userId: Traci.id
      }
    ]

    //bulk create orders in database
    const [orderOne, orderTwo, orderThree] = await Order.bulkCreate(orders)
    console.log('Seeded Orders')

    //sample carts
    const carts = [
      {
        mugId: buddies.id,
        orderId: orderOne.id,
        quantityPerItem: 3,
        userId: Lauryn.id
      },
      {mugId: smelly.id, userId: Traci.id, orderId: orderThree.id},
      {mugId: peteTheRabbit.id, orderId: orderTwo.id, userId: Hatibe.id}
    ]

    //Bulk create carts in database
    const [cartOne, cartTwo, cartThree] = await CartItem.bulkCreate(carts)
    console.log('Seeded CartItems')

    console.log('database seeded')
  } catch (error) {
    console.error(error)
  }
}

seed()
