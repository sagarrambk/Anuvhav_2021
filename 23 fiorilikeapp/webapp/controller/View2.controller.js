sap.ui.define([
    'anubhav/app/controller/BaseController'
], function(BaseController) {
    'use strict';
    return BaseController.extend("anubhav.app.controller.View2",{
        onBack: function(){
            //Step 1: go to parent - Anil - kokilaben
            var oAppCon = this.getView().getParent();
            //Step 2: navigate to mukesh - next view
            oAppCon.to("idAnil");
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