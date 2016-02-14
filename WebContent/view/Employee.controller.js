jQuery.sap.require("sap.m.MessageBox");
sap.ui.controller("sap.ui.demo.myFiori.view.Employee",
				{

					onInit : function() {

						this.router = sap.ui.core.UIComponent.getRouterFor(this);
						this.router.attachRouteMatched(this.attachRouteMatched,this);
						
						
					},
					
//					onBeforeRendering: function(){
//					var oRegionid = this.getView().byId("Regionid");
//					var oRegionLabelid = this.getView().byId("RegionLabelid");
//					console.log(oRegionid.getText());
//					if(oRegionid.getText()== "WA"){
//						console.log("basarili");
//					}
					
//						var oRegionid = this.getView().byId("Regionid");
//						var oRegionLabelid = this.getView().byId("RegionLabelid");
//						console.log("sd");
//						console.log(oRegionid.getText());
//						if(oRegionid.getText()== null || "" || " " || "null"){
//				//	},

   attachRouteMatched : function(oEvent) {
		if (oEvent.getParameter("name") === "Employee") {
				var sProductPath = "/Employees("+ oEvent.getParameter("arguments").EmployeeID+ ")";
				console.log(oEvent.getParameter("arguments").EmployeeID);
				var oModel = this.getView().getModel();
				var oRegionid = this.getView().byId("Regionid");
				var oRegionLabelid = this.getView().byId("RegionLabelid");
				var Formid = this.getView().byId("formid");
				this.bDialog = new sap.ui.xmlfragment("sap.ui.demo.myFiori.view.BusyDialog", this);
				this.getView().addDependent(this.bDialog);
				this.bDialog.open();
				var theCont = this;
				//async request attýk
				oModel.read(sProductPath,{
					filters:null,
					sorters : null,
					async : true,
					success:function(oData, oResponse) {
								console.log(oData);
								Formid.setModel(new sap.ui.model.json.JSONModel(
								{
								   formModel : oData
								}));
								console.log(oRegionid.getText());
								if(oRegionid.getText()== ""  ) // GELEN DATA NULL ANCAK BASILAN DATA BOS. DÝKKAT ET
								{
									console.log("basarili");
									oRegionid.setVisible(false);
									oRegionLabelid.setVisible(false);
								}
								else{
									oRegionid.setVisible(true);
									oRegionLabelid.setVisible(true);
								}
								Formid.bindElement("/formModel");
								 theCont.bDialog.close();
								  theCont.bDialog.destroy();		
								},
					error :function(oError) {
									console.log(oError);
								   var messageErr = JSON.parse(oError.response.body);
                                    alert(messageErr);
									theCont.bDialog.close();
								    theCont.bDialog.destroy();

								},}
								);

						}
	
			},

			onPressDateShow:function(Evt)
			{  	var oDialog = this.getView().byId("BusyDialog");
			    oDialog.open();
				var oContext = this.byId("labelid").getText();
				jQuery.sap.delayedCall(900, this, function () {
				console.log(oContext);
				this.router.navTo("Date", {EmployeeID : oContext});
				oDialog.close();
				});
				
			},
			
				
					
});
