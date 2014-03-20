define(['handlebars'], function(Handlebars) {
  "use strict";

  Handlebars.registerHelper('method', function (context, options) {
      return this[context]();
  });
  
  Handlebars.registerHelper('with', function(context, model, options) {
      return options.fn(context.call(model));
    });
  
  Handlebars.registerHelper('fun', function(property, model, options) {
      return model[property]();
  });
  
  Handlebars.registerHelper('attr', function(property, model, options) {
      return model.get(property);
  });
  Handlebars.registerHelper('iffun', function(fun, model, options) {
      console.log(model[fun]());
      if(model[fun]()) {
          return options.fn(this);
      } else {
          return options.inverse(this);
      }
  });
  
  return Handlebars;
});