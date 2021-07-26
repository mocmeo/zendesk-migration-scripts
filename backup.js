const fs = require("fs");
const keyBy = require("lodash/keyBy");
const api = require("./api");
const { domainName, apiPath } = require("./constants");

const fetchApi = async (rawUrl, extraId) => {
  const url = rawUrl
    .replace("extraId", extraId)
    .replace("domainName", domainName);

  return await api(url, "get");
};

const writeToFile = async (fileName, data) => {
  fs.writeFile(`old_data/${fileName}`, JSON.stringify(data, null, 2), (err) =>
    console.log(err)
  );
};

const main = async () => {
  try {
    const result = {};
    const catData = await fetchApi(apiPath.category);
    result.categories = keyBy(catData.categories, "id");

    for (const category of catData.categories) {
      const catId = category.id;
      const sectionData = await fetchApi(apiPath.section, catId);
      result.categories[catId].sections = keyBy(sectionData.sections, "id");

      for (const section of sectionData.sections) {
        const secId = section.id;
        const articleData = await fetchApi(apiPath.article, secId);
        result.categories[catId].sections[secId].articles = keyBy(
          articleData.articles,
          "id"
        );
      }
    }

    await writeToFile("result.json", result);
    console.log("Backup done!");
  } catch (err) {
    console.log(err);
  }
};

main();
