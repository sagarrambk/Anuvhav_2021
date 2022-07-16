sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("anubhav.app.Component",{
        metadata: {},
        init: function(){
            //In this Child Class Constructor, I want to call base Class Constructor
            //Base class has lots of power, until i call i wont get it
            UIComponent.prototype.init.apply(this);
        },
        createContent: function(){
            var oView = new sap.ui.view({
                viewName: "anubhav.app.view.App",
                type: "XML"
            });
            return oView;
        },
        destroy: function(){

        }
    });
});