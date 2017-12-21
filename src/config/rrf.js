const rrfConfig = {
  userProfile: 'users', // where profiles are stored in database,
  profileParamsToPopulate: [{ child: 'haUserProperties', root: 'propertiesFindersAreInterestedIn' }]
};

export default rrfConfig;
