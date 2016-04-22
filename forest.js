_ = Npm.require('underscore');

Meteor.startup(() => {
  if (Meteor.settings && Meteor.settings.private && Meteor.settings.private.forest
    && Meteor.settings.private.forest.secretKey) {
    ForestAdmin.apiMapsGetter();
  } else {
    console.error('Forest cannot find your project secret key. ' +
          'Please, ensure you have properly set the secret key in your ' +
          'settings.json file.');
    return;
  }

  _.each(ForestAdmin.collections, (collection) => {
    Router.route('/forest/' + collection.name, { where: 'server' })
      .get(function() {
        var json = ForestAdmin.resourcesGetter(collection.name, this.params.query);
        this.response.end(JSON.stringify(json));
      })
      .post(function() {
        const data = this.request.body.data;

        // TODO: Add onSuccess & onError callbacks to send the right response to Forest
        ForestAdmin.resourceCreator(collection.name, data.attributes);

        this.response.writeHead(204);
        this.response.end();
      });

    Router.route('/forest/' + collection.name + '/:recordId', { where: 'server' })
      .put(function() {
        const data = this.request.body.data;

        // TODO: Add onSuccess & onError callbacks to send the right response to Forest
        ForestAdmin.resourceUpdater(collection.name, data.id, data.attributes);

        this.response.writeHead(204);
        this.response.end();
      })
      .delete(function() {
        // TODO: Add onSuccess & onError callbacks to send the right response to Forest
        ForestAdmin.resourceRemover(collection.name, this.params.recordId);

        this.response.writeHead(204);
        this.response.end();
      });
  });

});
