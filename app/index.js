import util from "./util";
import AppTemplate from "./templates/app.html";
import UserTemplate from "./templates/user.html";
import PackageTemplate from "./templates/package.html";
import SearchTemplate from "./templates/search.html";

$(document).ready(function() {
  var UserModel = Backbone.Model.extend({});
  var PackageModel = Backbone.Model.extend({});
  var SearchModel = Backbone.Model.extend({});

  var UserView = Backbone.View.extend({
    template: UserTemplate,
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

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

  var AppView = Backbone.View.extend({
    tagName: "div",
    id: "app",
    template: AppTemplate,
    render: function() {
      $(".loading").hide();
      this.$el.html(this.template());

      return this;
    }
  });

  var AppRouter = Backbone.Router.extend({
    content: null,
    routes: {
      "": "root",
      "user(/:user)": "user",
      "package(/:id)(/:file)": "pkg",
      search: "search"
    },
    initialize: function() {
      this.content = $("#content");
    },
    root: function() {},
    user: function(user) {
      var view = new UserView({
        model: new UserModel({
          name: user
        })
      });

      this.content.html(view.render().el);
    },
    pkg: function(id, file) {
      var view = new PackageView({
        model: new PackageModel({
          id: id,
          file: file
        })
      });

      this.content.html(view.render().el);
    },
    search: function(params) {
      var view = new SearchView({
        model: new SearchModel({
          params: util.parseQueryString(params)
        })
      });

      this.content.html(view.render().el);
    }
  });

  $(document).on("click", 'a[href^="/"]', function(e) {
    e.preventDefault();

    var href = $(e.currentTarget).attr("href");
    Backbone.history.navigate(href, { trigger: true });
  });

  new AppView().render().$el.appendTo("body");
  new AppRouter();

  Backbone.history.start({
    pushState: true,
    root: "/"
  });
});
