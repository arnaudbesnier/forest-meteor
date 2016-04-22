JSONAPISerializer = Npm.require('jsonapi-serializer').Serializer;
request = Npm.require('superagent');
_ = Npm.require('underscore');

function sendAPIMaps(apiMaps) {
  const forestUrl = 'https://forestadmin-server.herokuapp.com';
  const secretKey = Meteor.settings.private.forest.secretKey;

  request
    .post(forestUrl + '/forest/apimaps')
    .send(apiMaps)
    .set('forest-secret-key', secretKey)
    .end(function(error, result) {
      if (result.status !== 204) {
        console.error('Forest cannot find your project secret key. ' +
          'Please, ensure you have installed the Forest Liana ' +
          'correctly.');
      }
    });
}

let dataCollections = []
ForestAdmin = { collections: {} };

ForestAdmin.apiMapsGetter = () => {
  _.each(Meteor.Schemas, (value, key) => {
    const collectionName = key.toLowerCase();
    let schema = { name: collectionName, fields: [{ field: 'id', type: 'String' }] }

    _.each(value._schema, (value, key) => {
      let type;

      if (typeof value.type === 'function') {
        let match = value.type.toString().match(/function\s*(\w*)\(/);
        if (match) {
          type = match[1];
        }
      } else {
        type = value.type;
      }

      // TODO: Handle Array types
      if (key.indexOf('$') === -1) {
        schema.fields.push({ field: key, type: type })
      }
    });

    dataCollections.push(schema);
    ForestAdmin.collections[collectionName] = schema;
  })

  var apiMaps = new JSONAPISerializer('collections', dataCollections, {
      id: 'name',
      attributes: ['name', 'fields', 'actions', 'onlyForRelationships',
        'isVirtual', 'isReadOnly'],
      fields: {
        attributes: ['field', 'type', 'collection_name', 'reference',
          'column', 'isSearchable', 'widget', 'integration']
      },
      actions: {
        ref: 'name',
        attributes: ['name', 'endpoint', 'httpMethod']
      },
      meta: {
        'liana': 'forest-meteor',
        'liana_version': '0.0.1'
      }
  });

  sendAPIMaps(apiMaps);
};
