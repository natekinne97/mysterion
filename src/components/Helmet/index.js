import { get } from 'lodash';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { getMetaData } from './helmetService'

const mapKeyWords = (data) => {
  if (!data) return
  const keyWords = get(data, 'keyWords')
  console.log(keyWords.join(","), 'keywords')
  return keyWords.join(',')
}

const mapDescription = (data) => {
  if (!data) return
  return get(data, 'namedescription[0].fields.description')
}

const MetaData = ({ pageId }) => {
  const [ data, setData ] = useState(null)
  console.log(pageId, 'pageid in metadata')
  useEffect(() => {
    async function getData () {
      const response = await getMetaData(pageId)
      setData(response)
    }
    getData()
  }, [ getMetaData ])

  console.log(data, 'data')
  return (<Helmet
    htmlAttributes={{ lang: 'en' }}
    title={get(data, 'title')}
    meta={[
      {
        name: 'keywords',
        content: mapKeyWords(data)
      },
      {
        name: 'description',
        content: mapDescription(data)
      }
    ]}
  />)
}

export default MetaData
