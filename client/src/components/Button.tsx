import React, { Component } from "react";
import "./Button.css";

interface Props {
    id: string;
    link: string;
    image: string;
    left: number;
    top: number;
}

class Button extends React.PureComponent<Props> {
    render() {
        const style = { left: this.props.left + "vw", top: this.props.top + "vh" };
        return (
            <a href={this.props.link}>
                <img className="button" id={this.props.id} src={this.props.image} style={style} />
            </a>
        );
    }
}

export default Button;
