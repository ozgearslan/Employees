jQuery.sap.require("sap.ui.model.Model");
sap.ui.controller("sap.ui.demo.myFiori.view.Employees", {

	onInit : function() {

		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		

	},

	handleListItemPress : function(Evt) {
		var oModel = this.getView().getModel();
	//	var oDialog = this.getView().byId("BusyDialog");
	//	oDialog.open(); dialogu böyle çaðýrmak yerine, async request yaptým
		var oContext = Evt.getSource().getBindingContext();
	//	jQuery.sap.delayedCall(900, this, function() {
			console.log(oContext);
			this.router.navTo("Employee", {
				EmployeeID : oContext.getProperty("EmployeeID")
		//	});

			// console.log("kapandi");
			// oDialog.close();
		});

	},

	// ----------------- TWO PARAMETER SEARCH FÝLTER FUNCTÝON---------------
	onSearch : function(oEvt) {
		var sQuery = oEvt.getSource().getValue();
		if (sQuery && sQuery.length > 0) {
			var filter = new sap.ui.model.Filter("FirstName",
					sap.ui.model.FilterOperator.EQ, sQuery);
			var filter2 = new sap.ui.model.Filter("LastName",
					sap.ui.model.FilterOperator.EQ, sQuery);
			var aFilters = new sap.ui.model.Filter([ filter, filter2 ], false); 
		}

		var list = this.getView().byId("listid");
		var binding = list.getBinding("items");
		binding.filter(aFilters, "Application");
	},
// ----------------- TWO PARAMETER SEARCH FÝLTER FUNCTÝON END ---------------

	onPressEmployee: function()
	{
		

		this.router.navTo("AddEmployee");
		console.log("vhdj");
	},
});
