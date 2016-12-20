sap.ui.define([
		"/briani99/ui5/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("briani99.ui5.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("day");
			}

		});

	}
);