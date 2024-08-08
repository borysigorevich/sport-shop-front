import { Attributes } from "@modules/categories/components/attributes/index"
import React from 'react';

type AttributesWrapperProps = {
  attributesSearchParams: string[];
}

export const AttributesWrapper = async ({attributesSearchParams}: AttributesWrapperProps ) => {
  const response = await fetch(process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL + '/store/attributes')
  const attributes = (await response.json()).attributes

 return (
  <Attributes
    attributes={attributes}
    attributesSearchParams={attributesSearchParams}
  />
 );
};