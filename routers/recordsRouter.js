var AWS = require("aws-sdk");
const router = require("express").Router();
// const csv = require('fast-csv');
// const csvStream = csv.format({ headers: true });
const csvjson = require("csvjson");
var s3 = new AWS.S3();
var params = { Bucket: "www.e-procurement.com", Key: "RecordPackage.csv" };
var params_json = { Bucket: "www.e-procurement.com", Key: "sample.json" };

//register User

router.get("/", async (req, res) => {
  try {
    const record = s3
      .getObject(params)
      .createReadStream()
      .on("data", function (data) {
        var fileContent = data.toString();
        const jsonObj = csvjson.toObject(fileContent);

        return res.send(jsonObj);
      });
  } catch (err) {
    return err;
  }
});
router.get("/json", async (req, res) => {
  try {
    const record = s3.getObject(params_json, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        // console.log(data.Body.toString()); //this will log data to console
      }
    });
  } catch (err) {
    res.json(false);
  }
});

router.get("/json-download/:id", function (req, res) {
  // download the file via aws s3 here

  const { id } = req.params;
  console.log(id);
  const fileKey = id + ".json";

  console.log("Trying to download file", fileKey);

  var options = {
    Bucket: "www.e-procurement.com",
    Key: fileKey,
  };

  res.attachment(fileKey);
  var fileStream = s3.getObject(options).createReadStream();
  fileStream.pipe(res);
});

module.exports = router;
