// @author Jessica Kennedy
// @name  boilerplate Widget
;(function($, undefined){

 $.widget("namespace.boilerplate", {
  options: { // define out all options for the widget, which are handled by the factory.
  },

  // called by the widget factory to kick off creation of the widget.
  _create: function(){
   var self = this;

   // Optional: override any option defaults with what we have in the data
   $.extend(self.options, self.element.data());

   // set all private variables the widget will use
   self.global = {

   };

   // do any additional things that need to happen to set up the widget, such as adding additional elements to the page or binding events.
   self.element.append("<span style='color: red'>boilerplate widget was applied to this element. yay!!</span>");
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

 // optional: if you want the widget to always run immediately on page load using `data-`, comment this code in (not jQuery Mobile)
 // $(document).on("ready", function(e){
 //  $("body [data-boilerplate]").boilerplate();
 // });

 // optional: if you want the widget to work with jQuery Mobile, comment this code in
 // $(document).on("pageinit", function(e){
 //  var $target = $(e.target); // get the target, which should be the page being created
 //  // find all instances in the page of the widget and instantiate the widget on those
 //  $target.find(":jqmData(spell)").spell();
 //  // if the page itself is the widget, instantiate it
 //  $target.is(":jqmData(spell)") && $target.spell();
 // });

})(jQuery);
