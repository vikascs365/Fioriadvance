sap.ui.define(["sap/ui/core/UIComponent"],
function(UIComponent){
      return UIComponent.extend("tcs.fin.ar.component",{
           
          metadata:{
              "manifest" : "json"
          },
          
           init:function(){
               //Callling the base class contructore in child class
               sap.ui.core.UIComponent.prototype.init.apply(this);
                this.getRouter().initialize();
           },
        //   createContent: function(){
               
        //         var oView1 = new sap.ui.view("idApp", {
        //          type: sap.ui.core.mvc.ViewType.XML,
        //          viewName: "tcs.fin.ar.view.App"
        //       });     
        //         return oView1;          
                       
        //   },
           destroy:function(){
           //clean up code
           sap.ui.core.UIComponent.prototype.destroy.apply(this);
           }
      });
}
);