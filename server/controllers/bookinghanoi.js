"use strict";
exports.name = "controllers.bookinghanoi";

exports.requires = ["@lodash", "@util", "models.bookinghanoi"];

exports.factory = function (_, util, Bookinghanoi) {
  const getAll = (req, res, next) => {
    Bookinghanoi.find({}, function (
        err,
        bookinghanoi
    ) {
        if (err) {
            console.error(err);
            res.status(404).send({
                errors: [err.message],
            });
            return;
        }
        res.json({ bookinghanoi });
    });
  };

  const bookingCrawl = (req, res, next) => {
    const exec = util.promisify(require('child_process').exec);
    async function lsWithGrep() {
      try {
        console.log('Crawling In Booking Hanoi');
        await exec('command/bookinghanoi');
        console.log('Done');
        res.send({ message: "Successfully." })
      }catch (err) {
         console.error(err);
      };
    };
    lsWithGrep();
  }


  return {
    getAll,
    bookingCrawl,
  };

};
