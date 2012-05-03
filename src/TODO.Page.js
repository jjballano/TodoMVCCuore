var TODO = TODO || {};
TODO.Renderers = TODO.Renderers || {};
TODO.Services = TODO.Services || {};

TODO.Page = CUORE.Class(CUORE.Page, {

	initializeComponents: function() {
		this.addComponent(new TODO.NewTaskInput(),"new-todo", CUORE.Behaviours.HIJACK);
	},

	initializeServices: function() {
		this.addService(new TODO.Services.Task());  
	}
});
