const { Cart, User, Mug, Order, db } = require("./server/db")

const seed = async () => {
  try {
    await db.sync({ force: true })
    const mugs = [
      { name: "Pumpkin", description: "Carved of stoneware and finished in a modern matte glaze, this mug-sized pumpkin makes a festive holder for ginger beer, warm apple cider and other fall favorites", price: 15.00, color: "orange", size: 18, inventory: 100},
      { name: "Pete the Rabbit", description: "Bring the beloved once-upon-a-time tale to your table with the Peter Rabbit™ Collection. Each nostalgic design comes from the whimsical, imaginative drawings of famed illustrator and children’s storyteller Beatrix Potter™, making for the sweetest of springtime celebrations.", price: 16.00, color: "white", size: 21, inventory: 5},
      { name: "Buddies Central Perk", description: "In celebration of the show's 25th anniversary, we teamed up with our Buddies to create a special collection for fans everywhere. Sip your favorite morning brew from this Gunther-approved mug, which will make you feel like you're in a cozy coffee shop.", price: 19.50, color: "white", size: 14, inventory: 60},
      { name: "Smelly Cat", description: "A scent-sational gift for any Friends lover on your holiday list, this quirky mug features a line from Phoebe’s iconic ballad. (Warning: It may inspire a singalong.)", price: 18.50, color: "white", size: 14, inventory: 200}
    ];

    const [pumpkin, peteTheRabbit, buddies, smelly] = await Mug.bulkCreate(mugs);
  } catch (error) {
    console.error(error);
  }
}
