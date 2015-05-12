var LCollection = function (els) {
  this.els = els || [];
};

LCollection.prototype.each = function (callback) {
  for(var i = 0; i < this.els.length; i++) {
    callback(this.els[i]);
  }
};

LCollection.prototype.first = function () {
  return new LCollection([this.els[0]]);
};

LCollection.prototype.last = function () {
  return new LCollection([this.els[this.els.length - 1]]);
};

LCollection.prototype.html = function (text) {
  if (text) {
    this.each(function (el) {
      el.innerHTML = text;
    });
    return this;
  }
  return this.els[0].innerHTML
};

LCollection.prototype.val = function (value) {
  return this.attr('value', value);
};

LCollection.prototype.attr = function (attribute, value) {
  if(typeof value !== 'undefined') {
    this.each(function (el) {
      el.setAttribute(attribute, value);
    });
    return this;
  }
  return this.els[0].getAttribute(attribute);
};

LCollection.prototype.append = function (node) {
  if(node instanceof String) {
    console.log('not implemented yet');
  }
  this.each(function (el) {
    el.appendChild(node);
  });
  return this;
};


jLite = function(selector) {
  if(selector instanceof HTMLElement) {
    return new LCollection([selector]);
  }
  if(selector instanceof Array) {
    return new LCollection(selector)
  }

  var els = []
  switch(selector.charAt(0)) {
    case '.':
      els = document.getElementsByClassName(selector.substr(1));
      break;
    case '#':
      els = [document.getElementById(selector.substr(1))];
      break;
    default:
      els = document.getElementsByTagName(selector);
      break;
  }
  return new LCollection(els)
};

L = jLite;
