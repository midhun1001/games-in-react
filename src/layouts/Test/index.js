export default () => ({
  path: 'test',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Offboard = require('./Test').default;

      /*  Return getComponent   */
      cb(null, Offboard);

    /* Webpack named bundle   */
    }, 'test');
  }
});
