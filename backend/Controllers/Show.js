const Show = require('../Models/Show')
const moment = require('moment')
const Movie = require('../Models/Movie')
exports.allshows = (req, res) => {
    Show.find().exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: String(err)
            })
        }
        res.json(result)
    })
}

exports.createShow = (req, res) => {
    const show = new Show(req.body)

    show.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "show allready Exists"
            })
        }
        else {
            res.json({ data })
        }
    })
}

exports.specificshows = (req, res) => {
    let mid = req.params.id;
    var resu = []
    const shows = Show.find({ mid: mid }).then((movs) => {
        for (var i = 0; i < movs.length; i++) {
            const d1 = moment(movs[i].date, "YYYY MM DD")
            var current = moment().startOf('day');
            var dif = moment.duration(d1.diff(current)).asDays()
            if (dif >= 0) {
                resu.push(movs[i])
            }

        }
        res.json(resu);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "error in fetching", error: err.message });
    })

}

exports.getoneshow = (req, res) => {
    let mid = req.params.id;
    const show = Show.findById(mid).populate("hid").then((sh) => {
        res.json(sh);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "error in fetching", error: err.message });
    })

}