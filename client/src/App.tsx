import React, { Component } from "react";
import Blackboard from "./components/Blackboard";

class App extends Component {
    render() {
        const docks = [{ name: "a", link: "a", image: "a" }];
        const floats = [{ name: "a", link: "a", image: "a", x: 0, y: 0 }];
        return <Blackboard docks={docks} floats={floats} forceMobile={!!window.location.hash} />;
    }
}

export default App;
