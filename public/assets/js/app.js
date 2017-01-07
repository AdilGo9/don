var getMessage = () => "Don Alimentaire";

//document.getElementById('mtitle').innerHTML = getMessage();


//-------------------------------------------------
//FIREBASE API
//-------------------------------------------------
var config = {
	apiKey: "AIzaSyD0d_co8CT93fwEcRJ-DR1mOFRcsO8mwiQ",
	authDomain: "don-alimentaire.firebaseapp.com",
	databaseURL: "https://don-alimentaire.firebaseio.com",
	storageBucket: "don-alimentaire.appspot.com",
	messagingSenderId: "842870639924"
};

firebase.initializeApp(config);


function AddDon() {

	var name = document.forms["myForm"]["nom"].value;
	var description = document.forms["myForm"]["description"].value;
	var adresse = document.forms["myForm"]["adresse"].value;
	

	
	var me = {
		nom: name,
		description: description,
		adresse: adresse
	}
	
	firebase.database().ref('don').push(me);
	return false;
	alert('Votre don à bien été enregistré.')
}

firebase.database().ref("don").on("value", function(snapshot) {
	var valeur = snapshot.val();
	for(var data in valeur)
	{
		document.getElementById('don').innerHTML += "<p class='bg-info'>Nom du donateur : " +
		valeur[data]['nom'] + '<br>Adresse : ' + valeur[data]['adresse'] +'<br>Don : ' + valeur[data]['description'] + "</p>";
	}
});



//-------------------------------------------------
//FACEBOOK API
//-------------------------------------------------

function statusChangeCallback(response) {
	// The response object is returned with a status field that lets the
	// app know the current login status of the person.
	// Full docs on the response object can be found in the documentation
	// for FB.getLoginStatus().
	if (response.status === 'connected') {
		// Logged into your app and Facebook.
		testAPI();
		
	} else if (response.status === 'not_authorized') {
		// The person is logged into Facebook, but not your app.
		document.getElementById('status').innerHTML = 'Please log ' +
		'into this app.';
	} else {
		// The person is not logged into Facebook, so we're not sure if
		// they are logged into this app or not.
		document.getElementById('status').innerHTML = 'Veuillez vous connecter ' +
		'via Facebook.';
	}
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
}

window.fbAsyncInit = function() {
	FB.init({
		appId      : '1776661132657414',
		xfbml      : true,
		version    : 'v2.8'
	});

	FB.getLoginStatus(function(response) {
		statusChangeCallback(response);
	});
};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v2.8&appId=1776661132657414";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
	FB.api('/me', function(response) {
 		document.getElementById('status').innerHTML =
		'Bonjour, ' + response.name + '!';
		document.getElementById('login').style.display="none";
		document.getElementById('navbar').style.display="block";

	});
}
function disconnect() {
	FB.logout(function(response) {
	// user is now logged out
	});
}


// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 15
  });
  var infoWindow = new google.maps.InfoWindow({map: map});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Vous êtes ici !' );
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  /*
  marker = new google.maps.Marker({
    map: map,
    position: {lat: 48.626, lng: 2.428},
    title: 'ADIL!'
  });
  */

}


