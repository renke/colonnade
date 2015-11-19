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

    let containerElement = this.props.container || <div/>

    let columnContainers = columnization.map((column, i) => {
        return React.cloneElement(containerElement, {key: i}, column);
      }
    );

    return (
      <div id={this.props.id} className={this.props.className} style={this.props.style}>
        {columnContainers}
      </div>
    );
  }
}

export default Columns;
