var AWS = require("aws-sdk");
const router = require("express").Router();
// const csv = require('fast-csv');
// const csvStream = csv.format({ headers: true });
const csvjson = require("csvjson");
var s3 = new AWS.S3();
var params = { Bucket: "www.e-procurement.com", Key: "OCID.csv" };
var params_json = { Bucket: "www.e-procurement.com", Key: "sample.json" };

//register User

router.get("/", async (req, res) => {
  await s3
    .getObject(params)
    .createReadStream()
    .on("data", (data) => {
      var fileContent = data.toString();
      const jsonObj = csvjson.toObject(fileContent);

      return res.send(jsonObj);
    });
});

router.get("/json", async (req, res) => {
  const record = s3.getObject(params_json, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      // console.log(data.Body.toString()); //this will log data to console
    }
  });
});

router.get("/json-download/:id", function (req, res) {
  const { id } = req.params;

  const fileKey = id + ".json";

  var options = {
    Bucket: "www.e-procurement.com",
    Key: fileKey,
  };

  res.attachment(fileKey);
  var fileStream = s3.getObject(options).createReadStream();
  fileStream.pipe(res);
});

module.exports = router;
