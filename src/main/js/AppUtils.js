const PromiseThrottle = require("promise-throttle");
const Request = require("request-promise");

/**
 * Collection of App utilities.
 */
class AppUtils {
  
  /**
   * Get a singleton instance of an HTTP client to share.
   * 
   * @return {http.Agent} a shared agent for network requests among library instances
   */
  static getHttpAgent() {
    if (!AppUtils.HTTP_AGENT) {
      let http = require('http');
      AppUtils.HTTP_AGENT = new http.Agent({keepAlive: true});
    }
    return AppUtils.HTTP_AGENT;
  }
  
  /**
   * Get a singleton instance of an HTTPS client to share.
   * 
   * @return {https.Agent} a shared agent for network requests among library instances
   */
  static getHttpsAgent() {
    if (!AppUtils.HTTPS_AGENT) {
      let https = require('https');
      AppUtils.HTTPS_AGENT = new https.Agent({keepAlive: true});
    }
    return AppUtils.HTTPS_AGENT;
  }

  /**
   * Executes network requests serially and with rate limiting.
   * 
   * @param {object} opts is the config for the Request interface
   * 
   * TODO: only requests per endpoint need to be executed serially and with rate limiting, this is global
   */
  static async throttledRequest(opts) {
    
    console.log("making request...");
    
    // initialize promise throttle one time
    if (!AppUtils.PROMISE_THROTTLE) {
      console.log("1");
      AppUtils.PROMISE_THROTTLE = new PromiseThrottle({
        requestsPerSecond: AppUtils.MAX_REQUESTS_PER_SECOND,
        promiseImplementation: Promise
      });
      console.log("2");
    }
    
    // throttle requests to execute rate limited
    console.log("3");
    return AppUtils.PROMISE_THROTTLE.add(function(opts) { console.log("4"); return Request(opts); }.bind(this, opts));
  }
}

AppUtils.MAX_REQUESTS_PER_SECOND = 50;

module.exports = AppUtils;