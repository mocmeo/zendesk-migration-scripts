const fs = require("fs");
const axios = require("axios");
const keyBy = require("lodash/keyBy");

// fetch old data
const fetchOldCategories = async () => {
  const url =
    "https://ffsupport.zendesk.com/api/v2/help_center/en-us/categories.json";

  const res = await axios.get(url);
  return res.data.categories;
};

const fetchOldSections = async (categoryId) => {
  const url = `https://ffsupport.zendesk.com/api/v2/help_center/en-us/categories/${categoryId}/sections`;
  const res = await axios({
    method: "get",
    url,
  });

  return res.data.sections;
};

const fetchOldArticles = async (sectionId) => {
  const url = `https://ffsupport.zendesk.com/api/v2/help_center/en-us/sections/${sectionId}/articles`;
  const res = await axios({ method: "get", url });
  return res.data.articles;
};

const writeToFile = async (fileName, data) => {
  fs.writeFile(`old_data/${fileName}`, JSON.stringify(data, null, 2), (err) =>
    console.log(err)
  );
};

const main = async () => {
  try {
    const result = {};
    const categories = await fetchOldCategories();
    result.categories = keyBy(categories, "id");

    for (const category of categories) {
      const catId = category.id;
      const sections = await fetchOldSections(catId);
      result.categories[catId].sections = keyBy(sections, "id");

      for (const section of sections) {
        const secId = section.id;
        const articles = await fetchOldArticles(secId);
        result.categories[catId].sections[secId].articles = keyBy(
          articles,
          "id"
        );
      }
    }

    await writeToFile("result.json", result);
  } catch (err) {
    console.log(err);
  }
};

main();
