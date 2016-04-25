ForestAdmin.resourceRemover = (collection, recordId, callback) => {
  Meteor[collection].remove(recordId, callback);
}
