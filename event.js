function on() {
  var args = arguments;
  if (typeof args[0] == "object") {
    var obj = args[0];
    for (var key in obj) {
      this.on(key, obj[key]);
    }
  } else {
    var name = args[0];
    var func = args[1];
    console.log(name);
    console.log(func);
    console.log(this.events);
    var events = this.events = this.events || {};
    console.log(events);
    var thisEvent = events[name] = events[name] || [];
    console.log(events[name]);
    thisEvent.push(func);
    console.log(thisEvent);
  }
  return this;
}

var emitted = {};

function once(name, cb) {
  this.on(name, function(data) {
    if (!emitted[name]) {
      cb(data);
      emitted[name] = true;
    }
  });
  return this;
}

function off(name) {
  if (!name) {
    delete this.events;
  }

  if (this.events && this.events[name]) {
    delete this.events[name];
  }
  return this;
}


function emit(name, ...eventArgs) {
  var self = this;
  console.log(this.events);
  var events = (this.events && this.events[name]) || [];
  console.log(events[0]);
  events.forEach(function(func) {
    func.apply(self, eventArgs);
  });
}


function mixin(target) {
  if (typeof target == "function") {
    target.prototype.on = on;
    target.prototype.once = once;
    target.prototype.off = off;
    target.prototype.emit = emit;
  } else {
    target.on = on;
    target.once = once;
    target.off = off;
    target.emit = emit;
  }
}

