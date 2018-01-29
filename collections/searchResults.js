import Backbone from "backbone";
import SearchResult from "../models/searchResult";

const SearchResults = Backbone.Collection.extend({
  model: SearchResult,
  url:
    "https://dev.nceas.ucsb.edu/knb/d1/mn/v2/query/solr/?q=*:*&fl=title&wt=json",
  fetch: function(options) {
    console.log("SearchResults fetch() called");
    var collection = this;

    $.ajax({
      type: "GET",
      url: this.url,
      dataType: "json",
      success: function(data) {
        console.log(data);
        // TODO: Error handling
        collection.reset(data.response.docs);
      }
    });

    return Backbone.Collection.prototype.fetch.call(this, options);
  }
});

export default SearchResults;
