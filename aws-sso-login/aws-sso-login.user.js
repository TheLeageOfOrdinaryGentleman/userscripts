// ==UserScript==
// @name         Auto AWS SSO Login
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       TheLeagueOfOrdinaryGentlemen
// @match        https://*.awsapps.com/start/*
// @match        https://device.sso.us-east-1.amazonaws.com/?user_code=*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        window.close
// @grant        GM_log
// ==/UserScript==
(function () {
  "use strict";

  waitForElement("#cli_verification_btn").then((element) => {
    element.click();
  });

  waitForElement("#cli_login_button").then((element) => {
    element.click();
  });

  // Click the new allow access button
  waitForElement('[data-testid="allow-access-button"]').then((element) => {
    element.click();
  });

  waitForElement('[data-analytics-alert="success"]').then((element) => {
    if (element.innerHTML.indexOf("approved") >= 0) {
      window.close();
      return;
    }
  });

  //https://stackoverflow.com/a/61511955
  function waitForElement(selector) {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver((mutations) => {
        if (document.querySelector(selector)) {
          observer.disconnect();
          resolve(document.querySelector(selector));
        }
      });

      // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }
})();
