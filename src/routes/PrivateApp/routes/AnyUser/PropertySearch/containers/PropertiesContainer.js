import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import {
  THINGS_PATH_DETAIL,
  THINGS_PATH_MASTER
} from '../../../constants/index'
import { Link } from 'react-router-dom'
import PropertyAPI from '../../../fakeApi'
import PropertyCard from '../components/PropertyCard'
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  RefinementList,
  Pagination,
  CurrentRefinements,
  ClearAll
} from 'react-instantsearch/dom'
import { connectHighlight } from 'react-instantsearch/connectors'
import { orderBy } from 'lodash'
import ConnectedSearchBox from '../components/ASearchBox'
import PropertiesSearchContainer from './PropertySearchContainer'

function Search() {
  return (
    <div className="container">
      <CurrentRefinements />
      <ClearAll />
      <ConnectedSearchBox />
      <SearchBox />
      <RefinementList
        attributeName="category"
        transformItems={items =>
          orderBy(items, ['label', 'count'], ['asc', 'desc'])}
      />
      <Hits hitComponent={Hit} />
      <Pagination />
    </div>
  )
}

function Product({ hit }) {
  return (
    <div style={{ marginTop: '10px' }}>
      <span className="hit-name">
        <Highlight attributeName="name" hit={hit} />
      </span>
    </div>
  )
}

const CustomHighlight = connectHighlight(
  ({ highlight, attributeName, hit, highlightProperty }) => {
    const parsedHit = highlight({
      attributeName,
      hit,
      highlightProperty: '_highlightResult'
    })
    const highlightedHits = parsedHit.map(part => {
      if (part.isHighlighted) return <mark>{part.value}</mark>
      return part.value
    })
    return <div>{highlightedHits}</div>
  }
)

const Hit = ({ hit }) =>
  <p>
    <CustomHighlight attributeName="description" hit={hit} />
  </p>

class PropertiesContainer extends Component {
  render() {
    return (
      <div>
        <ul>
          {JSON.stringify(PropertyAPI.all(), null, 2)}
        </ul>
        <PropertyCard />
        {/*<InstantSearch*/}
        {/*appId="latency"*/}
        {/*apiKey="6be0576ff61c053d5f9a3225e2a90f76"*/}
        {/*indexName="ikea"*/}
        {/*>*/}
        {/*<Search />*/}
        {/*</InstantSearch>*/}
        <PropertiesSearchContainer />
      </div>
    )
  }
}

export default PropertiesContainer
