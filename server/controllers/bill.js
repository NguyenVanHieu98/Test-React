"use strict";
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
        const { email } = req.params.email;
        Bill.find({email: 'amazinghieu98@gmail.com'}, function (err, bill) {
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
        const { name, roomtype, comment } = _.get(req, "body", "");

        // tasks.update({time: "0h"}, {$set: {"actionName.0": {name: "Te", action: "test", number: "0"}}})
        // tasks.update({time: "0h"}, {$push: {"actionName.1.actions": {action: "test"}}})
        Bill.update({ name: name }, { $push: { roomtype: roomtype, comment: comment } })
            .then((data) => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot update this Bill!`,
                    });
                } else res.send({ message: "Successfully." });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "Error",
                });
            });
    };

    const newBill = (req, res, next) => {
        const { name, email, phone, hotel, room } = _.get(req, "body", "");

        new Bill({
            name: name,
            email: email,
            phone: phone,
            hotel: hotel,
            room: room,
            status: 0,
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
        updateBill,
        newBill,
        deleteBill
    };

};
