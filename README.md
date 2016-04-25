# Forest Meteor Liana

The unofficial MeteorJS liana for <a href="http://www.forestadmin.com" target="_blank">Forest</a>

## Requirements

This package works in a specific configuration. Your Meteor project must:

- Use Meteor 1.3+
- Use the `aldeed:simple-schema` Meteor package (https://github.com/aldeed/meteor-simple-schema)
- Define a schema for each collection you want to see in ForestAdmin
- Store your collections schemas in the global variable `Meteor.Schemas` as described below:
```javascript
Meteor.Schemas = {};
Meteor.Schemas.Rentals = new SimpleSchema({
  city: {
    type: 'String'
  },
  // ...
});
```

## Installation

1. Run `meteor add arnaudbesnier:forest` in your Meteor project.
2. Add the following configuration in your settings.json file:
```json
{
  "public": {},
  "private": {
    "forest": {
      "secretKey": "<FORESTADMIN_SECRET_KEY>"
    }
  }
}
```

## Limitations

The package provide only a fraction of the features provide by Forest Admin but your can:

- Create documents,
- Read documents (with sort and pagination),
- Update documents,
- Delete documents

The search feature is also implemented, you can:

- Search for any record containing the a string
- Use specific record filters (is, is not, greater than, less than, is present, is blank, ...)

## TODO

- Set the documents ids in a "read-only" mode,
- Implement activity logging,
- Implement stats to populate the dashboard,
- Implement custom actions,
- Implement the authentication system,
- Implement third-party integrations (Intercom, Stripe,... ),
- Add specs in the future.
- ...
