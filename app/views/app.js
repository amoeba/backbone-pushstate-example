import Backbone from "backbone";

const AppView = Backbone.View.extend({
  tagName: "div",
  id: "app",
  template: AppTemplate,
  render: function() {
    $(".loading").hide();
    this.$el.html(this.template());

    return this;
  }
});

export default AppView;
