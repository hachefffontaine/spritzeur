var htmlUrl = browser.extension.getURL("templates/template.html");
var logoUrl = browser.extension.getURL("images/spritzeur32.png");
var fermerUrl = browser.extension.getURL("images/fermer.png");
var menuUrl = browser.extension.getURL("images/menu.png");
var breakUrl = browser.extension.getURL("images/break.png");
var playUrl = browser.extension.getURL("images/play.png");

function toggleBreakPlay(breakUrl, playUrl) {
	if(ospritz.isBreak) {
		ospritz.play();
		$("#spritzeur-action").attr("src", breakUrl);
	}
	else {
		ospritz.break();
		$("#spritzeur-action").attr("src", playUrl);
	}
}

function storeSomething(key, value) {
	browser.storage.local.set({ [key] : value });
}

function spritzeur() {
	$.get(htmlUrl, function (data) {
		$('#spritzeur-word').remove();
		var html = data;
		var cleanHTML = DOMPurify.sanitize(html, { SAFE_FOR_JQUERY: true });
		$("body").prepend(cleanHTML);
		$("#spritzeur-logo").attr("src", logoUrl);
		$("#spritzeur-menu").attr("src", menuUrl);
		$("#spritzeur-fermer").attr("src", fermerUrl);
		$("#spritzeur-fermer").click(function() {
			$('#spritzeur-word').remove();
		});
		$("#spritzeur-menu").click(function() {
			$(".spritzeur-menu").toggle("slide", {direction: "up"});
		});
		
		$("#spritzeur-vitesse option[value='" + vitesse + "']").prop("selected", true);
		if(fermeture == "automatique") {
			$("#spritzeur-fermeture").attr("checked", "checked");
		}
		
		if( getSelection().toString() ) {
			console.log( "trsesd");
			console.log( $("#spritzeur-action") ) ;
			$("#spritzeur-action").show();
			$("#spritzeur-action").attr("src", breakUrl);
			$("#spritzeur-action").click(function() {
				toggleBreakPlay(breakUrl, playUrl);
			});

			ospritz.init(getSelection().toString(), $("#spritzeur-word"), vitesse, (fermeture == "automatique"));
		}
		
		$("#spritzeur-fermeture").click(function() {
			fermeture = (fermeture == "automatique") ? "manuelle" : "automatique";
			storeSomething(cstFermeture, fermeture);
		});
		
		$("#spritzeur-vitesse").change(function() {
			vitesse = $("#spritzeur-vitesse").val();
			storeSomething(cstVitesse, $("#spritzeur-vitesse").val());
		});
	});
}

spritzeur();
