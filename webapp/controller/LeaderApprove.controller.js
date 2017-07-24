sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.sap.workflow.demo.controller.LeaderApprove", {
	    onInit:function(){
			 this._fetchToken();
			var startupParameters = this.getOwnerComponent().getComponentData().startupParameters;
			var taskId = this.getOwnerComponent().getComponentData().startupParameters.taskModel.getData().InstanceID;
			var contextModel = new sap.ui.model.json.JSONModel();
		    contextModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
		    this.getOwnerComponent().getComponentData().startupParameters.inboxAPI.setShowFooter(false);  
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
            this.getView().setModel(contextModel, "contextModel");
		},
					onBeforeRendering: function(oEvent) {
				var startupParameters = this.getOwnerComponent().getComponentData().startupParameters;
		
		       startupParameters.inboxAPI.setShowFooter(false);  	
			},
		handleApproveEmployee: function(oEvent) {
			    var token = this.token;
			    var taskId=this.getOwnerComponent().getComponentData().startupParameters.taskModel.getData().InstanceID;
			    var approvalStatus=true;
			    var that = this;
			    $.ajax({
			        url: "/bpmworkflowruntime/rest/v1/task-instances/" + taskId,
			        method: "PATCH",
			        contentType: "application/json",
			        async: false,
			        data: "{\"status\": \"COMPLETED\", \"context\": {\"approved\":" + approvalStatus + "}}",
			        headers: {
			            "X-CSRF-Token": token
			        },
			        success: function(result, xhr, data){
			        	that._refreshTask(taskId);
			        }
			    });

		},
		_refreshTask: function(taskId) {
		   this.getOwnerComponent().getComponentData().startupParameters.inboxAPI.updateTask("NA", taskId);
		},
	    handleRejectEmployee: function(oEvent) {
		        var token = this.token;
			    var taskId=this.getOwnerComponent().getComponentData().startupParameters.taskModel.getData().InstanceID;
			    var approvalStatus=false;
			    var that = this;
			    $.ajax({
			        url: "/bpmworkflowruntime/rest/v1/task-instances/" + taskId,
			        method: "PATCH",
			        contentType: "application/json",
			        async: false,
			        data: "{\"status\": \"COMPLETED\", \"context\": {\"approved\":" + approvalStatus + "}}",
			        headers: {
			            "X-CSRF-Token": token
			        },
			        success: function(result, xhr, data){
			        	that._refreshTask(taskId);
			        }
			    });
		},
	    _fetchToken: function() {
		    var that = this;
		    $.ajax({
		        url: "/bpmworkflowruntime/rest/v1/xsrf-token",
		        method: "GET",
		        async: false,
		        headers: {
		            "X-CSRF-Token": "Fetch"
		        },
		        success: function(result, xhr, data) {
		            that.token = data.getResponseHeader("X-CSRF-Token");
		        }
		    });
		}
	});
});