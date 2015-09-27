// @author Jessica Kennedy
// @name Spell Caster Widget
;(function($, undefined){
 $.widget("mf.spell", {
  options: { // define out options for the widget, which are handled by the factory.
   spellname: "",
   spellpower: 1
  },

  // called by the widget factory to kick off creation of the widget.
  _create: function(){
   var self = this;

   // Optional: override any option defaults with what we have in the data
   $.extend(self.options, self.element.data());

   // set all private variables the widget will use
   self.global = { // contain any global private variables
    score: 0,
    elem: {
     $last_cast: $("<aside class='spell-container__last-cast'>"),
     $info: $("<aside class='spell-container__info'>"),
     $score: $("<aside class='spell-container__score'>0</aside>"),
     $wand: $("<figure class='spell-container__wand'>Wand</figure>")
    }
   };

   // do any additional things that need to happen to set up the widget, such as adding additional elements to the page or binding events.
   self._build();
   self._add_events();
  },

  // build out visual aspects of the widget
  _build: function(){
   var self = this;
   // set up the info on the spell we are casting
   self.global.elem.$info.html("<b class='spell-container__name'>" + self.options.spellname + "</b> " + "<span class='spell-container__power'>" + self.options.spellpower + "</span>");

   // Add a class to our container
   self.element
    .addClass("spell-container spell-container--" + self.options.spellname.replace(" ", "-", "all").toLowerCase())
    // now let's add our globally cached elements to the widget.
    .append(self.global.elem.$info, self.global.elem.$last_cast, self.global.elem.$score, self.global.elem.$wand);
  },

  // add any events associated with the widget
  _add_events: function(){
   var self = this,
       power_interval,
       power = 0;
   self.element
    .on("mousedown.spell", ".spell-container__wand", function(e){
     self.element.addClass("is-casting");
     power_interval = setInterval(function(){
      power++
     }, 20);
    })
    .on("mouseup.spell mouseout.spell", ".spell-container__wand", function(e){
     if(power){
      clearInterval(power_interval);
      self.element.removeClass("is-casting");
      self.cast(power);
      power = 0; // reset power to 0 every time
     }
    });
  },

  // actually cast the spell based on the currently set options & the complexity of the spell
  cast: function(complexity){
   var self = this,
       actual_power = self._calculatePower(self.options.spellpower, complexity || 0);
   self.global.score = self.global.score + actual_power;
   self.global.elem.$score.text(self.global.score);
   self.global.elem.$last_cast.html("<b>" + self.options.spellname + "</b> @ " + actual_power);
  },

  // util to figure out how powerful a spell is based on complexity & base power
  _calculatePower: function(base_power, complexity){ // returns power of a move
   var self = this;
   return Math.round(base_power * (complexity / 20));
  },

  // _setOption is a required private function for widgets. It should handle setting each option if any additional work is needed.
  _setOption: function(key, value){
   var self = this,
       old_value = self.options[key],
       actions = { // If an action is required when a particular option is set, add the option's key to this struct along with the function to execute.
       };

   // always call the set option in prototype to get the option set on the widget.
   $.Widget.prototype._setOption.apply(self, arguments);

   // if there is some action required to update the option correctly, set it now.
   actions[key] && actions[key]();

   // always trigger `setOption` to allow the developer to handle option setting however they choose
   self._trigger("setOption", null, {
    option: key,
    original: old_value,
    current: value
   });
  },

  // destroy is a required function for using widgets. it should completely remove all traces of the widget from the page and restore the elements to their original state.
  destroy: function(){
   var self = this;

   // at the very least, remove all namespaced events on the element
   self.element.off(".boilerplate");

   // if any additional destruction is needed, do it here.

   // Last, destroy the widget.
   $.Widget.prototype.destroy.call(self);
  }
 }); // end widget creation

 // optional: if you want the widget to always run immediately on page load using `data-`, comment this code in
 $(document).on("ready", function(e){
  $("body [data-spell]").spell();
 });

})(jQuery);
