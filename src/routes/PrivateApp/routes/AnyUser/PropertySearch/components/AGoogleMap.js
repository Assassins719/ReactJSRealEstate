import React from 'react'
import { connectHits } from 'react-instantsearch/connectors';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

function CustomMarker() {
  /*  eslint-disable max-len */
  return (
    <svg width="60" height="102" viewBox="0 0 102 60" className="marker">
      <g fill="none" fillRule="evenodd">
        <g
          transform="translate(-60, 0)"
          stroke="#8962B2"
          id="pin"
          viewBox="0 0 100 100"
        >
          <path
            d="M157.39 34.315c0 18.546-33.825 83.958-33.825 83.958S89.74 52.86 89.74 34.315C89.74 15.768 104.885.73 123.565.73c18.68 0 33.825 15.038 33.825 33.585z"
            strokeWidth="5.53"
            fill="#E6D2FC"
          />
          <path
            d="M123.565 49.13c-8.008 0-14.496-6.498-14.496-14.52 0-8.017 6.487-14.52 14.495-14.52s14.496 6.503 14.496 14.52c0 8.022-6.487 14.52-14.495 14.52z"
            strokeWidth="2.765"
            fill="#FFF"
          />
        </g>
      </g>
    </svg>
  )
  /*  eslint-enable max-len */
}

function AGoogleMap({ hits, onLatLngChange }) {
  const availableSpace = {
    width: document.body.getBoundingClientRect().width * 5 / 12,
    height: 400
  }
  const boundingPoints = hits.reduce(
    (bounds, hit) => {
      const pos = hit
      if (pos.lat > bounds.nw.lat) bounds.nw.lat = pos.lat
      if (pos.lat < bounds.se.lat) bounds.se.lat = pos.lat

      if (pos.lng < bounds.nw.lng) bounds.nw.lng = pos.lng
      if (pos.lng > bounds.se.lng) bounds.se.lng = pos.lng
      return bounds
    },
    {
      nw: { lat: -85, lng: 180 },
      se: { lat: 85, lng: -180 }
    }
  )
  const boundsConfig = hits.length > 0
    ? fitBounds(boundingPoints, availableSpace)
    : { zoom: 11, center: { lat: -85, lng: 180 } }
  const markers = hits.map(hit =>
    <CustomMarker lat={hit.lat} lng={hit.lng} key={hit.objectID} />
  )
  const options = {
    minZoomOverride: true,
    minZoom: 2
  }
  return (
    <GoogleMap
      options={() => options}
      bootstrapURLKeys={{
        key: 'AIzaSyAl60n7p07HYQK6lVilAe_ggwbBJFktNw8'
      }}
      center={boundsConfig.center}
      zoom={boundsConfig.zoom}
      onClick={onLatLngChange}
    >
      {markers}
    </GoogleMap>
  )
}

AGoogleMap.propTypes = {
  hits: PropTypes.array,
  onLatLngChange: PropTypes.func
}

const ConnectedHitsMap = connectHits(AGoogleMap)
export default ConnectedHitsMap
