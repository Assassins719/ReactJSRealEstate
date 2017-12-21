## API Usage
React Instantsearch: Grabs data from the Homepointr index
Todo: Firebase function that deindex a property when one is removed from RTDB
Firebase Functions: Every time a property is added to RTDB it is indexed in Algolia 

## Schemas:
New but incomplete:
````json
{
  "data": {
    "liveOnApp": true,
    "addressLine1": "1661 Carleton Court",
    "schools": "Primary School (0.1 miles)",
    "postCode": "94061",
    "other-1": "One Other",
    "landlordInformation": "None",
    "keyfact-1": "One Fact",
    "long": "0.08",
    "pubsBarsRestaurants": "Henry voluntary service (0.5 miles)",
    "lettingType": "Supported Housing",
    "landlordName": "California",
    "feature-1": "One Feature",
    "cityOrTown": "Redwood City",
    "transportLinks": "Bus stop (0.1) miles",
    "lat": "51.30"
  },
  "objectID": "-KxTF4UT2nA3SBz9mBbM"
}
````

Old, works in the view, arrays have correct structure:
````json
{
  "data": {
    "addressLine1": "Craig Street",
    "schools": "Primary School (0.1 miles)",
    "postCode": "EH6 5HG",
    "keyFacts": [
      {
        "firstName": "Key fact 1"
      },
      {
        "firstName": "Keyfact 2"
      }
    ],
    "features": [
      {
        "firstName": "feature 1"
      },
      {
        "firstName": "feature 2"
      }
    ],
    "others": [
      {
        "firstName": "other"
      },
      {
        "firstName": "other2"
      }
    ],
    "landlordInformation": "additional info",
    "liveOnApp": true,
    "long": "123.123",
    "pubsBarsRestaurants": "Henry voluntary service (0.5 miles)",
    "lettingType": "Option1",
    "landlordName": "Bield Housing and Care",
    "cityOrTown": "Edinburgh",
    "transportLinks": "Bus stop (0.1) miles",
    "lat": "124.1124"
  },
  "objectID": "4"
}
````
