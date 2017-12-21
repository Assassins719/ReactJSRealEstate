import React from 'react';
import NavBarItem from '../components/NavBarItem';
import PageTitle from "../components/PageTitle";

export default class DesktopNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftItems: [],
      rightItems: []
    };
  }

  componentDidMount() {
    this.bucketFill(this.props.navItems);
  }

  componentWillReceiveProps(nextProps) {
    const { navItems } = nextProps;
    this.bucketFill(navItems);
  }

  /**
   * Bucket fill the left and right sides one at a time, cover edge cases
   * Optimal logic probably isn't to use modulo since this will flip flop the order of the
   * items.
   *
   * DO NOT TRY and SETSTATE to concat which item, React's rendering system doesn't like that, hence this solution.
   */
  bucketFill = navItems => {
    let leftItems = [];
    let rightItems= [];
    navItems.map((item, index) => {
      // Limit leftItems to 3 items
      if (this.state.leftItems.length > 3) {
        return rightItems.push(item);
      }
      if (!(index % 2)) {
        return leftItems.push(item);
      }
      return rightItems.push(item);
    });
    this.setState({
      leftItems: leftItems,
      rightItems: rightItems
    })
  };

  render() {
    const renderItem = (item, i) => <NavBarItem key={i} name={item.name} url={item.url} />;

    // Limit to 3 items, above 4 the 3rd because "MORE"
    const firstThreeRHS = () =>
      this.state.rightItems.slice(0, 3).map( (item, i) => renderItem(item, i));

    const renderTwoItemsAndMoreBtn = () => {
      return [
        <NavBarItem
          key={this.state.rightItems[0].url}
          name={this.state.rightItems[0].name}
          url={this.state.rightItems[0].url}
        />,
        <NavBarItem
          key={this.state.rightItems[1].url}
          name={this.state.rightItems[1].name}
          url={this.state.rightItems[1].url}
        />,
        <NavBarItem
          key={'more'}
          name={'More'}
          moreModalClicked={this.props.moreModalClicked}
        >
          More
        </NavBarItem>
      ];
    };

    const leftNavItems = () => {
      return this.state.leftItems.map( (item, i) => renderItem(item, i));
    };

    const rightNavItems = () =>
      this.state.rightItems.length < 3
        ? firstThreeRHS()
        : renderTwoItemsAndMoreBtn();

    return (
      <div>
        <nav>
          <div
            style={{
              display: 'flex',
              backgroundColor: '#fff',
              justifyContent: 'space-between',
              borderBottom: '1px solid #e2e2e2'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {leftNavItems()}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <PageTitle />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderLeft: '1px solid #e2e2e2'
              }}
            >
              {rightNavItems()}
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
