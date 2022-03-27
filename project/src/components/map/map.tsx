import { useRef, useEffect, useMemo } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { City, Offer } from '../../types/types';
import useMap from './useMap';
import { NameSpace, URL_MARKER, URL_MARKER_ACTIVE } from '../../const';
import { useAppSelector } from '../../hooks/';

export type MapProps = {
  activePoint: City;
  offers: Offer[];
  offerActive?: Offer;
  mapPlace: string;
}

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

function Map({ activePoint, offers, offerActive, mapPlace }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, activePoint);
  const offersNearby = useAppSelector((state) => state[NameSpace.offers].offersNearby);

  if (mapPlace === 'property' && offerActive) {
    offers = [...offersNearby, offerActive];
  }

  const layerGroup = useMemo(() => L.layerGroup(), []);

  useEffect(() => {
    if (map) {
      layerGroup.clearLayers();
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offerActive?.id !== undefined && offerActive.id === offer.id)
              ? offerActiveIcon
              : offerIcon,
          })
          .addTo(layerGroup);
      });
      layerGroup.addTo(map);
    }
  }, [map, offers, offerActive, layerGroup]);

  return (
    <section className={`${mapPlace === 'main' ? 'cities__map map' : 'property__map map'}`} ref={mapRef}></section>
  );
}
export default Map;
