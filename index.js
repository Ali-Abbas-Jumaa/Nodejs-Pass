const express = require('express');
var fs = require('fs');

const app = express();
app.use(express.json());
const router = express.Router();
app.use(router)

app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
})

var fs = require('fs');
var lines = fs.readFileSync('orders.txt').toString().split("\n");

var total = 0;
var orders = [];
var order = {};
var index = 0;
var numberOfItems = 0
var indexOfItems = 0;
lines.forEach((line, i) => {
    if (line != ",") {
        if (index == 0) {
            order["name"] = line
        } else if (index == 1) {
            var directions = line.split(" ");
            var address = {
                "latitude": directions[0],
                "longitude": directions[1],
            }
            order["address"] = address;
        }else if(index == 2){
            numberOfItems = line - 0
        }else if (index == 3) {
            var attributes = line.split(" ");
            console.log(line)
            var item = {
                "name": attributes[0],
                "count": attributes[1]-0,
                "price": attributes[2]-0,
                "total": attributes[3]-0,
            }
            order["items"] = []
            order["items"].push(item)
            indexOfItems++
        }else if(index > 3 && indexOfItems < numberOfItems){
            var attributes = line.split(" ");
            console.log(line)
            var item = {
                "name": attributes[0],
                "count": attributes[1] -0,
                "price": attributes[2] -0,
                "total": attributes[3] -0,
            }
            order["items"].push(item)
            indexOfItems++
        }else{
            var attributes = line.split(" ");
            order["total"] = attributes[0] -0;
            order["discount"] = attributes[1] -0;
            order["totalAfterDiscount"] = attributes[2] -0;
            total += attributes[2] -0;
        }
        index++
    } else {
        orders.push(order);
        order = {};
        index = 0;
        numberOfItems = 0
        indexOfItems = 0;
    }
})
orders.push(order)
order = {}




router.get('/orders', async (req, res) => {
    try {
        res.json({orders, "total": total})
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
