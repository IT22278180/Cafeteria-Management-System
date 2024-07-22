const router = require('express').Router();
const promotionSchema = require('../models/promotion');

router.route('/addPromotion').post((req, res) => {
    const { promotionId, name, promo, status, date,con } = req.body;
    const promotionItem = new promotionSchema({ promotionId, name, promo, status, date,con });
    promotionItem.save()
        .then(() => res.json('Promotion Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/update/:promotionId").put(async (req, res) => {
    const { promotionId } = req.params;
    const { name, promo, status, date,con } = req.body;

    promotionSchema.findOneAndUpdate({ promotionId: promotionId }, { name, promo, status, promotionId, date,con })
        .then(() => {
            res.status(200).send({ status: "Promotion Updated" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Updating Data", error: err.message });
        });
});

router.route("/delete/:promotionId").delete(async (req, res) => {
    const { promotionId } = req.params;

    promotionSchema.findOneAndDelete({ promotionId: promotionId })
        .then(() => {
            res.status(200).send({ status: "Promotion Deleted" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/all").get(async (req, res) => {
    promotionSchema.find()
        .then(promotions => res.json(promotions))
        .catch(err => res.status(400).json('No Data'));
});

module.exports = router;
