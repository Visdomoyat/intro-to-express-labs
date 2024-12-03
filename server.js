const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

//**********************************IMPORT EXPRESS********************
const express = require('express')
const morgan = require('morgan')
const app = express()
const collectibles = require('./Data/collectibles')

/******************************************************** 
 *  * middleware
**********************************************************/
app.use(morgan('dev'))
app.use(express.json())



/******************************************************** 
 *  * ROUTES 
**********************************************************/
app.get('/greetings/:username', (req, res) => {
    const name = req.params.username
    res.send(`<h1> Hi  ${name}, I hope you are well</h1>`)
})

app.get('/roll/:number', (req, res) => {
    let number = parseInt(req.params.number);

    if (number >= 1 && number <= 12) {
        res.json(`You rolled ${number}`)
    } else {
        res.json('You must specify a valid number')
    }
})

app.get('/collectibles/:id', (req, res) => {
    const id = collectibles.forEach(collectible => {
        if (collectible.price === 5.95) {
            collectible.id = 1
        } else if (collectible.price === 10) {
            collectible.id = 2
        } else if (collectible.price === 0.99) {
            collectible.id = 3
        }
    })
    console.log("updated collectibles", collectibles)

    const requestedId = parseInt(req.params.id);
    console.log(`Requested ID: ${requestedId}`);
    const collectible = collectibles.find(collectible => collectible.id === requestedId

    )
    console.log('matching collectible:', collectible);

    if (collectible) {
        res.send(`so you want ${collectible.name}? For ${collectible.price}.`)
    } else {
        res.status(404).send("this item is not yet in stock. check back soon!")
    }


})

app.get('/shoes', (req, res) => {
    const {
        minPrice,
        maxPrice,
        type
    }  = req.query

    let filteredShoes = shoes;

    if(minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice))
    }

    if(maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice))
    }

    if(type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase())
    }
res.json(filteredShoes)
});





/******************************************************** 
 *  LISTENING* 
**********************************************************/
const PORT = 3003
app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
})