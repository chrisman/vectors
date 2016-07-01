// implements Observer pattern
var Subject = function() {

  return {
    handlers: [], // observers

    subscribe: function(fn) {
      this.handlers.push(fn);
    },

    unsubscribe: function(fn) {
      this.handlers = this.handlers.filter((item) => (item !== fn)) 
    },

    fire: function(o, thisObj) {
      var scope = thisObj || window;
      this.handlers.forEach((item) => {
        item.call(scope, o);
      });
    }
  }
}

export default Subject;
