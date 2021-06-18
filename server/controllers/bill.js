
exports.name = "controllers.bill";

exports.requires = ["@lodash", "@util", "models.bill"];

exports.factory = function (_, util, Bill) {

    const getAll = (req, res, next) => {
        Bill.find({}, function (
            err,
            bills
        ) {
            if (err) {
                console.error(err);
                res.status(404).send({
                    errors: [err.message],
                });
                return;
            }
            res.json({ bills });
        });
    };

    const getBillByUser = (req, res, next) => {
        const email = req.params.email;
        Bill.find({ email }, function (err, bill) {
            if (err) {
                console.error(err);
                res.status(404).send({
                    errors: [err.message],
                });
                return;
            }
            res.json({ bill });
        });
    };

    const getBillByStatus = (req, res, next) => {
        const status = req.params.status;
        Bill.find({ status }, function (err, bill) {
            if (err) {
                console.error(err);
                res.status(404).send({
                    errors: [err.message],
                });
                return;
            }
            res.json({ bill });
        });
    };

    const getBillByUserAndStatus = (req, res, next) => {
        const email = req.params.email;
        const status = '0';
        Bill.find({ email, status }, function (err, bill) {
            if (err) {
                console.error(err);
                res.status(404).send({
                    errors: [err.message],
                });
                return;
            }
            res.json({ bill });
        });
    };

    const getBillByUserAndStatus1 = (req, res, next) => {
        const email = req.params.email;
        const status = '1';
        Bill.find({ email, status }, function (err, bill) {
            if (err) {
                console.error(err);
                res.status(404).send({
                    errors: [err.message],
                });
                return;
            }
            res.json({ bill });
        });
    };

    const updateBill = (req, res, next) => {
        const id = req.params.billId;
        Bill.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then((data) => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot update Bill with id=${id}. Maybe Tutorial was not found!`,
                    });
                } else res.send({ message: "Bill was updated successfully." });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error",
                });
            });
    };

    const newBill = (req, res, next) => {
        const { name, email, phone, hotel, room, date, time } = _.get(req, "body", "");

        new Bill({
            name: name,
            email: email,
            phone: phone,
            hotel: hotel,
            room: room,
            date: date,
            time: time,
            status: '0',
        }).save(function (err, bill) {
            if (err) {
                console.error(err);
                res.status(500).send({
                    errors: [err.message],
                });
                return;
            }
            res.json({ bill });
        });
    };

    const deleteBill = (req, res, next) => {
        const id = req.params.billId;
        Bill.findByIdAndRemove(id)
            .exec()
            .then(() =>
                res.status(204).json({
                    success: true,
                })
            )
            .catch((err) =>
                res.status(500).json({
                    success: false,
                })
            );
    };

    return {
        getAll,
        getBillByUser,
        getBillByStatus,
        getBillByUserAndStatus,
        getBillByUserAndStatus1,
        updateBill,
        newBill,
        deleteBill
    };

};
