import Backbone from "backbone";
import UserTemplate from "../templates/user.html";

const UserView = Backbone.View.extend({
  template: UserTemplate,
  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

export default UserView;
