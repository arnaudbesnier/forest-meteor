ForestAdmin.resourceRemover = (collection, recordId) => {
  Meteor[collection].remove(recordId);
}
