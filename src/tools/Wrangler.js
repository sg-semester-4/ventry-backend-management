class Wrangler {
  filterArrayByQuery(array, query, options) {
    return array.filter((item) =>
      Object.keys(query)
        .map((key) => {
          switch (options ? options.strict : null) {
            case "false":
              if (typeof item[key] === "string") {
                return item[key].includes(query[key]);
              } else {
                return item[key] === query[key];
              }
            default:
              return item[key] === query[key];
          }
        })
        .reduce((prev, curr) => {
          switch (options ? options.method : null) {
            case "or":
              return prev || curr;
            default:
              return prev && curr;
          }
        }, true)
    );
  }
}

export default new Wrangler();
