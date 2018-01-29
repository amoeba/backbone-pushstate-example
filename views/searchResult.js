import Backbone from "backbone";

var SearchResultView = Backbone.View.extend({
  render: function() {
    this.$el.html("<span>SearchResultView</span>");
    return this;
  }
});

export default SearchResultView;
