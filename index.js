var features = ["map-container", "music-container"]
var requestedFeature = "map-container";

$(function () { 
  var element = document.getElementById("stage"); 
  var mc = new Hammer(document.body);

  featureIndex = features.indexOf(requestedFeature);
  previousFeature = requestedFeature;

  mc.get('swipe').set({ 
    "direction": Hammer.DIRECTION_ALL,
    "pointers": 2,
    "threshold": 3,
    "velocity": .1,
  });

  mc.get("pan").set({
    "pointers": 2,
    "threshold": 3, 
    "velocity": .1,
  });

  mc.on("swipeleft", function (e) { 
    // if(featureIndex != (features.length - 1))
    //   requestedFeature = features[features.indexOf(requestedFeature) + 1];
    var temp = features.shift();
    features.push(temp);
    
    activeChooser(features[0]);
    changeViewTo(features[0], features[features.length - 1]);
  }); 
      
  mc.on("swiperight", function (e) { 
    // if(features.indexOf(requestedFeature) != 0)
    //   requestedFeature = features[features.indexOf(requestedFeature) - 1];
    
      var temp = features.pop();
      features.unshift(temp);
      activeChooser(features[0]);
      changeViewTo(features[0], features[1]);
  });
  
  mc.on("panup", function (e) { 
    var inputWidth = parseInt($('#volume-control').css("width").replace("px", ""));
    var moveBy = Math.abs((e.deltaY / 100));
    console.log("Up: " + moveBy);
    $('#volume-control').removeClass("d-none");
    $('#volume-control').val(parseInt($('#volume-control').val()) + moveBy);
  }); 
  
  mc.on("pandown", function (e) { 
    var inputWidth = parseInt($('#volume-control').css("width").replace("px", ""));
    var moveBy = Math.abs((e.deltaY / 100));
    //moveBy = moveBy < 0 ? -1 * moveBy : moveBy;
    console.log("Down: " + moveBy);
    $('#volume-control').val(parseInt($('#volume-control').val()) - moveBy);
  });

  mc.on("panend", function (e){
    $('#volume-control').addClass("d-none"); 
  });

  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: {lat: 32.2319, lng: -110.9501},
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ],
          disableDefaultUI: true,
    });
}

initMap();

});

$('.footer-image-container').on('click', function (){
  $('.active').removeClass('active');
  $(this).parents('.col-md-1').addClass('active');
});

function changeViewTo(requestedFeature, previousFeature) {
  previousFeatureDomElem = $('.' + previousFeature);
  requestedFeatureDomElem = $('.' + requestedFeature);
  previousFeatureDomElem.addClass("d-none");
  requestedFeatureDomElem.removeClass("d-none");
}

function activeChooser(currentView) {
  switch (currentView){
    case "map-container":
      $('.active').removeClass("active");
      $('.car-image').addClass("active");
      break;
    case "music-container":
      $('.active').removeClass("active");
      $('.music-image').addClass("active");
      break;
  }
}