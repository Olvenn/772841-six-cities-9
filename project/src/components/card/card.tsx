import { useRef, useEffect, useMemo } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { City, Offer } from '../../types/types';
import useMap from './use-card';
import { URL_MARKER, URL_MARKER_ACTIVE } from '../../const';
import { useAppSelector } from '../../hooks';
import { getOffersNearby } from '../../store/reducers/selectors';

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

function Card({ activePoint, offers, offerActive, mapPlace }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, activePoint);
  const offersNearby = useAppSelector(getOffersNearby);

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
    <section data-testid="Map" className={`${mapPlace === 'main' ? 'cities__map map' : 'property__map map'}`} ref={mapRef}></section>
  );
}
export default Card;
