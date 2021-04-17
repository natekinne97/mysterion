import client from '../Services/ContentfulConfig'
import { get } from 'lodash'


const mapMetaData = (response, pageId) => {
  const items = get(response, 'items')
  console.log(pageId, 'pageId')
  let foundData
  items.forEach(item => {
    const field = get(item, 'fields')
    console.log(field, 'field')
    if (field.pageId === pageId) {
      foundData = field

    }
  })
  return foundData
}


export const getMetaData = async (pageId) => {
  let response = await client.getEntries({
    content_type: 'metadata',
    resolveLinks: true,
  });
  console.log(response, 'response')

  return mapMetaData(response, pageId)
}
