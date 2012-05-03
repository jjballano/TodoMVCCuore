describe("Input Renderer", function() {

	var aRenderer;
	var newTaskInput;

	beforeEach(function() {
		aRenderer = new TODO.Renderers.Input();
		newTaskInput = new TODO.NewTaskInput();
        this.addMatchers({
            toBeInstanceOf: CUORE.Matchers.toBeInstanceOf
        });
    });

    afterEach(function(){
        var container = document.getElementById('xhtmlToTest');
        container.innerHTML = '';
    });

	it("is instance of InputRenderer", function() {
		expect(aRenderer).toBeInstanceOf(CUORE.Renderer);
	});

	it("uses panel as DOMInput", function(){
		var container = createTestContainer();
		aRenderer.setContainer(container.id);
		aRenderer.render(newTaskInput);
		
		expect(aRenderer.DOMInput).toEqual(aRenderer.panel);
	});

	it("calls submit method with the content of the Input if enter key is pressed", function(){		
		var container = createTestContainer();
		aRenderer.setContainer(container.id);
		newTaskInput.setValue("aValue");
		spyOn(newTaskInput,'submit');
		aRenderer.paint(newTaskInput);
		
		var DOMInput = document.getElementById(newTaskInput.getUniqueID());

		var evt = dummyEvent(13);
		DOMInput.dispatchEvent(evt);
		
		expect(newTaskInput.submit).toHaveBeenCalledWith("aValue",evt);
	});

	it("does not calls submit method when a key different as enter is pressed", function(){		
		var container = createTestContainer();
		aRenderer.setContainer(container.id);
		newTaskInput.setValue("aValue");
		spyOn(newTaskInput,'submit');
		aRenderer.paint(newTaskInput);
		
		var DOMInput = document.getElementById(newTaskInput.getUniqueID());

		var evt = dummyEvent(15);
		DOMInput.dispatchEvent(evt);
		
		expect(newTaskInput.submit).wasNotCalled();
	});



	var createTestContainer = function() {
        var container = document.createElement('input');
        container.id = "testingContainer";
        var panel = document.getElementById("xhtmlToTest");
        panel.appendChild(container);

        return container;
    };

    var getDummyComponent = function(){
		var aComponent = {};
		aComponent.getInputText = jasmine.createSpy().andReturn("text");
		aComponent.isEnabled = jasmine.createSpy().andReturn(true);
		aComponent.value = "aValue";
		aComponent.getFormName = jasmine.createSpy().andReturn("aName");
		aComponent.doYouReplace = jasmine.createSpy().andReturn(false);
		aComponent.doYouHijack = jasmine.createSpy().andReturn(true);
		aComponent.submit = jasmine.createSpy();
		
		return aComponent;
    };

    var dummyEvent = function(keyCode) {
	    var evt = document.createEvent("Events");
	    evt.initEvent("keypress", true, true);
	    evt.keyCode = keyCode;
	    return evt;
	}

});