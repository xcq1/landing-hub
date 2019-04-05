import React, { Component } from "react";
import "./Explainer.css";

interface Props {
    text?: string;
}

class Explainer extends React.PureComponent<Props> {
    render() {
        return this.props.text ? <div className="explainer">{this.props.text}</div> : null;
    }
}

export default Explainer;
