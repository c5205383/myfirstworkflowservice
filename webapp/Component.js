sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/sap/workflow/demo/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.sap.workflow.demo.Component", {

		metadata: {
			manifest: "json",
			includes: ["css/style.css"]
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.getRouter().initialize();
		/*	var startupParameters = this.getComponentData().startupParameters;
			var taskId = this.getComponentData().startupParameters.taskModel.getData().InstanceID;
			var contextModel = new sap.ui.model.json.JSONModel();
		    contextModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
		    startupParameters.inboxAPI.setShowFooter(false);  
			$.ajax({
			   url: "/bpmworkflowruntime/rest/v1/task-instances/" + taskId + "/context",
			   method: "GET",
			   contentType: "application/json",
			   dataType: "json",
			   success: function(result, xhr,data){
			   //  var processContext= data.responseJSON;
			     contextModel.setData(data.responseJSON);
			   }
			
			});
			
		    startupParameters.inboxAPI.getDescription("NA", taskId).done(function(dataDescr){
                contextModel.setProperty("/context/task/Description", dataDescr.Description);
	        }).
	        fail(function(errorText){
		            contextModel.setProperty("/context/task/Description", "");
	                jQuery.sap.require("sap.m.MessageBox");
	                sap.m.MessageBox.error(errorText, { title: "Error"}); 
	        });
            this.setModel(contextModel, "contextModel");*/
		}
	
		
	});
});