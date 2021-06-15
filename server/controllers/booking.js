
exports.name = "controllers.booking";

exports.requires = ["@lodash", "@util", "models.booking"];

exports.factory = function (_, util, Booking) {
  const getAll = (req, res, next) => {
    Booking.find({}, function (
        err,
        booking
    ) {
        if (err) {
            console.error(err);
            res.status(404).send({
                errors: [err.message],
            });
            return;
        }
        res.json({ booking });
    });
  };

  const bookingCrawlHanoi = (req, res, next) => {
    const exec = util.promisify(require('child_process').exec);
    async function lsWithGrep() {
      try {
        console.log('Crawling In Booking Hà Nội');
        await exec('command/bookinghanoi');
        console.log('Done');
        res.send({ message: "Successfully." })
      }catch (err) {
         console.error(err);
      };
    };
    lsWithGrep();
  };

  const bookingCrawlHoChiMinh = (req, res, next) => {
    const exec = util.promisify(require('child_process').exec);
    async function lsWithGrep() {
      try {
        console.log('Crawling In Booking Hồ Chí Minh');
        await exec('command/bookinghochiminh');
        console.log('Done');
        res.send({ message: "Successfully." })
      } catch (err) {
        console.error(err);
      };
    };
    lsWithGrep();
  };

  const bookingCrawlNhaTrang = (req, res, next) => {
    const exec = util.promisify(require('child_process').exec);
    async function lsWithGrep() {
      try {
        console.log('Crawling In Booking Nha Trang');
        await exec('command/bookingnhatrang');
        console.log('Done');
        res.send({ message: "Successfully." })
      } catch (err) {
        console.error(err);
      };
    };
    lsWithGrep();
  };

  const bookingCrawlDaLat = (req, res, next) => {
    const exec = util.promisify(require('child_process').exec);
    async function lsWithGrep() {
      try {
        console.log('Crawling In Booking Đà Lạt');
        await exec('command/bookingdalat');
        console.log('Done');
        res.send({ message: "Successfully." })
      } catch (err) {
        console.error(err);
      };
    };
    lsWithGrep();
  }


  return {
    getAll,
    bookingCrawlHanoi,
    bookingCrawlHoChiMinh,
    bookingCrawlNhaTrang,
    bookingCrawlDaLat
  };

};
