- Property expression of interest system
  - User Clicks "Interested" on a property page
  - Pushes a userUId to /properties/propertyId/tenantsInterested/userUid
  - Housing Provider that has properties, opens Property Manager,
  - finds properties under /users/userUid/haUserProperties/
  - Loops over them and finds see the interested parties

PropertyEnquiresContainer query:
- Grab all property IDs under `/users/authUid/haUserProperties`

Match those against `/propertiesFindersAreInterestedIn`  

````js
const populates = [{ child: 'haUserProperties', root: 'propertiesFindersAreInterestedIn' }];
export default compose(
    firebaseConnect((props, firebase) => {
      const { _: { authUid } } = firebase;
      const HA_UserRef = `/users/${authUid}`;
      return [{ path: HA_UserRef, populates }];
    }),
    connect(({ firebase }) => ({
      propertiesUserCreatedThatFindersAreInterestedIn: firebase.data.propertiesFindersAreInterestedIn,
    }))
)
````

This should return a list of Property IDs the logged in a Housing Provider created (not other Housing Providers) and a list of Housing Finders that are interested in those properties.

propertyId: { housingFinderId: true } 

1. Is there an easy Populate method/magic RRF query to get the authentication email address of every housingFinderId, should be stored under /users/${housingFinderId}/email

2. Is the simplest way to get the name of the propertyId just to `.once` it? I feel shouldn't need to Populate this.
