sap.ui.define([
    'anubhav/app/controller/BaseController'
], function(BaseController) {
    'use strict';
    return BaseController.extend("anubhav.app.controller.View2",{
        onInit: function(){
            //this.oRouter = this.getOwnerComponent().getRouter();
            BaseController.prototype.onInit.apply(this);
            //Route Matched Handler Concept - it will trigger our method
            //herculis every time the minion route is triggered
            //We can use it for preprocessing and binding purpose
            this.oRouter.getRoute("minion").attachMatched(this.herculis, this);
        },
        herculis: function(oEvent){
            var myVar = oEvent.getParameter("arguments").kaven;
            console.log("aa gaya - it has come , Kevan ka value -- " + myVar);
            //address of the selected fruit on first screen
            debugger;
            var fruitRelativePath = "local>/fruits/" + myVar;
            //bind our view2 completely with this address, element binding
            this.getView().bindElement(fruitRelativePath);
        },
        onBack: function(){
            // //Step 1: go to parent - Anil - kokilaben
            // var oAppCon = this.getView().getParent();
            // //Step 2: navigate to mukesh - next view
            // oAppCon.to("idAnil");
            this.oRouter.navTo("home");
        },
        onBeforeRendering: function(){
            //some condition, some data which is in model
            //if x> 50 then --hide == dynamic code
            //this.getView().byId("zkas").setVisible(false);
        },
        onAfterRendering: function(){
            $("#idMukesh--zkas").hide(function(){ $(this).fadeIn(5000) });
        }
    })   ;
});