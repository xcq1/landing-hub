import React, { PureComponent } from "react";
import "./Button.css";

interface Props {
    link: string;
    image: string;
    left: number;
    top: number;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

class Button extends PureComponent<Props> {
    render() {
        const style = { left: this.props.left + "vw", top: this.props.top + "vh" };
        return (
            <a href={this.props.link} onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave}>
                <img className="button" src={this.props.image} style={style} />
            </a>
        );
    }
}

export default Button;
