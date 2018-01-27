$(document).ready(function() {
  var UserModel = Backbone.Model.extend({});
  var PackageModel = Backbone.Model.extend({});

  var UserView = Backbone.View.extend({
    template: _.template("<h2>user: <%- name %></h2>"),
    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  var PackageView = Backbone.View.extend({
    template: _.template("<h2>package: <%- id %>, file: <%- file %></h2>"),
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
      '<h1>Example App</h1><nav><ul><li><a href="/user/a">user a</a></li><li><a href="/user/b">user b</a></li><li><a href="/package/a">package a</a></li><li><a href="/package/a/b">package a, file b</a></li></ul></nav><main id="content">Click a link above ^^^</main>'
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
      "package(/:id)(/:file)": "pkg"
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
