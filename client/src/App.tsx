import React, { Component } from "react";
import logo from "./logo.svg";
import Button from "./components/Button";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Button id="example" link="https://example.com" image="https://your-image-here" left={32} top={74} />
            </div>
        );
    }
}

export default App;
