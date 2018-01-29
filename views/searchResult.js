import Backbone from "backbone";
import SearchResultTemplate from "../templates/searchResult.html";

var SearchResultView = Backbone.View.extend({
  template: SearchResultTemplate,
  render: function() {
    console.log(this.model.toJSON());
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

export default SearchResultView;
