import { useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Offer } from '../../types/types';
import useMap from './useMap';
import { URL_MARKER, URL_MARKER_ACTIVE } from '../../const';

export type MapProps = {
  activePoint: City;
  offers: Offer[];
  offerActive: number;
  mapPlace: string;
}
function Map({ activePoint, offers, offerActive, mapPlace }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, activePoint);

  const offerIcon = leaflet.icon({
    iconUrl: URL_MARKER,
    iconSize: [27, 39],
    iconAnchor: [13.5, 20],
  });

  const offerActiveIcon = leaflet.icon({
    iconUrl: URL_MARKER_ACTIVE,
    iconSize: [27, 39],
    iconAnchor: [13.5, 20],
  });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offerActive !== undefined && offerActive === offer.id)
              ? offerActiveIcon
              : offerIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers, offerActive, offerIcon, offerActiveIcon]);

  return (
    <section className={`${mapPlace === 'main' ? 'cities__map map' : 'property__map map'}`} ref={mapRef}></section>
  );
}
export default Map;
