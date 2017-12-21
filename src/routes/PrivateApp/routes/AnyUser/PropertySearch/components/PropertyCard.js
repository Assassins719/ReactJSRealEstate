import React from 'react';
import PropTypes from 'prop-types';
import { Highlight } from 'react-instantsearch/dom';
import { Link } from 'react-router-dom';

/**
 * Gives overview of Property information from an
 * Algolia Hit
 * @param hit
 * @return Link to Detail View of PropertyContainer
 */
function PropertyCard({ hit, match }) {
  // If a user adds a draft without any data, it will still be indexed by Algolia
  // TODO: Live On App toggle needs to
  // trigger a Firebase function that indexes/deindex the property on Algolia
  if (!hit || !hit.data) {
    return (
      <div style={{ border: '1px solid #eee', padding: '20px' }}>Property not found</div>
    );
  }

  return (
    <div style={{ border: '1px solid #eee', padding: '20px' }}>
      {/* /app/properties-search/:id */}
      <Link to={`/app/search-properties/${hit.objectID}`}>
        <div style={{ marginTop: '10px' }}>
          <img src={hit.thumbnailImage} alt="" />
          <h3>{hit.data.landlordName || 'Not defined by user'}</h3>
          <address>
            {hit.data.addressLine1 || 'Not defined by user'}<br />
            {hit.data.postCode || 'Not defined by user'}
          </address>
          <span className="hit-name">
            <Highlight attributeName="landlordName" hit={hit} />
          </span>
        </div>
      </Link>
    </div>
  );
}

PropertyCard.propTypes = {
  hit: PropTypes.shape({
    data: PropTypes.shape({
      landlordName: PropTypes.string,
      lettingType: PropTypes.string
    })
  })
};

export default PropertyCard;
