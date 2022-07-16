sap.ui.define([
    'anubhav/app/controller/BaseController'
], function(BaseController) {
    'use strict';
    return BaseController.extend("anubhav.app.controller.View1",{
        onNext: function(){
            //Step 1: go to parent - Anil - kokilaben
            var oAppCon = this.getView().getParent();
            //Step 2: navigate to mukesh - next view
            oAppCon.to("idMukesh");
        },
        onAfterRendering: function(){
            $("#idAnil--myBtn").hide(function(){ $(this).fadeIn(5000) });
        }
    })   ;
});