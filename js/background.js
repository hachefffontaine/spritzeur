var cstVitesse = "VITESSE";
var cstFermeture = "FERMETURE";

var vitesse, fermeture;

function storageInit() {	
	var gettingAllStorageItems = browser.storage.local.get(null);
	gettingAllStorageItems.then((results) => {
		vitesse = results[cstVitesse];
		fermeture = results[cstFermeture];
		
		if( !vitesse ) {
			vitesse = 400;
			browser.storage.local.set({ [cstVitesse] : vitesse });
		}
		if( !fermeture ) {
			fermeture = "automatique";
			browser.storage.local.set({ [cstFermeture] : fermeture });
		}
	});	
}

browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
	browser.pageAction.setIcon({tabId: tab.id, path: "images/spritzeur32.png"});
	browser.pageAction.show(tab.id);
	storageInit();
});

browser.pageAction.onClicked.addListener(function(info, tab) {
	browser.tabs.insertCSS({file: "templates/template.css"});

	browser.tabs.executeScript({code: "var vitesse="+vitesse+"; var fermeture='"+fermeture+"'; var cstVitesse='"+cstVitesse+"'; var cstFermeture='"+cstFermeture+"';"}, function(){
        browser.tabs.executeScript({file: "js/launcher.js"});
    });
});


