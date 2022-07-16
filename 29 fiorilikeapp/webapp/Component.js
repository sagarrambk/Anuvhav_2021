sap.ui.define([
    'sap/ui/core/UIComponent'
], function(UIComponent) {
    'use strict';
    return UIComponent.extend("anubhav.app.Component",{
        metadata: {
            manifest: "json"
        },
        init: function(){
            //In this Child Class Constructor, I want to call base Class Constructor
            //Base class has lots of power, until i call i wont get it
            UIComponent.prototype.init.apply(this);
            this.oRouter = this.getRouter();
            this.oRouter.initialize();
        },
        // createContent: function(){
        //     var oView = new sap.ui.view({
        //         viewName: "anubhav.app.view.App",
        //         type: "XML"
        //     });

        //     //Step 1: get the container control object which is inside the App View
        //     var oContainer = oView.byId("idSpidy");

        //     //Step 2: Create objects of your new VIEWs
        //     var oView1 = new sap.ui.view({
        //         viewName: "anubhav.app.view.View1",
        //         id:"idAnil",
        //         type: "XML"
        //     });
        //     var oView2 = new sap.ui.view({
        //         viewName: "anubhav.app.view.View2",
        //         id: "idMukesh",
        //         type: "XML"
        //     });
            

        //     //Step 3: Add our views inside the Container directly
        //     oContainer.addPage(oView1);
        //     oContainer.addPage(oView2);


        //     return oView;
        // },
        destroy: function(){

        }
    });
});