import React from 'react';
import { Input } from 'reactstrap';
import { connectSearchBox } from 'react-instantsearch/connectors';

const ASearchBox = ({ currentRefinement, refine }) =>
  <Input
    type={'text'}
    value={currentRefinement}
    onChange={e => refine(e.target.value)}
  />;

// `ConnectedSearchBox` renders a `<ASearchBox>` widget that is connected to
// the <InstantSearch> state, providing it with `currentRefinement` and `refine` props for
// reading and manipulating the current query of the search.
// Note that this `ConnectedSearchBox` widget will only work when rendered
// as a child or a descendant of the `<InstantSearch>` component.
const ConnectedSearchBox = connectSearchBox(ASearchBox);

export default ConnectedSearchBox;
