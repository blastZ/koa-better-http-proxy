'use strict';

var isUnset = require('../lib/isUnset');

function resolveBodyEncoding(reqBodyEncoding) {
  /* For reqBodyEncoding, these is a meaningful difference between null and
   * undefined.  null should be passed forward as the value of reqBodyEncoding,
   * and undefined should result in utf-8.
   */
  return reqBodyEncoding !== undefined ? reqBodyEncoding : 'utf-8';
}

function resolveOptions(options) {
  // resolve user argument to program usable options
  options = options || {};

  return {
    agent: options.agent,
    proxyReqPathResolver: options.proxyReqPathResolver,
    proxyReqOptDecorator: options.proxyReqOptDecorator,
    proxyReqBodyDecorator: options.proxyReqBodyDecorator,
    userResDecorator: options.userResDecorator,
    userResHeadersDecorator: options.userResHeadersDecorator,
    filter: options.filter || defaultFilter,
    // For backwards compatability, we default to legacy behavior for newly added settings.
    parseReqBody: isUnset(options.parseReqBody) ? true : options.parseReqBody,
    reqBodyEncoding: resolveBodyEncoding(options.reqBodyEncoding),
    headers: { ...(options.headers || {}) },
    strippedHeaders: options.strippedHeaders,
    preserveReqSession: options.preserveReqSession,
    preserveHostHdr: options.preserveHostHdr,
    https: options.https,
    port: options.port,
    reqAsBuffer: options.reqAsBuffer,
    connectTimeout: options.connectTimeout,
    timeout: options.timeout,
    limit: options.limit,
  };
}

function defaultFilter() {
  // No-op version of filter.  Allows everything!
  return true;
}

module.exports = resolveOptions;
