'use strict';

function sendUserRes(Container) {
  return new Promise((resolve, reject) => {
    if (!Container.user.ctx.headerSent && Container.user.ctx.status !== 504) {
      Container.proxy.res.on('end', () => resolve(Container));
      Container.proxy.res.on('error', reject);
      Container.proxy.res.pipe(Container.user.ctx.res);
    } else {
      resolve(Container);
    }
  });
}

module.exports = sendUserRes;
