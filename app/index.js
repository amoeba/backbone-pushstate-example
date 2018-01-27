import util from "./util";

$(document).ready(function() {
  var UserModel = Backbone.Model.extend({});
  var PackageModel = Backbone.Model.extend({});
  var SearchModel = Backbone.Model.extend({});

  var UserView = Backbone.View.extend({
    template: _.template("<h2>User '<%- name %>'</h2>"),
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var PackageView = Backbone.View.extend({
    template: _.template("<h2>Package '<%- id %>, file: <%- file %>'</h2>"),
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var SearchView = Backbone.View.extend({
    template: _.template(
      "<h2>Search</h2><p>You searched for:<ul><% _.each(Object.keys(params), function(p) { %><li><pre><%= p %> : <%= params[p] %></pre></li><% })%></ul></p>"
    ),
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
    template: _.template(
      '<h1>Example App</h1><nav><ul><li><a href="/user/a">user a</a></li><li><a href="/user/b">user b</a></li><li><a href="/package/a">package a</a></li><li><a href="/package/a/b">package a, file b</a></li><li><a href="/search?id=doi:10.123/ABC">search</a></li></ul></nav><main id="content">Click a link above ^^^</main>'
    ),
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
