import React from "react";
import { createStructuredSelector } from "reselect";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import Collection from "../collection/collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";
import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionWithSpinner = WithSpinner(Collection);

class Shop extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCollectionsStartAsync());
  }

  render() {
    const { match, isCollectionFetching } = this.props;
    return (
      <React.Fragment>
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionOverviewWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching
});

export default connect(mapStateToProps)(Shop);
