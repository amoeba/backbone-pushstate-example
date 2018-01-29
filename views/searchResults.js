import Backbone from "backbone";
import SearchResult from "./searchResult";
import SearchResultsTemplate from "../templates/searchResults.html";

var SearchResultsView = Backbone.View.extend({
  el: $("#searchResults"),
  template: SearchResultsTemplate,
  render: function() {
    this.collection.each(function(result) {
      console.log("this.collection.each", result);
      var searchResult = new SearchResult({
        model: result
      });

      this.$el.append(searchResult.render().el);
    }, this);

    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

export default SearchResultsView;
