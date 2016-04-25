JSONAPISerializer = Npm.require('jsonapi-serializer').Serializer;
request = Npm.require('superagent');

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

    _.each(value._schema, (fieldInfo, fieldName) => {
      let type;

      function detectType(fieldInfo) {
        let match = fieldInfo.type.toString().match(/function\s*(\w*)\(/);
        if (match) {
          return match[1] === 'Array' ? [] : match[1];
        }
        return null;
      }

      if (typeof fieldInfo.type === 'function') {
        type = detectType(fieldInfo);
      } else {
        type = fieldInfo.type === 'Array' ? [] : fieldInfo.type;
      }

      // NOTICE: Detect Array values type
      if (typeof type === 'object') {
        if (value._schema[fieldName + '.$']) {
          type.push(detectType(value._schema[fieldName + '.$']));
        }
      }

      if (fieldName.indexOf('$') === -1) {
        schema.fields.push({ field: fieldName, type: type })
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
