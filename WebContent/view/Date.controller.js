jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
sap.ui.controller("sap.ui.demo.myFiori.view.Date", {

	onInit : function() {

		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		this.router.attachRouteMatched(this.attachRouteMatched, this);
	},

	attachRouteMatched : function(oEvent) {

		if (oEvent.getParameter("name") === "Date") {
			var sProductPath = "/Employees("
					+ oEvent.getParameter("arguments").EmployeeID + ")";
			console.log(oEvent.getParameter("arguments").EmployeeID);
			var oModel = this.getView().getModel();
			var Formid = this.getView().byId("formid");
			var oProgress = this.getView().byId("progressid");
			var oPage = this.getView().byId("Pageid");

			var theCont = this;
			oModel.read(sProductPath, {
				filters : null,
				sorters : null,
				async : true,
				success : function(oData, oResponse) {
					console.log(oData);
					Formid.setModel(new sap.ui.model.json.JSONModel({
						formModel : oData
					}));

					Formid.bindElement("/formModel");

				},
				error : function(oError) {
					console.log(oError);

				},
			});
		}

	},

	handleNavButtonPress : function() {
		this.router.myNavBack("Employee");
	},

	handleChange : function(Evt) {
		var o_date = this.byId("DP1").getDateValue();

	},

});
