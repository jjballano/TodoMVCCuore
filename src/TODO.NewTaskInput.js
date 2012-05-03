TODO.NewTaskInput = CUORE.Class(CUORE.Components.Input, {

	init: function(key) {
        TODO.NewTaskInput.parent.init.call(this);
        this.renderer = new TODO.Renderers.Input();
    },

    submit: function(text, event){
    	CUORE.Bus.emit('SUBMIT_newTaskInput_SENT', text);
    }
});