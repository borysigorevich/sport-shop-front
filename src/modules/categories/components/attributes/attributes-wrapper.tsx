import { Attributes } from "@modules/categories/components/attributes/index"
import React from 'react';

export const AttributesWrapper = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL + '/store/attributes')
  const attributes = (await response.json()).attributes

 return (
  <Attributes
    attributes={attributes}
  />
 );
};