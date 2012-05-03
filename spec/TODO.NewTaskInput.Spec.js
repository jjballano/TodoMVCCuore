describe ("New Task Input", function(){
	
    var newTaskInput;

    beforeEach(function() {
        newTaskInput = new TODO.NewTaskInput();
        this.addMatchers({
            toBeInstanceOf: CUORE.Matchers.toBeInstanceOf
        });
    });

	it("uses TODO.Renderers.Input as a renderer", function() {
        expect(newTaskInput.renderer).toBeInstanceOf(TODO.Renderers.Input);
    });

    it("emit an event with a received text when submit is sent", function(){
        spyOn(CUORE.Bus,'emit');

        newTaskInput.submit("faketext");

        expect(CUORE.Bus.emit).toHaveBeenCalledWith("SUBMIT_newTaskInput_SENT", "faketext");
    });
});