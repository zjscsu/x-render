import { nanoid } from 'nanoid';

export const defaultGetId = name => {
  return `${name}_${nanoid(6)}`;
};

export const standard2sortable = schema => {
  if (schema.type === 'object') {
    return {
      ...schema,
      properties: Object.keys(schema.properties).map(key => {
        return {
          $id: key,
          ...sortable2standard(schema.properties[key]),
        }
      })
    }
  }
  if (schema.type === 'array' && schema.items.type === 'object') {
    return {
      ...schema,
      items: sortable2standard(schema.items),
    }
  }
  return schema;
}

export const sortable2standard = schema => {
  if (schema.$id) {
    delete schema.$id;
    delete schema.chosen;
    delete schema.selected;
  }
  if (schema.type === 'object') {
    return {
      ...schema,
      properties: schema.properties.reduce((result, current) => {
        return {
          ...result,
          [current.$id]: sortable2standard(current),
        }
      }, {})
    }
  }
  if (schema.type === 'array' && schema.items.type === 'object') {
    return {
      ...schema,
      items: standard2sortable(schema.items),
    }
  }
  return schema;
}
