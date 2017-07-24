sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.sap.workflow.demo.controller.MainView", {
		onInit:function(){
		},
		onBeforeRendering: function(oEvent) {
		     var oRouter = this.getOwnerComponent().getRouter();
		      var startupParameters = this.getOwnerComponent().getComponentData().startupParameters;
					if(!startupParameters.taskModel){
						oRouter.navTo("workflow_start");
					}else if(startupParameters.taskModel.getData().TaskDefinitionName === "Manager Approve"){
						oRouter.navTo("manager_approve");
					}else if(startupParameters.taskModel.getData().TaskDefinitionName === "Leader Approve"){
						oRouter.navTo("leader_approve");
					}
		}
	});
});