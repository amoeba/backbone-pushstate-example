import Backbone from "backbone";
import SearchResult from "../models/searchResult";

const SearchResults = Backbone.Collection.extend({
  params: null,
  model: SearchResult,
  initialize: function(models, options) {
    this.params = options.params;
  },
  url: function() {
    return (
      "https://dev.nceas.ucsb.edu/knb/d1/mn/v2/query/solr/?q=" +
      this.params.q +
      '+AND+formatType:METADATA+AND+-obsoletedBy:*&title:*&fl=id,title&rows=25&sort=dateUploaded desc&"&wt=json'
    );
  },
  parse: function(data) {
    return data.response.docs; // TODO: Does nothing right now
  }
});

export default SearchResults;
