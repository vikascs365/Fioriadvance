sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/Dialog",
	"sap/ui/layout/form/SimpleForm"
], function(Controller, MsgBox, MsgToast,Dialog,SimpleForm) {
	"use strict";

	return Controller.extend("tcs.fin.ar.controller.Add", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tcs.fin.ar.view.View2
		 */
			onInit: function() {
			  this.oRouter = this.getOwnerComponent().getRouter();
		         //every time the route changes
		     this.oRouter.attachRoutePatternMatched(this.sikara, this);
		     
		     var oLocalModel = new sap.ui.model.json.JSONModel({ 
		            "ProductData": {
		                       "ProductId": "VV-1000",
                                "TypeCode": "PR",
                                "Category": "Notebooks",
                                "Name": "Notebook Basic 15",
                                "Description": "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
                                "SupplierId": "100000046",
                                "SupplierName": "SAP",
                                "TaxTarifCode": 1,
                                "MeasureUnit": "EA",
                                "WeightMeasure": "4.200",
                                "WeightUnit": "KG",
                                "Price": "956.0000",
                                "CurrencyCode": "INR",
                                "Width": "30.000",
                                "Depth": "18.000",
                                "Height": "3.000",
                                "DimUnit": "CM",
                                "ProductPicUrl": "/sap/public/bc/NWDEMO_MODEL/IMAGES/HT-1000.jpg",
                                "HmMime": "",
                                "YmimeType": "",
                                "ZmimeType": ""
		            }
		     });
		     this.getView().setModel(oLocalModel,"viewModel");
			},
		 // telling the route to hit this method every time the route changes - registration	
			sikara:function(oEvent){
			    if(!this.oDataModel){
			    this.oDataModel = this.getView().getModel();
			    }
			},
          onBack:function(){
              var oAppCont = this.getView().getParent();
               oAppCont.to("idView1");
          },
          onSave:function(){
            
              var localModel = this.getView().getModel("viewModel");
              var payLoad = localModel.getProperty("/ProductData");
               this.oDataModel.create("/ProductSet",payLoad,{
                   success:function(odata){
                       MsgToast.show("Record saved");
                   },
                   error:function(oError){ 
                       MsgBox.error("error recorded");
                   }
                   
                   
               });
              
          }
          
          

	});

});