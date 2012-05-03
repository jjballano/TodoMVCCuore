TODO.Renderers.Input = CUORE.Class(CUORE.Renderer, {

	paint: function(component){
		TODO.Renderers.Input.parent.paint.call(this, component);
		this.DOMInput = this.panel;
		this.DOMInput.placeholder = "New Task";
		this.addEvents(component);
	},

	addEvents: function(component) {
        CUORE.Dom.Event.remove(this.panel, 'keypress');

        if (component.isEnabled()) {
            var submit = CUORE.Core.bind(component, component.submit);
            CUORE.Dom.Event.add(this.panel, 'keypress', function(event){ 
            	if (event.keyCode === 13){
            		submit(component.value, event);
            	}
            });
        }
    }


});