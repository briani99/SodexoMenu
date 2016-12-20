sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller, Menu) {
	"use strict";

	return Controller.extend("briani99.ui5.controller.Home", {
		
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("home").attachPatternMatched(this._onObjectMatched, this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
			oRouter.getRoute("location").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			
			var daySelected = oEvent.getParameter("arguments").day;
			var sPage = oEvent.getParameter("arguments").canteen;
			
			if(!daySelected){ 
				//get Today
				daySelected = this._getDayAsString(new Date().getDay()); 
			}     
			//if Saturday or Sunday then load Monday
			if (daySelected === "Saturday" || daySelected === "Sunday"){
				daySelected = "Monday";
			}
			var path = "/JSONMenu/" + daySelected;
			
			var menuFragment = sap.ui.xmlfragment(this.getView().getId(), "briani99.ui5.view.Menu");
			var caro = this.getView().byId("menuCaro");
			this.getView().byId("headerLabel").setText(daySelected);
			caro.bindAggregation("pages", path, menuFragment);
			
			
			if(sPage){
				var activePageID = caro.getPages()[0].getId();
				activePageID = activePageID.slice(0, -1) + sPage;
				caro.setActivePage(activePageID);
			}
			
			if(daySelected === "Monday") {
				this.getView().byId("btnLeft").setEnabled(false);
			}else if (daySelected === "Friday"){
				this.getView().byId("btnRight").setEnabled(false);
			}else {
				this.getView().byId("btnLeft").setEnabled(true);
				this.getView().byId("btnRight").setEnabled(true);
			}

			
			
		},
		
		_getDayAsString: function(dayNumber){
			//For Saturday or Sunday lets return Monday
			var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
			return days[dayNumber];	
		},
		
		_getDayAsNumber: function(dayString){
			
			var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
			return days.indexOf(dayString);		
		},
		
		_getPreviousDay: function(day){
			var number = this._getDayAsNumber(day);
			number -= 1;
			return this._getDayAsString(number);
		},
		
		_getNextDay: function(day){
			var number = this._getDayAsNumber(day);
			number += 1;   
			return this._getDayAsString(number);
		},
		
		onPreviousDay: function(oEvent){
			
			var caro = this.getView().byId("menuCaro");
			
			var oBinding = caro.getBinding("pages");
			var sPath = oBinding.getPath();
			var sDay = sPath.substr("/JSONMenu/".length);
			var newDay = this._getPreviousDay(sDay);
			
			var activePageNo = caro.indexOfPage(sap.ui.getCore().byId(caro.getActivePage()));
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				day: newDay,
				canteen: activePageNo
			});
		},
		
		onNextDay: function(oEvent){
			var caro = this.getView().byId("menuCaro");
			
			var oBinding = caro.getBinding("pages");
			var sPath = oBinding.getPath();
			var sDay = sPath.substr("/JSONMenu/".length);
			var newDay = this._getNextDay(sDay);
			
			var activePageNo = caro.indexOfPage(sap.ui.getCore().byId(caro.getActivePage()));
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				day: newDay,
				canteen: activePageNo
			});
			
		}
	});
});