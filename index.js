const fs = require("fs");
const api = require("./api");
const { domainName, apiPath } = require("./constants");

const createApi = async (rawUrl, extraId, data) => {
  const url = rawUrl
    .replace("extraId", extraId)
    .replace("domainName", domainName);
  return await api(url, "post", data);
};

(async () => {
  fs.readFile("old_data/result.json", "utf8", async (err, res) => {
    if (err) throw err;
    const data = JSON.parse(res);
    for (const catId of Object.keys(data.categories)) {
      const category = data.categories[catId];
      const newCat = await createApi(apiPath.category, "", {
        category: {
          name: category.name,
          locale: category.locale,
          position: category.position,
          description: category.description,
        },
      });

      console.log("Added new category: ", category.name);
      const newCatId = newCat.category.id;
      for (const secId of Object.keys(category.sections)) {
        const section = category.sections[secId];
        const newSec = await createApi(apiPath.section, newCatId, {
          section: {
            name: section.name,
            locale: section.locale,
            position: category.position,
            description: category.description,
          },
        });

        const newSecId = newSec.section.id;
        for (const articleId of Object.keys(section.articles)) {
          const article = section.articles[articleId];
          await createApi(apiPath.article, newSecId, {
            article: {
              name: article.name,
              title: article.title,
              locale: article.locale,
              position: article.position,
              body: article.body,
              user_segment_id: article.user_segment_id,
              permission_group_id: article.permission_group_id,
            },
          });
        }

        console.log("Added all articles for section: ", section.name);
      }
    }

    console.log("Migration finished!");
  });
})();
