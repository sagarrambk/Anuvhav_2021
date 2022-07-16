sap.ui.define([
    'anubhav/app/controller/BaseController'
], function(BaseController) {
    'use strict';
    return BaseController.extend("anubhav.app.controller.View1",{
        onInit: function(){
            //this.oRouter = this.getOwnerComponent().getRouter();
            BaseController.prototype.onInit.apply(this);
        },
        onNext: function(){
            //Step 1: go to parent - Anil - kokilaben
            //var oAppCon = this.getView().getParent();
            //Step 2: navigate to mukesh - next view
            //oAppCon.to("idMukesh");
            this.oRouter.navTo("minion");
        },
        onAfterRendering: function(){
            $("#idAnil--myBtn").hide(function(){ $(this).fadeIn(5000) });
        }
    })   ;
});