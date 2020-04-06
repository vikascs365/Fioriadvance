sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("tcs.fin.ar.controller.View1", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tcs.fin.ar.view.View1
		 */
			 onInit: function() {
		     this.oRouter = this.getOwnerComponent().getRouter();
	
			},
			
          onNext:function(fruitid){
            //  var oAppcontainer = this.getView().getParent().getParent();
            //      oAppcontainer.to("idView2");
            this.oRouter.navTo("chander",{
                  King : fruitid
            });
            
          },
          onDelete:function(oEvent){
            var itemToBeDeleted =  oEvent.getParameter("listItem"); 
             var oList = oEvent.getSource();
            // var oList = this.getView().byId("idList");
              oList.removeItem(itemToBeDeleted);
          },
          onSearch:function(oEvent){
              // what do you want to filter?
             var whatToSearch = oEvent.getParameter("query");
              //how do read value entered by the user in search field?
             var oFilter = new Filter("ProductId", FilterOperator.Contains, whatToSearch );
            //  var oFilter1 = new Filter("type", FilterOperator.Contains, whatToSearch );
            
             var oSuperman = new Filter({
                         filters:[oFilter],
                        //  ,oFilter1],
                         and : false
             });
              this.getView().byId("idList").getBinding("items").filter(oSuperman);
          },
          onItemPress:function(oEvent){
              // Selected item object 
              
              var selectedItem = oEvent.getParameter("listItem");
          
            //  this.getView().getParent().getPages()[1].bindElement(selectedItem.getBindingContextPath());
            // get the view 2 object by traversing thought parents
            //  var oView2 = this.getView().getParent().getPages()[1];
            //   var oView2 = this.getView().getParent().getParent().getDetailPages()[1];
            //  //Get the address of the selected item
              var sPath = selectedItem.getBindingContextPath();
            //  // whole second view now be bound to selected items of view2
            //   oView2.bindElement(sPath);
              //Navigate to next pase
            //  var idx = sPath.split("/");
             var idx = sPath.split("/")[sPath.split("/").length-1];
            
              this.onNext(idx);
          }, 
          onAdd:function(){
              this.oRouter.navTo("addRoute");
              
          }
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf tcs.fin.ar.view.View1
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tcs.fin.ar.view.View1
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tcs.fin.ar.view.View1
		 */
		//	onExit: function() {
		//
		//	}

	});

});