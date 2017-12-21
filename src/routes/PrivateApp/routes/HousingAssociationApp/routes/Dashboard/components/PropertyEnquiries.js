import React from 'react';
import { isEmpty } from 'react-redux-firebase';

const PropertyEnquiries = ({ userPropertiesThatHaveInterest }) => {
  const renderPropertiesWithEmailsList = () =>
    userPropertiesThatHaveInterest.map(property =>
      <div key={property.name}>
        <h3>{property.name}</h3>
        <ul>
          {!isEmpty(property.userEmails)
            ? property.userEmails.map(email => <li key={email}>{email}</li>)
            : <p>No interest yet for {property.name}</p>}
        </ul>
      </div>
    );
  return (
    <div>
      <h3>Properties:</h3>
      {!isEmpty(userPropertiesThatHaveInterest)
        ? renderPropertiesWithEmailsList()
        : null}
    </div>
  );
};

export default PropertyEnquiries;
