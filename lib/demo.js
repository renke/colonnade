require("babel/polyfill");

require("file-loader?name=index.html!./demo.html");
require("file-loader?name=index.css!./demo.css");

import React from "react/addons";
import List from "perpetually";

import times from "lodash.times";
import uuid from "node-uuid";

import Chance from "chance";
const chance = new Chance();

import Columns from "./columns";

let items = [];

let generateItem = (i) => {
  let pictureHeight = chance.integer({min: 100, max: 500});

  return {
    id: uuid.v4(),
    text: `${i}: ${chance.paragraph({sentences: chance.integer({min: 1, max: 10})})}`,
    picture: `http://lorempixel.com/g/${1000}/${pictureHeight}/`,
    pictureHeight,
  };
};

times(50, i => {
  items.push(generateItem(i))
});

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // return <div style={{margin: 0, padding: 0, overflow: "hidden"}}>
    //     <p className="entry">{this.props.item.text}</p>
    // </div>;
    // return <div style={{margin: 0, padding: 0, overflow: "hidden"}}>
    //     <img src={this.props.item.picture} height={this.props.item.pictureHeight} alt=""/>
    // </div>;
    // return <div style={{margin: 0, padding: 0, overflow: "hidden"}}>
    //     <img src={this.props.item.picture} alt=""/>
    // </div>;
    //
    return <iframe id="ytplayer" type="text/html" width="640" height={this.props.item.pictureHeight}
      src="http://www.youtube.com/embed/M7lc1UVf-VE?&autoplay=0&origin=http://example.com"
      frameborder="0"/>
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: items
    }
  }

  resetAll() {
    this.setState({
      items: items,
    });
  }

  addTop() {
    let newItems = this.state.items.slice();
    newItems.unshift(generateItem(items.length - this.state.items.length - 1));
    this.setState({items: newItems});
  }

  addBottom() {
    let newItems = this.state.items.slice();
    newItems.push(generateItem(this.state.items.length + 1));
    this.setState({items: newItems});
  }

  addSecond() {
    let newItems = [...this.state.items];
    console.log(newItems);
    newItems.splice(1, 0, generateItem(this.state.items.length + 1));
    this.setState({items: newItems});
  }

  removeTop() {
    let newItems = this.state.items.slice();
    newItems.splice(0, 1);
    this.setState({items: newItems});
  }

  removeBottom() {
    let newItems = this.state.items.slice();
    newItems.splice(this.state.items.length - 1, 1);
    this.setState({items: newItems});
  }

  removeSecond() {
    let newItems = this.state.items.slice();
    newItems.splice(1, 1);
    this.setState({items: newItems});
  }

  removeAll() {
    this.setState({
      items: [],
    });
  }

  render() {
    let entries = this.state.items.map(item => <Entry key={item.id} item={item}/>);

    return <div style={{paddingTop: "0rem"}}>
      <div style={{position: "fixed", right: "1rem", top: "1rem"}}>

        <button onClick={this.resetAll.bind(this)}>Reset all</button>
        <button onClick={this.addTop.bind(this)}>Add top</button>
        <button onClick={this.addBottom.bind(this)}>Add bottom</button>
        <button onClick={this.addSecond.bind(this)}>Add 2nd</button>

        <button onClick={this.removeAll.bind(this)}>Remove all</button>
        <button onClick={this.removeTop.bind(this)}>Remove top</button>
        <button onClick={this.removeBottom.bind(this)}>Remove bottom</button>
        <button onClick={this.removeSecond.bind(this)}>Remove 2nd</button>
      </div>

      <Columns className="columns"
               number={3}
               container=<List className="column"/>>
        {entries}
      </Columns>

    </div>
  }
}

React.render(<App/>, document.body);
