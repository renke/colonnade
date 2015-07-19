import React from "react/addons";
import times from "lodash.times";

const BATCH_SIZE = 2;

class Columns extends React.Component {
  constructor(props) {
    super(props);
  }

  convertChildren(children) {
    if (children.length === 0) {
      return []
    }

    if (children.length) {
      return children;
    } else {
      return [children];
    }
  }

  componentWillMount() {

  }

  componentWillReceiveProps(newProps) {

  }

  componentDidMount() {

  }

  componentDidUnmount() {

  }

  componentDidUpdate() {

  }

  columnize(number, items) {
    let columns = [];

    times(number, n => {
      columns[n] = [];
    });

    for (var i = 0; i < items.length; i++) {
      let item = items[i];
      columns[i % number].push(item);
    }

    return columns;
  }

  render() {
    let items = this.convertChildren(this.props.children);

    let autoNumber = Math.min(items.length, this.props.number);
    let columnization = this.columnize(autoNumber, items);

    let containerElement = this.props.container || <div className="column"/>

    let columnContainers = columnization.map(column => {
      let columnContainer = React.cloneElement(containerElement, {className: "column"}, column);
      return columnContainer;
    });

    return (
      <div className="columns">
        {columnContainers}
      </div>
    );
  }
}

export default Columns;
