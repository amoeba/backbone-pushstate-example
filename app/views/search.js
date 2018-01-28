import Backbone from "backbone";
import SearchTemplate from "../templates/search.html";

var SearchView = Backbone.View.extend({
  template: SearchTemplate,
  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

export default SearchView;
