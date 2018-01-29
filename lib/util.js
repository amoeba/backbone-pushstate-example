const util = {
  parseQueryString: function(value) {
    if (value == null || typeof value !== "string" || value.length <= 0) {
      return {};
    }

    return _.chain(value)
      .split("&")
      .map(function(x) {
        return _.split(x, "=", 2);
      })
      .fromPairs()
      .value();
  }
};

export default util;
