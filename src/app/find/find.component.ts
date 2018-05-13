import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {
  places = [];

  constructor() {

    this.places = [
      {
        title: null,
        x: null,
        y: null
      }
    ];
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(function(position) {
      setTimeout(() => {
        // Create a Platform object (one per application):
        var platform = new H.service.Platform(
          {
            'app_id': 'tjzFRGGiA2GzGOfComuw',
            'app_code': 'CNuRw4VizMZata26Z2pb1g'
          });

        // Get an object containing the default map layers:
        var defaultLayers = platform.createDefaultLayers();

        // Instantiate the map using the normal map as the base layer:
        var map = new H.Map(
          document.getElementById('mapContainer'),
          defaultLayers.normal.map,
          {
            zoom: 15,
            center: { lng: position.coords.longitude, lat: position.coords.latitude }
          });

          // Enable the event system on the map instance:
          var mapEvents = new H.mapevents.MapEvents(map);

          //Add event listener:
          map.addEventListener('tap', function(evt) {
            // Log 'tap' and 'mouse' events:
            console.log(evt.type, evt.currentPointer.type);
          });

          var behavior = new H.mapevents.Behavior(mapEvents);
          var ui = H.ui.UI.createDefault(map, defaultLayers);


      }, 1000);
    }, (err) => {}, {timeout: 2000});
  }

  func addPlace() {
    if (this.places[this.places.length-1].title !== null) {
      let place = {
        title: null,
        x: null,
        y: null
      };

      this.places.push(place);
    }
  }

  func deletePlace(index) {
    this.places.splice(index, 1);
  }

  func isDisabled(index) {
    return this.places.length - 1 > index;
  }
}
