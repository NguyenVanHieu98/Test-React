"use strict";
exports.name = "controllers.myapp";
const escapeStringRegexp = require('escape-string-regexp');

exports.requires = ["@lodash", "@util", "models.myapp"];

exports.factory = function (_, util, MyApp) {
  const getAll = (req, res, next) => {
    MyApp.find({}, function (
        err,
        myapp
    ) {
        if (err) {
            console.error(err);
            res.status(404).send({
                errors: [err.message],
            });
            return;
        }
        res.json({ myapp });
    });
  };

  const getDataByName = (req, res, next) => {
    const name  = req.params.name;
    // const name = 'Dal Vostro Hotel & Spa';
    MyApp.find({name: name}, function (err, myapp) {
        if (err) {
            console.error(err);
            res.status(404).send({
                errors: [err.message],
            });
            return;
        }
        res.json({ myapp });
    });
};

const getDataLikeName = (req, res, next) => {
  const name  = req.params.name;
  const $regex = escapeStringRegexp(name);

  // const name = 'Dal Vostro Hotel & Spa';
  MyApp.find({name: {$regex}}, function (err, myapp) {
      if (err) {
          console.error(err);
          res.status(404).send({
              errors: [err.message],
          });
          return;
      }
      res.json({ myapp });
  });
};

const updateMyData = (req, res, next) => {
  const { name, district, place, img, review, convenient, roomtype, comment } = _.get(req, "body", "");
  
  // tasks.update({time: "0h"}, {$set: {"actionName.0": {name: "Te", action: "test", number: "0"}}})
  // tasks.update({time: "0h"}, {$push: {"actionName.1.actions": {action: "test"}}})
  MyApp.update({name: name},
      {
        $push: {img: img, review: review, convenient: convenient, roomtype: roomtype, comment: comment},
        $set: {district: district, place: place}
    }
    )
    .then((data) => {
      if (!data) {
        res.status(404).send({
          errors: "Error",
        });
      } else res.send({ message: "Successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error",
      });
    });
};


  const createData = (req, res, next) => {
    const { name, district, place, img, review, convenient, roomtype, comment } = _.get(req, "body", "");

    new MyApp({
        name: name,
        district: district,
        place: place,
        img: img,
        review: review,
        convenient: convenient,
        roomtype: roomtype,
        comment: comment,
    }).save(function (err, myapp) {
        if (err) {
            console.error(err);
            res.status(500).send({
                errors: [err.message],
            });
            return;
        }
        res.json({ myapp });
    });
};



  return {
    getAll,
    getDataByName,
    updateMyData,
    getDataLikeName, 
    createData,
  };

};
