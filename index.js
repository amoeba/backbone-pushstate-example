import util from "./lib/util";
import AppView from "./views/app";
import UserView from "./views/user";
import PackageView from "./views/package";
import SearchView from "./views/search";
import UserModel from "./models/user";
import PackageModel from "./models/package";
import SearchModel from "./models/search";
import SearchResults from "./collections/searchResults";
import SearchResultsView from "./views/searchResults";

$(document).ready(function() {
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
      var parsed_params = util.parseQueryString(params);

      var view = new SearchView({
        model: new SearchModel({
          params: parsed_params
        })
      });

      var results = new SearchResults(null, {
        params: parsed_params
      });

      results.fetch().then(function(data) {
        new SearchResultsView({
          collection: results
        });
        results.reset(data.response.docs);
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
