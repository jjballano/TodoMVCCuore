describe("Page", function() {
    
    var aPage;

    beforeEach(function() {
    	aPage = new TODO.Page("http://localhost");

        this.addMatchers({
            toBeInstanceOf: CUORE.Matchers.toBeInstanceOf
        });
    });

    it("is a page", function() {    
        expect(aPage).toBeInstanceOf(TODO.Page);
    });

    it("has an Input at #new-todo", function() {
        spyOn(aPage, 'addComponent');

        aPage.initializeComponents();
        var arguments = aPage.addComponent.argsForCall[0];

        expect(aPage.addComponent).toHaveBeenCalled();
        expect(arguments[0]).toBeInstanceOf(CUORE.Components.Input);
        expect(arguments[1]).toEqual('new-todo');
        expect(arguments[2]).toEqual(CUORE.Behaviours.HIJACK);
    });

    it("has a TASK service", function(){
        expect(aPage.getService('TASK')).toBeInstanceOf(TODO.TaskService);
    });


});