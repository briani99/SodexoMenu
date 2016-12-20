sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		
		createMenuModel: function() {
			var menuModel = new JSONModel();
			menuModel.loadData("/destinations/mymenu", "", false);
			menuModel.setDefaultBindingMode("OneWay");
			return menuModel;
		}

	};
});