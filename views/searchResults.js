import Backbone from "backbone";
import SearchResultsTemplate from "../templates/searchResults.html";

var SearchResultsView = Backbone.View.extend({
  template: SearchResultsTemplate,
  el: "#searchResults",
  initialize: function() {
    this.collection.bind("reset", this.render, this);
  },
  render: function() {
    $(this.el).html(this.template({ results: this.collection.toJSON() }));

    return this;
  }
});

export default SearchResultsView;
