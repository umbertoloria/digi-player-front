import yaml from 'js-yaml'

export function parse_into_yaml(obj: object) {
  try {
    return yaml.dump(obj)
  } catch (e) {
    console.error('Error converting object to YAML:', e)
    return undefined // Or throw the error, depending on your needs.
  }
}

/*// Example usage:
  const myObject = {
    name: 'Example Object',
    version: 1.0,
    features: ['feature1', 'feature2', { subFeature: 'value' }],
    nested: {
      property: 'nestedValue',
      list:[1,2,3]
    },
    isEnabled: true,
    count: 42,
    date: new Date()
  };*/
