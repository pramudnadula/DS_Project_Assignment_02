const Movie = require('../Models/Movie')
var ObjectId = require('bson').ObjectId;
exports.allmovies = (req, res) => {
    Movie.find().exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: String(err)
            })
        }
        res.json(result)
    })
}



//method that used to filter movies according to user selection
exports.listbysearch = (req, res) => {
    let order = req.query.order ? req.query.order : 'desc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    var limit
    if (req.body.limit) {
        limit = parseInt(req.body.limit)
    } else {
        limit = 100
    }
    //const isSupervisor = req.body.isSupervisor;
    let skip = parseInt(req.body.skip)
    var ind = 0;
    let findArgs = {}
    // findArgs["isSupervisor"] = isSupervisor;


    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'groups') {

                findArgs["rate"] = {
                    $gt: req.body.filters["groups"][0],
                    $lte: req.body.filters["groups"][1]
                };
            } else {
                let arr = []
                arr = req.body.filters["area"];

                findArgs["area"] = {
                    $in: arr
                }






                // findArgs1 = {
                //     area: req.body.filters[key]
                // }
            }
        }
    }


    Movie.find(findArgs)

        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: String(err)
                })
            }
            res.json({
                size: data.length,
                data
            })
        })
}

exports.getone = (req, res) => {
    let mid = req.params.id;
    const movie = Movie.findById(mid).populate("area").then((mov) => {
        res.json(mov);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "error in fetching", error: err.message });
    })

}