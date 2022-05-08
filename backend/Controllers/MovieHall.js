const Hall = require('../Models/MovieHall')


exports.addhall = (req, res) => {
    const hall = new Hall(req.body)

    let seats = []
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (var i = 0; i < hall.rows; i++) {
        for (var j = 0; j < hall.cols; j++) {
            let se = alphabet.charAt(i) + String(j + 1)
            seats.push(se)
        }
    }
    hall.seats = seats;
    hall.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "hall allready Exists"
            })
        }
        else {
            res.json({ data })
        }
    })
}

exports.allHalls = (req, res) => {
    Hall.find().exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: String(err)
            })
        }
        res.json(result)
    })
}