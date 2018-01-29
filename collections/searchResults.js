import Backbone from "backbone";
import SearchResult from "../models/searchResult";

const SearchResults = Backbone.Collection.extend({
  model: SearchResult,
  url:
    "https://dev.nceas.ucsb.edu/knb/d1/mn/v2/query/solr/?q=*:*+AND+formatType:METADATA&title:*&fl=title&wt=json",
  parse: function(data) {
    return data.response.docs;
  }
});

export default SearchResults;
