import Backbone from "backbone";
import PackageTemplate from "../templates/package.html";

var PackageView = Backbone.View.extend({
  template: PackageTemplate,
  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

export default PackageView;
