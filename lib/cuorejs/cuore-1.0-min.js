var CUORE=CUORE||{};CUORE.VERSION="1.0";CUORE.Behaviours=CUORE.Behaviours||{};CUORE.Behaviours.APPEND="APPEND";CUORE.Behaviours.REPLACE="REPLACE";CUORE.Behaviours.HIJACK="HIJACK";CUORE.Components=CUORE.Components||{};CUORE.Services=CUORE.Services||{};CUORE.Handlers=CUORE.Handlers||{};CUORE.Renderers=CUORE.Renderers||{};CUORE.Dom=CUORE.Dom||{};CUORE.Core=function(a){var b=Object.prototype;var c=function(a,b){return function(){return b.apply(a,[].slice.call(arguments))}};var d=function(a,b,c){if(!j())return;var d=j();d.onreadystatechange=function(){var a=d.readyState===4;var b=d.status===200||d.status===304;if(a&&b){try{parsedResponse=JSON.parse(d.responseText)}catch(e){parsedResponse=new CUORE.Message}c(parsedResponse)}};d.open("POST",a,true);d.send(JSON.stringify(b))};var e=function(a,b,c){if(!j())return;var d=j();d.onreadystatechange=function(){var a=d.readyState===4;var b=d.status===200||d.status===304;if(a&&b){var e=JSON.parse(d.responseText);c(e)}};d.open("GET",a+k(b),true);d.send()};var f=function(a,b,c){c=c||function(){};var d=document.createElement("script");var e="F"+((1+Math.random())*65536|0).toString(16).substring(1);window[e]=function(a){c(a);var b=document.getElementById(e);document.getElementsByTagName("head")[0].removeChild(b)};d.id=e;d.type="text/javascript";d.src=a+e+g(b);document.getElementsByTagName("head")[0].appendChild(d);return e};var g=function(a){var b="&";var c=b;for(var d in a){c=c+d+"="+a[d]+b}return c};var h=function(a,c){return b.hasOwnProperty.call(a,c)};var i=function(a){return b.toString.call(a).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()};var j=function(){return new XMLHttpRequest};var k=function(a){if(typeof a!="object")return"";var b="";for(var c in a)if(a.hasOwnProperty(c)){b+="&"+encodeURIComponent(c)+"="+encodeURIComponent(a[c])}var d=b.replace(/^&/,"");if(d!=="")d="?"+d;return d};var l=function(){[].indexOf||(Array.prototype.indexOf=function(a,b,c){for(var c=this.length,b=(c+~~b)%c;b<c&&(!(b in this)||this[b]!==a);b++);return b^c?b:-1})};l();return{bind:c,request:d,requestGet:e,requestJSONP:f,isOwnProperty:h,toType:i}}();CUORE.Class=function(a,b){a||(a=Object);var c=Object.prototype.hasOwnProperty;var d=function(){d.prototype.init.apply(this,arguments)};var e=function(){};e.prototype=a.prototype;d.prototype=new e;d.parent=a.prototype;d.prototype.constructor=d;for(var f in b){if(c.call(b,f)){d.prototype[f]=b[f]}}return d};CUORE.Dom=function(a,b){var c=function(b){var c=setInterval(function(){if(a.body&&a.getElementById){clearInterval(c);b()}},10)};var d=function(a,b){if(!f(a,b)){a.className+=" "+b}};var e=function(a,b){if(f(a,b)){var c=h(b);a.className=a.className.replace(c,"")}};var f=function(a,b){var c=h(b);return a.className.match(c)};var g=function(b,c,d){var e=a.createElement(b);if(CUORE.Core.toType(c)==="object"){for(var f in c){if(CUORE.Core.isOwnProperty(c,f)){e[f]=c[f]}}}d&&d.appendChild(e);return e};var h=function(a){return new RegExp("(\\s|^)"+a+"(\\s|$)")};return{ready:c,addClass:d,removeClass:e,hasClass:f,createElement:g}}(document);CUORE.Dom.Event=function(a){var b={add:function(a,b,c){this._initializeStructure(a,b);a.events[b].push(c)},remove:function(a,b){if(this.hasEvents(a,b)){a.events[b]=[]}},fire:function(a,b){if(!this.hasEvents(a,b))return;var c=a.events[b];for(var d=0,e=c.length;d<e;d++){c[d]()}},hasEvents:function(a,b){var c=a.events&&a.events[b]&&a.events[b].length>0;return c?true:false},_initializeStructure:function(a,b){!a.events&&(a.events={});!a.events[b]&&(a.events[b]=[])}};var c=function(a,c,d){b.add(a,c,d);h(a,c,d)};var d=function(a,c,d){i(a,c,d);b.remove(a,c)};var e=function(a,b){c(a,b,function(a){if(!a)return;a.preventDefault();a.stopPropagation()})};var f=function(a,c){return b.hasEvents(a,c)};var g=function(a,c){b.fire(a,c)};var h=function(a,b,c){if(j()){a.addEventListener(b,c,false)}if(k()){a.attachEvent("on"+b,c)}if(!k()&&!j()){a["on"+b]=c}};var i=function(a,b,c){if(j()){l(a,b)}if(k()){m(a,b)}if(!k()&&!j()){a["on"+b]=null}};var j=function(){return typeof window.addEventListener==="function"};var k=function(){return typeof document.attachEvent==="function"};var l=function(a,c){if(!b.hasEvents(a,c))return;var d=a.events[c];for(var e=0,f=d.length;e<f;e++){a.removeEventListener(c,d[e],false)}};var m=function(a,c){if(!b.hasEvents(a,c))return;var d=a.events[c];for(var e=0,f=d.length;e<f;e++){a.detachEvent("on"+c,d[e])}};return{add:c,remove:d,hasEvents:f,fire:g,stopDefault:e}}();CUORE.Bus=function(a){var b=[];var c=false;var d=function(a,c){if(!l(a))throw new Error("Not a subscriber (lacks eventDispatch function)");if(!j(a,c)){b.push([a,c])}};var e=function(a,b){if(typeof b=="string"){k([a,b]);return}for(var c=0,d=b.length;c<d;c++){var e=[a,b[c]];k(e)}};var f=function(){return b.length>0};var g=function(a){var c=[];for(var d=0,e=b.length;d<e;d++){var f=b[d];if(f[1]===a){c.push(f[0])}}return c};var h=function(a,b){var c=this.subscribers(a);m("Bus.emit (event, params)");m(a);m(b);m("------------");for(var d=0,e=c.length;d<e;d++){c[d].eventDispatch(a,b)}};var i=function(){};var j=function(a,c){var d=false;var e=[a,c];for(var f=0,g=b.length;f<g;f++){var h=b[f];var i=h[0]===e[0];var j=h[1]===e[1];if(i&&j){d=true;break}}return d};var k=function(a){for(var c=0,d;d=b[c];c++){var e=d[0]===a[0];var f=d[1]===a[1];if(e&&f){b.splice(c,1)}}};var l=function(a){return a.eventDispatch};var m=function(a){if(c){console.log(a)}};var n=function(){c=true};var o=function(){c=false};return{subscribe:d,unsubscribe:e,hasSubscriptions:f,subscribers:g,emit:h,reset:i,enableDebug:n,disableDebug:o}}();CUORE.State=CUORE.Class(null,{keys:undefined,map:undefined,init:function(){this.keys=[];this.map={}},hasKey:function(a){return this.keys.indexOf(a)!=-1},_addKey:function(a){if(this.hasKey(a))return;this.keys.push(a)},_removeKey:function(a){this.keys.splice(this.keys.indexOf(a),1)},save:function(a,b){this._addKey(a);this.map[a]=b;if(b===undefined){this._removeKey(a)}},retrieve:function(a){if(!this.hasKey(a))return undefined;return this.map[a]}});CUORE.Page=CUORE.Class(null,{init:function(a){this.baseURL=a;this.components=new CUORE.Registry;this.services=new CUORE.Directory;this.services.setBaseURL(a);this.state=new CUORE.State;this.setUp()},setUp:function(){this.initializeServices();this.initializeComponents()},initializeServices:function(){},initializeComponents:function(){},addComponent:function(a,b,c){a.setDirectory(this.services);if(c)a.behave(c);this.components.register(a);a.setContainer(b);a.onEnvironmentUp()},draw:function(){this.components.each(function(a){a.draw()})},addService:function(a){this.services.add(a)},getService:function(a){return this.services.getService(a)},save:function(a,b){this.state.save(a,b)},retrieve:function(a){return this.state.retrieve(a)},setRegistry:function(a){this.components=a},setDirectory:function(a){this.services=a;this.services.setBaseURL(this.baseURL)}});CUORE.Message=CUORE.Class(null,{init:function(a){this.header={};this.query={};this.answer={};this._parse(a)},asJson:function(){var a={};a.header=this.header;a.query=this.query;a.answer=this.answer;return JSON.stringify(a)},putOnHeader:function(a,b){b&&(this.header[a]=b)},getFromHeader:function(a){return this.header[a]||""},removeFromHeader:function(a){delete this.header[a]},putOnQuery:function(a,b){b&&(this.query[a]=b)},putMapOnQuery:function(a){this._processMap(a,this.putOnQuery)},putOnAnswer:function(a,b){b&&(this.answer[a]=b)},putMapOnAnswer:function(a){this._processMap(a,this.putOnAnswer)},getFromQuery:function(a){return this.query[a]||""},removeFromQuery:function(a){delete this.query[a]},getFromAnswer:function(a){return this.answer[a]||""},removeFromAnswer:function(a){delete this.answer[a]},_parse:function(a){var b=typeof a==="string";if(!(a&&b))return;var c=JSON.parse(a);this.header=this._removeNulls(c.header);this.query=this._removeNulls(c.query);this.answer=this._removeNulls(c.answer)},_processMap:function(a,b){for(var c in a){if(CUORE.Core.isOwnProperty(a,c)){b.call(this,c,a[c])}}},_removeNulls:function(a){for(var b in a){if(CUORE.Core.isOwnProperty(a,b)&&!a[b]){delete a[b]}}return a}});CUORE.Component=CUORE.Class(null,{init:function(){this.setHandlerSet(new CUORE.HandlerSet);this.name=this._generateUUID();this.procedure="nullProcedure";this.SEPARATOR="_";this.labels={};this.renderer=new CUORE.Renderer;this.enabled=true;this.behaviour=CUORE.Behaviours.APPEND},setHandlerSet:function(a){this.handlerSet=a},setDirectory:function(a){this.services=a;this.requestLabelText()},behave:function(a){this.behaviour=a},doYouReplace:function(){return this.behaviour===CUORE.Behaviours.REPLACE},doYouHijack:function(){return this.behaviour===CUORE.Behaviours.HIJACK},draw:function(){this.renderer.render(this)},updateRender:function(){this.renderer.update(this)},destroy:function(){this.renderer.erase();CUORE.Bus.unsubscribe(this,this.getManagedEvents())},execute:function(a,b,c,d){if(!this.services)throw new Error("Cannot call service. A service directory is not configured");this.services.execute(a,b,c,d)},eventDispatch:function(a,b){this.handlerSet.notifyHandlers(a,b)},addHandler:function(a,b){b.setOwner(this);this.handlerSet.register(a,b);CUORE.Bus.subscribe(this,a)},addExecHandler:function(a,b){this.addHandler(a,new CUORE.Handlers.Executor(b))},addClass:function(a){this.renderer.addClass(a)},removeClass:function(a){this.renderer.removeClass(a)},getText:function(a){if(!a)return null;return this.labels[a]},getName:function(){return this.name},setName:function(a){this.name=a},setContainer:function(a){if(this.doYouHijack())this.setName(a);this.renderer.setContainer(a)},getUniqueID:function(){var a=this.renderer.innerDivName(this.name);if(this.doYouHijack())a=this.name;return a},getManagedEvents:function(){return this.handlerSet.getManagedEvents()},setText:function(a,b){this.labels[a]=b;this.updateRender()},setI18NKey:function(a){if(!a)return;this.setText(a,a);this.addHandler("LABELS_getLabel_EXECUTED_"+a,new CUORE.Handlers.SetText);this.requestLabelText(a)},requestLabelText:function(a){if(!a){for(var b in this.labels){this._executeLabelsService(b)}}else{this._executeLabelsService(a)}},_executeLabelsService:function(a){if(!this.services)return;this.services.execute("LABELS","getLabel",{key:a},true)},setRenderer:function(a){this.renderer=a},isEnabled:function(){return this.enabled},enable:function(){this.enabled=true;this.updateRender()},disable:function(){this.enabled=false;this.updateRender()},addDecoration:function(a){if(a instanceof CUORE.Decoration){this.renderer.addDecoration(a)}},onEnvironmentUp:function(){},_generateUUID:function(){return((1+Math.random())*65536|0).toString(16).substring(1)}});CUORE.Renderer=CUORE.Class(null,{init:function(){this.panel=null;this.panelClasses=[];this.container=document.body;this.tagName=undefined;this.htmlID=null;this.setTagName("div");this.decorators=[]},setTagName:function(a){this.tagName=a},setContainer:function(a){this.container=document.getElementById(a)},getContainer:function(){return this.container},innerDivName:function(a){if(this.htmlID)return this.htmlID;this.htmlID=this._fixIDToken(a);return this.htmlID},render:function(a){!this.panel&&this.draw(a);this.update(a)},update:function(a){this.panel&&this.updateWhenDrawn(a)},updateWhenDrawn:function(a){this.showDisabledState(a)},showDisabledState:function(a){this.removeClass("disabled");if(!a.isEnabled()){this.addClass("disabled")}},erase:function(){if(this.panel){this.panel.parentNode.removeChild(this.panel);delete this.panel}},addClass:function(a){this.panelClasses.push(a);this.panel&&CUORE.Dom.addClass(this.panel,a)},removeClass:function(a){this._eraseClassFromPanelClasses(a);this.panel&&CUORE.Dom.removeClass(this.panel,a)},getCurrentClasses:function(){return this.panelClasses},draw:function(a){if(a.doYouReplace()||a.doYouHijack()){this.container.innerHTML=""}this.paint(a);this._postPaint()},paint:function(a){if(!a.doYouHijack()){var b=this.innerDivName(a.getName());this.panel=CUORE.Dom.createElement(this.tagName,{id:b},this.container)}else{this.htmlID=this.container.id;this.panel=this.container}this.showDisabledState(a);this.setCurrentClasses()},_postPaint:function(){for(var a=0,b=this.decorators.length;a<b;a++){this.decorators[a].postPaint(this.panel)}},setCurrentClasses:function(){for(var a=0,b=this.panelClasses.length;a<b;a++){CUORE.Dom.addClass(this.panel,this.panelClasses[a])}this.panel.className=this.panel.className.replace(/^\s+/g,"")},_eraseClassFromPanelClasses:function(a){var b=this.panelClasses.length;var c=0;while(c<b){if(this.panelClasses[c]===a){this.panelClasses.splice(c,1)}else{c++}}},addDecoration:function(a){this.decorators.push(a)},_fixIDToken:function(a){var b=a;b=b.replace(/[^(a-zA-Z0-9_.:\-\.)]/,"");var c=b.match(/^[a-zA-Z]/);if(!c)b="a"+b;return b}});CUORE.Handler=CUORE.Class(null,{init:function(){this.owner=null},handle:function(a){},dispatch:function(a){this.handle(a)},setOwner:function(a){this.owner=a},getOwner:function(){return this.owner}});CUORE.Directory=CUORE.Class(null,{init:function(a){this.listing=[];this.services={};this.setBaseURL(a);this._addBuiltinServices()},add:function(a){var b=a.getName();this.listing.push(b);a.setBaseURL(this.baseURL);this.services[b]=a},execute:function(a,b,c){this.getService(a).execute(b,c)},getService:function(a){var b=this._findService(a);return b||new CUORE.Services.Null},setBaseURL:function(a){this.baseURL=a||"";var b=this.listing;var c=b.length;for(var d=0;d<c;d++){this._findService(b[d]).setBaseURL(this.baseURL)}},_findService:function(a){return this.services[a]},_addBuiltinServices:function(){this.add(new CUORE.Services.Label);this.add(new CUORE.Services.Button)}});CUORE.HandlerSet=CUORE.Class(null,{init:function(){this.eventNames=[];this.handlersForEvent={}},register:function(a,b){if(!this._contains(a)){this.eventNames.push(a)}var c=this.handlersForEvent[a]||(this.handlersForEvent[a]=[]);c.push(b)},getManagedEvents:function(){return this.eventNames},notifyHandlers:function(a,b){var c=this.handlersForEvent[a];if(c)this._notify(c,b)},_notify:function(a,b){for(var c=0,d=a.length;c<d;c++){this._safeNotification(a[c],b)}},_safeNotification:function(a,b){var c;try{a.handle(b)}catch(c){}},_contains:function(a){var b=false;for(var c=0,d=this.eventNames.length;c<d;c++){if(this.eventNames[c]===a){b=true;break}}return b}});CUORE.Registry=CUORE.Class(null,{init:function(a){this.components=[]},register:function(a){if(!this._contains(a)){this.components.push(a)}},_contains:function(a){return this.components.indexOf(a)!==-1},size:function(){return this.components.length},each:function(a){var b=this.size();for(var c=0;c<b;c++){this._safeInvoke(a,this.components[c])}},_safeInvoke:function(a,b){var c;try{a(b)}catch(c){}}});CUORE.Service=CUORE.Class(null,{init:function(){this.name="ABSTRACT";this.executionPrefix="EXECUTED";this.SEPARATOR="_";this.baseURL=""},execute:function(a,b){var c=this.getEventNameForExecution(a);this[a](b,c)},request:function(a,b,c){var d=this.wrapRequestParams(b);var e=this._responseCallback(c);this._doRequest(a,d,e)},wrapRequestParams:function(a){var b=new CUORE.Message;b.putMapOnQuery(a);return b.asJson()},_doRequest:function(a,b,c){CUORE.Core.request(a,b,c)},emit:function(a,b){var c=this.wrapResponse(b);var d=this.getBus&&this.getBus();d=d||CUORE.Bus;d.emit(a,c)},wrapResponse:function(a){return new CUORE.Message(a)},getEventNameForExecution:function(a){return this.getName()+this.SEPARATOR+a+this.SEPARATOR+this.executionPrefix},getName:function(){return this.name},getBaseURL:function(){return this.baseURL},setBaseURL:function(a){this.baseURL=a},getBus:function(){return CUORE.Bus},_responseCallback:function(a){var b=this.emit;var c=function(b){this.emit(a,b)};return CUORE.Core.bind(this,c);}});CUORE.Journey=CUORE.Class(null,{init:function(a,b){var c=a&&b;this.itsGranularity=60;this.minutesInAnHour=60;this.start=c?this._convertToMinutesDay(a):0;this.end=c?this._convertToMinutesDay(b):1440},starts:function(){return this._normalize(this.start)},ends:function(){return this._normalize(this.end)},granularity:function(){return this.itsGranularity},withGranularityOf:function(a){this.itsGranularity=parseInt(a,10)},isValid:function(){return this.start<this.end},slots:function(){var a=[];var b=this.end-this.itsGranularity;var c=0;for(var d=this.start;d<=b;d+=this.itsGranularity){var e=this._formatHour(d);var f=this._formatHour(d+this.itsGranularity);a[c++]=new CUORE.Journey(e,f)}var g=a[c-1].ends();if(g!==this.ends()){a[c]=new CUORE.Journey(g,this.ends())}return a},toString:function(){return this.starts()+"-"+this.ends()},setStartTime:function(a){if(!a)return;this.start=this._convertToMinutesDay(a);if(this.start>=this.end){this.start=this.end-this.itsGranularity}},setEndTime:function(a){if(!a)return;this.end=this._convertToMinutesDay(a);if(this.end<=this.start){this.end=this.start+this.itsGranularity}},_convertToMinutesDay:function(a){var b=24;var c=this._parseHour(a);var d=this._parseMinutes(a);var e=d>=this.minutesInAnHour||d<0;var f=c>b||c<0;if(e||f)return null;return c*this.minutesInAnHour+d},_parseMinutes:function(a){return Number(this._getChunks(a)[1])||0},_formatHour:function(a){var b=10;var c=Math.floor(a/this.minutesInAnHour);var d=a%this.minutesInAnHour;var e=d<b?"0"+d:d;var f=c<b?"0"+c:c;return f+":"+e},_parseHour:function(a){return Number(this._getChunks(a)[0])},_getChunks:function(a){var b=a.toString();return b.split(":",2)},_normalize:function(a){if(!isNaN(a)){return this._formatHour(a)}}});CUORE.Decoration=CUORE.Class(null,{init:function(){},postPaint:function(a){console.log("not implemented")}});CUORE.Components.Nestable=CUORE.Class(CUORE.Component,{init:function(){CUORE.Components.Nestable.parent.init.call(this);this.hostedComponents=[]},host:function(a){a.setDirectory(this.services);this.hostedComponents.push(a)},setDirectory:function(a){CUORE.Components.Nestable.parent.setDirectory.call(this,a);for(var b=0,c=this.hostedComponents.length;b<c;b++)this.hostedComponents[b].setDirectory(a)},hosted:function(a){return this.hostedComponents},getManagedEvents:function(){var a=CUORE.Components.Nestable.parent.getManagedEvents.call(this);for(var b=0,c=this.hostedComponents.length;b<c;b++){a.push.apply(a,this.hostedComponents[b].getManagedEvents())}return a},eventDispatch:function(a,b){CUORE.Components.Nestable.parent.eventDispatch.call(this,a,b);for(var c=0,d=this.hostedComponents.length;c<d;c++){this.hostedComponents[c].eventDispatch(a,b)}},draw:function(){CUORE.Components.Nestable.parent.draw.call(this);for(var a=0,b;b=this.hostedComponents[a];a++){var c=this.renderer.innerDivName(this.getName());b.setContainer(c);b.draw()}},updateRender:function(){CUORE.Components.Nestable.parent.updateRender.call(this);for(var a=0,b;b=this.hostedComponents[a];a++){b.updateRender()}},destroy:function(){for(var a=0,b=this.hostedComponents.length;a<b;a++){this.hostedComponents[a].destroy()}CUORE.Components.Nestable.parent.destroy.call(this)},setName:function(a){CUORE.Components.Nestable.parent.setName.call(this,a);var b=1;for(var c=0,d=this.hostedComponents.length;c<d;c++){var e=this.hostedComponents[c];var f=this.getName()+this.SEPARATOR+e.getName()+this.SEPARATOR+b;e.setName(f);b++}},enable:function(){CUORE.Components.Nestable.parent.enable.call(this);for(var a=0,b=this.hostedComponents.length;a<b;a++){var c=this.hostedComponents[a];c.enable()}},disable:function(){CUORE.Components.Nestable.parent.disable.call(this);for(var a=0,b=this.hostedComponents.length;a<b;a++){var c=this.hostedComponents[a];c.disable()}}});CUORE.Components.Input=CUORE.Class(CUORE.Component,{init:function(a,b){CUORE.Components.Input.parent.init.call(this);this.setRenderer(new CUORE.Renderers.Input);this.labelKey=a;this.setI18NKey(this.labelKey);this.type=b||"text";this.value="";this.formName=null},getValue:function(){rendererValue=this.renderer.getValue();if(rendererValue=="")return"";return rendererValue||this.value},setValue:function(a){this.value=a;this.updateRender()},getInputText:function(){return this.getText(this.labelKey)},setFormName:function(a){this.formName=a},getFormName:function(){return this.formName}});CUORE.Components.Button=CUORE.Class(CUORE.Component,{defaultLabel:"CLICK!",init:function(a,b){CUORE.Components.Button.parent.init.call(this);this.service="BUTTON";this.data=null;this.labelKey=b||this.defaultLabel;this.buttonName=a||"aButton";this.asynchronous=false;this.setRenderer(new CUORE.Renderers.Button);this.setI18NKey(this.labelKey)},click:function(){if(this.service){this.services.execute(this.service,this.buttonName,this.data)}},getButtonName:function(){return this.buttonName},setData:function(a){this.data=a},getButtonText:function(){return this.getText(this.labelKey)}});CUORE.Components.TimeRange=CUORE.Class(CUORE.Component,{init:function(a,b){CUORE.Components.TimeRange.parent.init.call(this);this.label=null;this.startHourSelect=null;this.endHourSelect=null;this.setRenderer(new CUORE.Renderers.TimeRange);this.journey=new CUORE.Journey;this.setI18NKey(a);this.labelKey=a;if(b){this.journey.withGranularityOf(b)}},setStartHour:function(a){if(!a||typeof a==="object"){a=this.renderer.getStartTime()}this.journey.setStartTime(a);this.updateRender();this.emitValues()},setEndHour:function(a){if(!a||typeof a==="object"){a=this.renderer.getEndTime()}this.journey.setEndTime(a);this.updateRender();this.emitValues()},getLabelText:function(){return this.getText(this.labelKey)},emitValues:function(){var a={startHour:this.getStartHour(),endHour:this.getEndHour()};this.getBus().emit("COMPONENT_"+this.name+"_CHANGED",a)},getStartHour:function(){return this.journey.starts()},getEndHour:function(){return this.journey.ends()},getBus:function(){return CUORE.Bus}});CUORE.Components.Collapsable=CUORE.Class(CUORE.Components.Nestable,{init:function(a,b){CUORE.Components.Collapsable.parent.init.call(this,a,b);this.collapsed=true;this.renderer=new CUORE.Renderers.Collapsable;this.addClass("collapsablePanel")},isCollapsed:function(){return this.collapsed},uncollapse:function(){this.collapsed=false;this.updateRender()},collapse:function(){this.collapsed=true;this.updateRender()},setPanelTextKey:function(a){this.key=a;this.setI18NKey(a)},getPanelLabel:function(){return this.getText(this.key)}});CUORE.Components.SwitchButton=CUORE.Class(CUORE.Components.Button,{init:function(a,b,c){CUORE.Components.SwitchButton.parent.init.call(this,a);this.active=true;this.activeKey=b||this.defaultLabel;this.inactiveKey=c||this.defaultLabel;this.setI18NKey(this.activeKey);this.setI18NKey(this.inactiveKey);this.renderer=new CUORE.Renderers.SwitchButton},click:function(a){var b=typeof a==="undefined";if(a||b){CUORE.Components.SwitchButton.parent.click.call(this)}this.switchState()},switchState:function(){this.active=!this.active;this.updateRender()},isActive:function(){return this.active},getActiveLabel:function(){return this.getText(this.activeKey)},getInactiveLabel:function(){return this.getText(this.inactiveKey)}});CUORE.Components.LabelPanel=CUORE.Class(CUORE.Component,{init:function(a,b){CUORE.Components.LabelPanel.parent.init.call(this);this.setRenderer(new CUORE.Renderers.LabelPanel);this.labelKey=a;this.setI18NKey(this.labelKey);this.addClass("labelPanel")},getLabelText:function(){return this.getText(this.labelKey)}});CUORE.Components.NumericSelector=CUORE.Class(CUORE.Components.Input,{init:function(a){CUORE.Components.NumericSelector.parent.init.call(this,a);this.limSup=1e+24;this.limInf=0;this.incrementer=1;this.setRenderer(new CUORE.Renderers.NumericSelector)},draw:function(){CUORE.Components.NumericSelector.parent.draw.call(this);this.setValue(this.getValue())},plus:function(){if(!this.isEnabled())return;var a=parseInt(this.getValue(),10)+this.incrementer;this.setValue(a)},minus:function(){if(!this.isEnabled())return;var a=this.getValue()-this.incrementer;this.setValue(a)},setValue:function(a){var b=this._normalizeValue(a);CUORE.Components.NumericSelector.parent.setValue.call(this,b);this.updateRender();this.notifyChanges()},notifyChanges:function(){var a=this.getBus();var b=parseInt(this.getValue(),10);var c={value:b};a.emit("COMPONENT_"+this.name+"_CHANGED",c)},getBus:function(){return CUORE.Bus},setLimSup:function(a){if(a<this.limInf)newlimSup=this.limInf;this.limSup=a;this.setValue(null)},getLimSup:function(){return this.limSup},setLimInf:function(a){if(a>this.limSup)a=this.limSup;this.limInf=a;this.setValue(null)},getLimInf:function(){return this.limInf},setIncrementer:function(a){this.incrementer=a},_normalizeValue:function(a){if(a==="")a=this.limInf;if(a===null)a=this.getValue();var b=this._checkLimits(a);return b},_checkLimits:function(a){if(a>=this.limSup){a=this.limSup}if(a<=this.limInf){a=this.limInf}return this._snap(a)},_snap:function(a){return parseInt(a/this.incrementer,10)*this.incrementer}});CUORE.Components.Link=CUORE.Class(CUORE.Component,{init:function(a,b){CUORE.Components.Link.parent.init.call(this);this.url=a;this.key=b||a;this.setI18NKey(this.key);this.behave(CUORE.Behaviours.HIJACK);this.setRenderer(new CUORE.Renderers.Link)},getLabelText:function(){return this.getText(this.key)},getURL:function(){return this.url}});CUORE.Components.List=CUORE.Class(CUORE.Component,{init:function(){CUORE.Components.List.parent.init.call(this);this.setRenderer(new CUORE.Renderers.List);this.list=[]},fillList:function(a){this.list=a;this.updateRender()},size:function(){return this.list.length},item:function(a){return this.list[a]}});CUORE.Handlers.SetText=CUORE.Class(CUORE.Handler,{handle:function(a){var b=a;var c=b.getFromAnswer("text");var d=b.getFromQuery("key");if(c&&d)this.getOwner().setText(d,c)}});CUORE.Handlers.Executor=CUORE.Class(CUORE.Handler,{init:function(a){this.ownerFunction=a},handle:function(a){this.getOwner()[this.ownerFunction](a)}});CUORE.Handlers.Print=CUORE.Class(CUORE.Handler,{handle:function(){window.print()}});CUORE.Handlers.SwitchCollapseAndUncollapse=CUORE.Class(CUORE.Handler,{handle:function(a){var b=this.owner;var c=b.isCollapsed();return c?b.uncollapse():b.collapse()}});CUORE.Renderers.Input=CUORE.Class(CUORE.Renderer,{paint:function(a){CUORE.Renderers.Input.parent.paint.call(this,a);this.label=CUORE.Dom.createElement("label",null,this.panel);this.addClass("inputJS");this.DOMInput=CUORE.Dom.createElement("input",{type:a.type},this.panel)},updateWhenDrawn:function(a){this.label.innerHTML=a.getInputText();this.DOMInput.value=a.value;this.DOMInput.name=a.getFormName();this.DOMInput.disabled=!a.isEnabled();this.showDisabledState(a);this.setCurrentClasses()},getValue:function(){return this.panel&&this.DOMInput.value}});CUORE.Renderers.Button=CUORE.Class(CUORE.Renderer,{init:function(){CUORE.Renderers.Button.parent.init.call(this);this.setTagName("a");this.DOMClass="button"},paint:function(a){this._adjustBehaviour(a);CUORE.Renderers.Button.parent.paint.call(this,a);this.span=CUORE.Dom.createElement("span",null,this.panel);this.addClass(a.getButtonName());this.addClass(this.DOMClass);this.updateWhenDrawn(a)},_adjustBehaviour:function(a){var b=this.container.tagName!=="A";if(b&&a.doYouHijack()){a.behave(CUORE.Behaviours.APPEND)}},updateWhenDrawn:function(a){this.putText(a);this.setClassCSS(a);this.addEvents(a);this.setCurrentClasses()},putText:function(a){var b=a.getButtonText()||a.getButtonName();this.span.innerHTML=b},setClassCSS:function(a){this.showDisabledState(a)},addEvents:function(a){CUORE.Dom.Event.remove(this.panel,"click");CUORE.Dom.Event.stopDefault(this.panel,"click");if(a.isEnabled()){var b=CUORE.Core.bind(a,a.click);CUORE.Dom.Event.add(this.panel,"click",b)}}});CUORE.Renderers.LabelPanel=CUORE.Class(CUORE.Renderer,{updateWhenDrawn:function(a){CUORE.Renderers.LabelPanel.parent.updateWhenDrawn.call(this,a);this.panel.innerHTML=a.getLabelText()}});CUORE.Renderers.TimeRange=CUORE.Class(CUORE.Renderer,{init:function(){CUORE.Renderers.TimeRange.parent.init.call(this);this.label=null;this.startHourSelect=null;this.endHourSelect=null},paint:function(a){CUORE.Renderers.TimeRange.parent.paint.call(this,a);var b=CUORE.Core.bind(a,a.setStartHour);var c=CUORE.Core.bind(a,a.setEndHour);this.panel.innerHTML=null;this.addClass("timeRange");this.label=CUORE.Dom.createElement("label",null,this.panel);this.startHourSelect=CUORE.Dom.createElement("select",{className:"hourSelect startHourSelect"},this.panel);CUORE.Dom.Event.add(this.startHourSelect,"change",b);this.endHourSelect=CUORE.Dom.createElement("select",{className:"hourSelect endHourSelect"},this.panel);CUORE.Dom.Event.add(this.endHourSelect,"change",c);this.showDisabledState(a)},updateWhenDrawn:function(a){this._setOptions(a);this.showDisabledState(a);this.label.innerHTML=a.getLabelText();this.startHourSelect.value=a.journey.starts();this.endHourSelect.value=a.journey.ends()},showDisabledState:function(a){CUORE.Renderers.TimeRange.parent.showDisabledState.call(this,a);if(!this.startHourSelect||!this.endHourSelect)return;this.startHourSelect.disabled=!a.isEnabled();this.endHourSelect.disabled=!a.isEnabled()},getStartTime:function(){return this._getTimeByProperty("start")},getEndTime:function(){return this._getTimeByProperty("end")},_setOptions:function(a){var b=a.journey.granularity();var c=["00:00",a.journey.ends(),b];var d=[a.journey.starts(),"24:00",b];this._constructOptionsByProperty("start",c);this._constructOptionsByProperty("end",d)},_constructOptionsByProperty:function(a,b){var c=this._getSlots.apply(null,b);var d=this[a+"HourSelect"];this._clearOptions(d);for(var e=0,f=c.length;e<f;e++){var g=c[e][a+"s"]();CUORE.Dom.createElement("option",{value:g,text:g},d)}},_getSlots:function(a,b,c){var d=new CUORE.Journey(a,b);d.withGranularityOf(c);return d.slots()},_clearOptions:function(a){a.options.length=0},_getTimeByProperty:function(a){var b=this[a+"HourSelect"];return b.options[b.selectedIndex].value}});CUORE.Renderers.Collapsable=CUORE.Class(CUORE.Renderer,{updateWhenDrawn:function(a){CUORE.Renderers.Collapsable.parent.updateWhenDrawn.call(this,a);this.panel.innerHTML=a.getPanelLabel()||this.panel.innerHTML;this.collapseBehaviour(a);this.setCurrentClasses()},collapseBehaviour:function(a){var b="collapsed";var c="uncollapsed";this.removeClass(b);this.removeClass(c);if(a.isCollapsed()){this.panel.style.height="0px";this.panel.style.overflow="hidden";this.panel.style.paddding="0px";this.addClass(b)}else{var d=this.panel.scrollHeight+"px";this.panel.style.height=d;this.addClass(c)}}});CUORE.Renderers.SwitchButton=CUORE.Class(CUORE.Renderers.Button,{putText:function(a){var b=this.span;var c=a.isActive()?"active":"inactive";this._putComponentText(a,c,b)},setClassCSS:function(a){CUORE.Renderers.SwitchButton.parent.setClassCSS.call(this,a);if(!this.panel)return;var b=a.isActive()?"on":"off";var c=a.isActive()?"off":"on";this.addClass(b);this.removeClass(c)},_putComponentText:function(a,b,c){var d=a[b+"Label"];var e=a[b+"Key"];var f=d||e;c.innerHTML=f}});CUORE.Renderers.NumericSelector=CUORE.Class(CUORE.Renderers.Input,{init:function(){CUORE.Renderers.NumericSelector.parent.init.call(this);this.valueDisplayed=null},paint:function(a){CUORE.Renderers.NumericSelector.parent.paint.call(this,a);this._decorateInput();this._addMinusButton(a);this._addPlusButton(a)},updateWhenDrawn:function(a){CUORE.Renderers.NumericSelector.parent.updateWhenDrawn.call(this,a);this._checkDecorations(a)},_decorateInput:function(){CUORE.Dom.addClass(this.DOMInput,"numericSelector");var a=CUORE.Core.bind(this,this._clearInput);var b=CUORE.Core.bind(this,this._restoreInput);CUORE.Dom.Event.add(this.DOMInput,"focus",a);CUORE.Dom.Event.add(this.DOMInput,"blur",b)},_clearInput:function(){this.valueDisplayed=this.getValue();this.DOMInput.value=""},_restoreInput:function(){var a=this.getValue();var b=this._isIncorrect(a)||!this._isInteger(a);this.DOMInput.value=b?this.valueDisplayed:a},_addMinusButton:function(a){var b=CUORE.Core.bind(a,a.minus);this.minusButton=CUORE.Dom.createElement("a",{href:"#",className:"minusButton",innerHTML:"<span>-</span>"},this.panel);CUORE.Dom.Event.stopDefault(this.minusButton,"click");CUORE.Dom.Event.add(this.minusButton,"click",b)},_addPlusButton:function(a){var b=CUORE.Core.bind(a,a.plus);this.plusButton=CUORE.Dom.createElement("a",{href:"#",className:"plusButton",innerHTML:"<span>+</span>"},this.panel);CUORE.Dom.Event.stopDefault(this.plusButton,"click");CUORE.Dom.Event.add(this.plusButton,"click",b)},_checkDecorations:function(a){var b=parseInt(this.getValue(),10);var c="off";CUORE.Dom.removeClass(this.plusButton,c);CUORE.Dom.removeClass(this.minusButton,c);if(!a.isEnabled()){CUORE.Dom.addClass(this.plusButton,c);CUORE.Dom.addClass(this.minusButton,c)}if(b+a.incrementer>a.limSup){CUORE.Dom.addClass(this.plusButton,c)}if(b-a.incrementer<a.limInf){CUORE.Dom.addClass(this.minusButton,c)}},_isIncorrect:function(a){var b=a.replace(/^\s+|\s+$/g,"");var c=isNaN(b);var d=!b;return c||d},_isInteger:function(a){var b=parseInt(a,10);return!isNaN(b)&&parseFloat(a)===b}});CUORE.Renderers.Link=CUORE.Class(CUORE.Renderer,{init:function(){CUORE.Renderers.Link.parent.init.call(this);this.DOMClass="link";this.anchor=undefined;this.span=undefined},paint:function(a){this._createAnchor(a);var b=this.container;if(!a.doYouHijack()){this.anchor.id=this.innerDivName(a.getName());b=this.anchor}this.panel=b;this.addClass(this.DOMClass);this.updateWhenDrawn(a)},updateWhenDrawn:function(a){this.putText(a);this.setClassCSS(a);this.setCurrentClasses()},showDisabledState:function(a){this.anchor.href=a.getURL();this.removeClass("disabled");if(!a.isEnabled()){this.addClass("disabled");this.anchor.href=""}},putText:function(a){this.span.innerHTML=a.getLabelText()},setClassCSS:function(a){this.showDisabledState(a)},_createAnchor:function(a){this.anchor=CUORE.Dom.createElement("a",{href:a.getURL()},this.container);this.span=CUORE.Dom.createElement("span",null,this.anchor)}});CUORE.Renderers.List=CUORE.Class(CUORE.Renderer,{init:function(){CUORE.Renderers.List.parent.init.call(this);this.setTagName("ul")},paint:function(a){CUORE.Renderers.List.parent.paint.call(this,a);this.updateWhenDrawn(a)},updateWhenDrawn:function(a){this.panel.innerHTML="";for(var b=0,c=a.size();b<c;b++){this._addItem(a.item(b),b)}},_addItem:function(a){var b=CUORE.Dom.createElement("li",null,this.panel);b.innerHTML=a}});CUORE.Services.Button=CUORE.Class(CUORE.Service,{init:function(){CUORE.Services.Button.parent.init.call(this);this.name="BUTTON";this.executionPrefix="CLICKED"},execute:function(a,b){var c=new CUORE.Message;c.putMapOnQuery(b);b||(b={});b.buttonName=a;c.putOnQuery("buttonName",a);var d=this.getName()+this.SEPARATOR+a+this.SEPARATOR+this.executionPrefix;this.emit(d,c.asJson())}});CUORE.Services.Label=CUORE.Class(CUORE.Service,{init:function(){CUORE.Services.Label.parent.init.call(this);this.name="LABELS";this.cache=document.labels||{};this.setLocale(navigator.language||navigator.browserLanguage)},setLocale:function(a){if(!a)return;this.locale=a;this.cache[this.locale]=this.cache[this.locale]||{}},getLabel:function(a,b){if(!(a&&a.key))return;var c=b+this.SEPARATOR+a.key;var d=this.fromCache(a.key);if(d){var e=new CUORE.Message;e.putMapOnQuery(a);e.putOnAnswer("text",d);CUORE.Services.Label.parent.emit.call(this,c,e.asJson())}else{if(!a.locale)a.locale=this.locale;var f=this.getBaseURL()+"/labels/get";this.request(f,a,c)}},fromCache:function(a){return this.cache[this.locale][a]},feedCache:function(a,b){if(b){this.cache[this.locale][a]=b}},emit:function(a,b){var c=this.extractKey(a);if(!c)return;var d=new CUORE.Message(JSON.stringify(b));var e=d.getFromAnswer("text");this.feedCache(c,e);e=e||c;d.putOnAnswer("text",e);CUORE.Services.Label.parent.emit.call(this,a,d.asJson())},extractKey:function(a){var b=a.match(/_([a-zA-Z\.]*)$/);var c=b?b[1]:null;return c}});CUORE.Services.Null=CUORE.Class(CUORE.Service,{execute:function(){return null}})