jQuery.sap.require("sap.m.MessageToast");
jQuery.sap.require("sap.m.ListBase");
jQuery.sap.require("sap.m.UploadCollectionParameter");
jQuery.sap.require("sap.m.MessageBox");

sap.ui.controller("sap.ui.demo.myFiori.view.AddEmployee", {

	onInit : function() {

		this.router = sap.ui.core.UIComponent.getRouterFor(this);
		 var oFirstName = this.getView().byId("FirstNameid");
		 var oLastName = this.getView().byId("LastNameid");
		 var oCity = this.getView().byId("Cityid");
		 var oCountry = this.getView().byId("Countryid");
		 var text = this.getView().byId("HomePhoneId");
		 var selectExtension = this.getView().byId("selectExtensionId");
		 
		 // VALUE STATE WÝTHOUT MESSAGE

		 text.setValueState(sap.ui.core.ValueState.Error);
		 text.setShowValueStateMessage(false);
		
		// Progress Ýndicator
		var oProgress = this.getView().byId("progressid");
		var oForm = this.getView().byId("formid");		
		oProgress.setDisplayValue("0%");
		oProgress.setPercentValue("0%");
		oForm.removeContent(oProgress);
       

	},
	
	ratingChange : function()
	{ var star = this.getView().byId("starid").getValue();
	  var text = this.getView().byId("textId");	  
	  switch (star) {
	    case 1:
	        day = "1 star";
	        break;
	    case 2:
	        day = "2 star";
	        break;
	    case 3:
	        day = "3 star";
	        break;
	    case 4:
	        day = "4 star";
	        break;
	    case 5:
	        day = "5 star";
	        break;       
	    default:
        day= "no";
	}
	  if(day=="no"){  text.setVisible(false);}
	  else{ text.setVisible(true); }
	  text.setText(day+" selected");
	
	},

	//------LÝNK PRESS FUNCTÝON--------
	handleLinkPress: function(oEvent) {
		var oLabel = this.getView().byId("labelid");
		var oValue = oLabel.getText();
		oLabel.setHref(oValue); //upload yapýlan adreste eklenecek
	},
		
	//----------------- FÝLE UPLOADER --------------------
	handleValueChange: function(oEvent) {
		var name= oEvent.getParameter("newValue");
		console.log(oEvent.getParameter("newValue"));
		var oLabel = this.getView().byId("labelid");
		var oEkler = this.getView().byId("Eklerid");
		oEkler.setVisible(true);
		oLabel.setText(name);
	//	var oList = this.getView().byId("Listid").getItems();	
	//	addItem  = new sap.m.ListBase().oList..addItem(name);  	
	//	 console.log(addItem);
		// oList.addItem(oSelectItem); 
		var oTable = this.getView().byId("tableid");
		
	},
	
	handleUploadPress: function(oEvent) {
		var oFileUploader = this.getView().byId("fileUploader");
		if(!oFileUploader.getValue()) {
			sap.m.MessageToast.show("Choose a file first");
			return;
		}
		// ---------------------PROGRESS ÝNDÝCATOR------------------------
		var oProgress = this.getView().byId("progressid");
		var oForm = this.getView().byId("formid");	
		oForm.insertContent(oProgress, 25);
		oProgress.setEnabled(true);
		// oProgress.setWidth("600px");  Geniþligini kýsaltýr
		var al=0;
		progressInd(0);
		function progressInd(al) {
			
			oProgress.setPercentValue(parseInt(al));
			al++;
			oProgress.setDisplayValue(+ al-1 + "%");
			var sim = setTimeout(function() {
				progressInd(al);
			}, 20);
			if (al > 100) {
				clearTimeout(sim);
				oProgress.setEnabled(false);
			//	oProgress.setVisible(false);
	// ---------------------PROGRESS ÝNDÝCATOR END---------------------------
				oFileUploader.upload();
			}
		};
		
				
	},

	handleUploadComplete: function(oEvent) {
		var input = this.getView().byId("noteid");
		var sResponse = oEvent.getParameter("response");
		
		if (sResponse) {
			var sMsg = "";
			var m = /^\[(\d\d\d)\]:(.*)$/.exec(sResponse);
		// UPLOAD URL DOÐRU OLMADIÐI ÝÇÝN HENÜZ ÇALIÞMIYOR ÇALIÞINCA ALTAKKÝ ÝF ÝÇÝNE DAÐITILACAK
//			if (m[1] == "200") {
//				sMsg = "Return Code: " + m[1] + "\n" + m[2], "SUCCESS", "Upload Success";
//				oEvent.getSource().setValue("");
//			} else {
//				sMsg = "Return Code: " + m[1] + "\n" + m[2], "ERROR", "Upload Error";
//			}
			if (input.getValue().length === 0) {
				sMsg = sMsg + " without notes";
			}
			else {
				sMsg = sMsg + " with notes";
		    }		
			sap.m.MessageToast.show(sMsg);
			input.setValue("");
			var oFileUploader = this.getView().byId("fileUploader");
			oFileUploader.clear();
			console.log(oFileUploader.getButtonText());
			
		}
	
	},
	
	

	onSendPress : function() {
		//---Thousand Seperator------
		var sayi = this.getView().byId("denemeid");
		var sayi2 = this.getView().byId("denemeid2");
		 var x= "5357595,9900";
		var parts = x.toString();
		for (var i = 0; i < parts.length; i++) {
			if (parts.lastIndexOf("0") == parts.length - 1) {
				console.log("son eleman sifir");
				parts = parts.substring(0, parts.length - 1);
			}
		}
		// if(parts.endsWith('0')== true)
		// {parts = parts.substring(0, parts.length - 1); }
		var temp = parts.split(",");
		temp[0] = temp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		// console.log(temp[1].endsWith('0'));
		sayi2.setValue(temp.join(",")); 
	
		
		//DÝNAMÝK SELECT
	/*	var select = this.getView().byId("selectDenemeId");
		var text = this.getView().byId("textDenemeId");
		var oForm = this.getView().byId("formid");
		
		select.setVisible(true);
		text.setVisible(false);
		oForm.removeContent(select);
		oForm.removeContent(text);
		
		var oSelect1 = new sap.m.Select({
			name: "select-name0",
			id:"selectDenemeId" ,
			width:"100%",
			items: [
				new sap.ui.core.Item({
					key: "0",
					text: "item 0"
				}),
				new sap.ui.core.Item({
					key: "1",
					text: "item 1"
				}),
				new sap.ui.core.Item({
					key: "2",
					text: "item 2 is a little long"
				}),
				new sap.ui.core.Item({
					key: "3",
					text: "item 3"
				})
				
			]
		});
		//form.addContent(oSelect1);
		oForm.insertContent(oSelect1, 17);
	//	form.removeContent(oSelect1);
	//	form.insertContent(select, 17);
	*/
	},
	
	liveChangeInput: function()
	{
		var sayi2 = this.getView().byId("denemeid2");
		console.log(sayi2.getValue());
//		for (var i = 0; i < sayý2.length; i++) {
//		if(sayi2[i] == "0") {
//			console.log("içinde sýfýr var");
//		}}
	},
	
	//------------CUSTOM TYPE ÝNPUT CONTROL-----------------
	// 0-9 arasý rakam ve nokta girmeye izin verir
	liveChange: function(){

		var inp = this.getView().byId("inp");
		v= inp.getValue();
		console.log(v);

		if (v) {
		    var re = /1|2|3|4|5|6|7|8|9|0|,/;
		   
		      if (!re.test(v.slice(v.length-1, v.length))) {
		    	  inp.setValue(v.substring(0, v.length-1));
		      }
		    }
	},
	
});
