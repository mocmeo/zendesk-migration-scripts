const axios = require("axios");
const env = require("node-env-file");

env(__dirname + "/.env");

module.exports = async (url, method, data) => {
  const res = await axios({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.TOKEN}`,
    },
    url,
    data,
    method,
  });
  return res.data;
};
