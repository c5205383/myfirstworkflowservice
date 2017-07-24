sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("com.sap.workflow.demo.controller.StartWorkFlow", {

     onInit: function() {
        this.getView().setModel(new sap.ui.model.json.JSONModel({
            text: "",
            result: ""
        }));
        this._fetchToken();
    },
     
    startWorkflow: function() {
        this._startInstance(this.token);
    },
     
    _startInstance: function(token) {
        var model = this.getView().getModel();
        var employeeName = model.getProperty("/employeeName");
        var applicant = model.getProperty("/applicant");
        var manager = model.getProperty("/manager");
        var leader = model.getProperty("/leader");
        $.ajax({
            url: "/bpmworkflowruntime/rest/v1/workflow-instances",
            method: "POST",
            async: false,
            contentType: "application/json",
            headers: {
                "X-CSRF-Token": token
            },
            data: JSON.stringify({
                definitionId: "workflow2",
                context: {
                    "userId":  applicant,
                    "manager": manager,
                    "leader": leader,
					   "employee": {
					      "name": employeeName
					   },
					"status":  "started"
                }
            }),
            success: function(result, xhr, data) {
                model.setProperty("/result", JSON.stringify(result, null, 4));
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