sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/Dialog",
	"sap/ui/layout/form/SimpleForm"
], function(Controller, MsgBox, MsgToast,Dialog,SimpleForm) {
	"use strict";

	return Controller.extend("tcs.fin.ar.controller.View2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf tcs.fin.ar.view.View2
		 */
			onInit: function() {
			  this.oRouter = this.getOwnerComponent().getRouter();
		         //every time the route changes
		     this.oRouter.attachRoutePatternMatched(this.sikara, this);
			},
		 // telling the route to hit this method every time the route changes - registration	
			sikara:function(oEvent){
			    
			  var fruitIndex = oEvent.getParameter("arguments").King;
			  var sPath =  "/"+fruitIndex;
			  this.getView().bindElement(sPath); 
		
			},
          onBack:function(){
              var oAppCont = this.getView().getParent();
               oAppCont.to("idView1");
          },
          
          oPopSupplier:null,
          oPopCities:null,
          onSetting:function(){
            //   MsgBox.confirm("This page is for settings...");
            if(!this.oPopSupplier){
                this.oPopSupplier= sap.ui.xmlfragment("tcs.fin.ar.fragments.popup");
                this.getView().addDependent(this.oPopSupplier);
                this.oPopSupplier.bindAggregation("items",{
                    path:"/Supplier",
                    template: new sap.m.DisplayListItem({
                       value: "{city}" ,
                       label:"{name}"
                    })
                });
            }
             this.oPopSupplier.open(); 
          },
          onF4Help:function(){
            //  MsgToast.show("please Check later");
             if(!this.oPopCities){
                this.oPopCities= sap.ui.xmlfragment("tcs.fin.ar.fragments.popup");
                this.getView().addDependent(this.oPopCities);
                this.oPopCities.bindAggregation("items",{
                    path: "/Cities",
                    template: new sap.m.StandardListItem({
                        icon:"sap-icon://account",
                        title: "{name}",
                        description: "{state}" 
                        
                    })
                });
                
                
            }
             this.oPopCities.open(); 
              
          }, 
          onSave:function(){
              MsgBox.confirm("Do you want realy want to save",{
                  onClose: this.onClose
              });
          },
          onClose:function(args){
              if(args==="OK"){
                  MsgToast.show("your Data is saved sucessfully");
              }else{
                  MsgBox.error("Data cannot be saved");
              }
              
          },
          onFunctionImport: function(){
              //Get the object of the odata model
              var oDataModel = this.getView().getModel();
              var that = this;
             //call the desired method of odata model 
              oDataModel.callFunction("/getmostexpensiveproduct", {
                   urlParameters:{
                  "I_CAT": "Notebooks"
                     },
              success:function(data){
                  
                   var oDialog = new Dialog();
                   var oModel = new sap.ui.model.json.JSONModel({
                        "Ram" : data
                   });
                   oDialog.setModel(oModel);
                   oDialog.addContent(
                         new SimpleForm({
                             content: [
                             new sap.m.Text({text:"Product"}),
                             new sap.m.Input({value:"{ProductId}"})
                            //  new sap.m.Text({text:"Product"}),
                            //  new sap.m.Input({value:"{ProductId}"})
                             ]
                            })
                            );
                    //   var oSimpleForm = oSimpleForm.getAggregation("content")[0];
                    //   oSimpleForm.bindElement("/Ram");
                     var oSimpleForm = oDialog.getAggregation("content")[0];
                     oSimpleForm.bindElement("/Ram");
                       oDialog.open();
                            }
                        });
             
                    }
          
          
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf tcs.fin.ar.view.View2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf tcs.fin.ar.view.View2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf tcs.fin.ar.view.View2
		 */
		//	onExit: function() {
		//
		//	}

	});

});