
exports.name = "controllers.tripadvisor";
const escapeStringRegexp = require('escape-string-regexp');

exports.requires = ["@lodash", "@util", "models.tripadvisor"];

exports.factory = function (_, util, Tripadvisor) {
  const getAll = (req, res, next) => {
    Tripadvisor.find({}, function (
        err,
        tripadvisor
    ) {
        if (err) {
            console.error(err);
            res.status(404).send({
                errors: [err.message],
            });
            return;
        }
        res.json({ tripadvisor });
    });
  };

  const getDataByName = (req, res, next) => {
    const name  = req.params.name;
    // const name = 'Dal Vostro Hotel & Spa';
    Tripadvisor.find({name: name}, function (err, tripadvisor) {
        if (err) {
            console.error(err);
            res.status(404).send({
                errors: [err.message],
            });
            return;
        }
        res.json({ tripadvisor });
    });
};

const getDataLikeName = (req, res, next) => {
  const name  = req.params.name;
  const $regex = escapeStringRegexp(name);

  // const name = 'Dal Vostro Hotel & Spa';
  Tripadvisor.find({name: {$regex}}, function (err, tripadvisor) {
      if (err) {
          console.error(err);
          res.status(404).send({
              errors: [err.message],
          });
          return;
      }
      res.json({ tripadvisor });
  });
};

  const updateDataHotel = (req, res, next) => {
    const { name, roomtype, comment} = _.get(req, "body", "");
    
    // tasks.update({time: "0h"}, {$set: {"actionName.0": {name: "Te", action: "test", number: "0"}}})
    // tasks.update({time: "0h"}, {$push: {"actionName.1.actions": {action: "test"}}})
    Tripadvisor.update({name: name}, {$push: {roomtype: roomtype, comment: comment}})
      .then((data) => {
        if (!data) {
          res.status(404).send({
            errors: "Có lỗi xảy ra!",
          });
        } else res.send({ message: "Successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error",
        });
      });
  }

  const tripadvisorCrawlHanoi = (req, res, next) => {
    const exec = util.promisify(require('child_process').exec);
    async function lsWithGrep() {
      try {
        console.log('Crawling In Tripadvisor Hà Nội');
        const { stdout, stderr } = await exec('command/tripadvisorhanoi');
        console.log(stdout);
        console.log(stderr);
        console.log('Done');
        res.send({ message: "Successfully." })
      }catch (err) {
         console.error(err);
      };
    };
    lsWithGrep();
  }

  const tripadvisorCrawlHoChiMinh = (req, res, next) => {
    const exec = util.promisify(require('child_process').exec);
    async function lsWithGrep() {
      try {
        console.log('Crawling In Tripadvisor Hồ Chí Minh');
        const { stdout, stderr } = await exec('command/tripadvisorhochiminh');
        console.log(stdout);
        console.log(stderr);
        console.log('Done');
        res.send({ message: "Successfully." })
      } catch (err) {
        console.error(err);
      };
    };
    lsWithGrep();
  }

  const tripadvisorCrawlNhaTrang = (req, res, next) => {
    const exec = util.promisify(require('child_process').exec);
    async function lsWithGrep() {
      try {
        console.log('Crawling In Tripadvisor Nha Trang');
        const { stdout, stderr } = await exec('command/tripadvisornhatrang');
        console.log(stdout);
        console.log(stderr);
        console.log('Done');
        res.send({ message: "Successfully." })
      } catch (err) {
        console.error(err);
      };
    };
    lsWithGrep();
  }

  const tripadvisorCrawlDaLat = (req, res, next) => {
    const exec = util.promisify(require('child_process').exec);
    async function lsWithGrep() {
      try {
        console.log('Crawling In Tripadvisor Đà Lạt');
        const { stdout, stderr } = await exec('command/tripadvisordalat');
        console.log(stdout);
        console.log(stderr);
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
    getDataByName,
    updateDataHotel,
    getDataLikeName, 
    tripadvisorCrawlHanoi,
    tripadvisorCrawlHoChiMinh,
    tripadvisorCrawlNhaTrang,
    tripadvisorCrawlDaLat
  };

};
