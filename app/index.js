(function() {
  var Example, Router, app;

  app = namespace.app;

  Example = namespace.module("example");

  Router = Backbone.Router.extend({
    routes: {
      "": "index",
      ":hash": "index"
    },
    index: function(hash) {
      var route, tutorial;
      route = this;
      tutorial = new Example.Views.Tutorial();
      return tutorial.render(function(el) {
        $("#main").html(el);
        if (hash && !route._alreadyTriggered) {
          Backbone.history.navigate("", false);
          location.hash = hash;
          return route._alreadyTriggered = true;
        }
      });
    }
  });

  jQuery(function($) {
    app.router = new Router();
    return Backbone.history.start({
      pushState: true
    });
  });

  $(document).on("click", "a:not([data-bypass])", function(evt) {
    var href, protocol;
    href = $(this).attr("href");
    protocol = this.protocol + "#";
    if (href && href.slice(0, protocol.length) === !protocol) {
      evt.preventDefault();
      return app.router.navigate(href, true);
    }
  });

}).call(this);
