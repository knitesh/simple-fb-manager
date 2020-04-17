"use strict";

const routes = (app) => {
  const fb = require("../controllers/Facebook");

  app.route("/fb/exchange-access-token").post(fb.postAccessTokenRequest);
  app.route("/fb/pages").get(fb.getManagePageListRequest);
  app.route("/fb/all-pages").get(fb.getPageListRequest);
  // get Post for all Pages
  // submit Post to a specific Page
  // Update Post for a page
  // delete Post for a page
};

module.exports = routes;
