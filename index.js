const fs = require("fs");
const axios = require("axios");
const env = require("node-env-file");

env(__dirname + "/.env");

const createCategory = async (data) => {
  const url =
    "https://ffsupportsg.zendesk.com/api/v2/help_center/en-us/categories.json";

  const res = await axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.TOKEN}`,
    },
    url,
    data,
  });
  return res.data;
};

const createSection = async (catId, data) => {
  const url = `https://ffsupportsg.zendesk.com/api/v2/help_center/en-us/categories/${catId}/sections.json`;
  const res = await axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.TOKEN}`,
    },
    url,
    data,
  });
  return res.data;
};

const createArticle = async (secId, data) => {
  const url = `https://ffsupportsg.zendesk.com/api/v2/help_center/en-us/sections/${secId}/articles.json`;
  const res = await axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.TOKEN}`,
    },
    url,
    data,
  });
  return res.data;
};

const main = async () => {
  console.log(process.env.TOKEN);
  // fs.readFile("old_data/result.json", "utf8", async (err, res) => {
  //   if (err) throw err;
  //   const data = JSON.parse(res);
  //   for (const catId of Object.keys(data.categories)) {
  //     const category = data.categories[catId];
  //     const newCat = await createCategory({
  //       category: {
  //         name: category.name,
  //         locale: category.locale,
  //         position: category.position,
  //         description: category.description,
  //       },
  //     });
  //     console.log("Added new category: ", category.name);
  //     const newCatId = newCat.category.id;

  //     for (const secId of Object.keys(category.sections)) {
  //       const section = category.sections[secId];
  //       const newSec = await createSection(newCatId, {
  //         section: {
  //           name: section.name,
  //           locale: section.locale,
  //           position: category.position,
  //           description: category.description,
  //         },
  //       });
  //       const newSecId = newSec.section.id;

  //       for (const articleId of Object.keys(section.articles)) {
  //         const article = section.articles[articleId];
  //         await createArticle(newSecId, {
  //           article: {
  //             name: article.name,
  //             title: article.title,
  //             locale: article.locale,
  //             position: article.position,
  //             body: article.body,
  //             user_segment_id: article.user_segment_id,
  //             permission_group_id: article.permission_group_id,
  //           },
  //         });
  //       }

  //       console.log("Added all articles for section: ", section.name);
  //     }
  //   }

  //   console.log("Migration finished!");
  // });
};

main();
