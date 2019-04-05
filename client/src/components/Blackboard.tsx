import React, { Component, useState } from "react";
import Button from "./Button";
import Explainer from "./Explainer";
import { withResizeDetector } from "react-resize-detector";
// @ts-ignore
import Dock from "react-osx-dock";
import "./Blackboard.css";

interface Props {
    width: number;
    height: number;
}

interface State {
    descriptor: string;
}

class Blackboard extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { descriptor: "" };
    }

    render() {
        if (this.props.width > this.props.height) {
            return this.renderDesktop();
        } else {
            return this.renderMobile();
        }
    }

    updateDescriptor = (descriptor: string) => () => {
        this.setState({ descriptor });
    };

    resetDescriptor = () => {
        // this prevents flickering
        const preCondition = this.state.descriptor;
        setTimeout(() => {
            if (this.state.descriptor === preCondition) this.setState({ descriptor: "" });
        }, 200);
    };

    renderDesktop() {
        return (
            <div className="blackboard">
                <Dock width={400} magnification={1} magnifyDirection="down" className="dock" backgroundClassName="dock-background">
                    {["a", "b", "c", "d", "e"].map((item, index) => (
                        <Dock.Item key={index} className="dock-item">
                            <a href="https://example.com" onMouseEnter={this.updateDescriptor(item)} onMouseLeave={this.resetDescriptor}>
                                <img src={`${item}.png`} />
                            </a>
                        </Dock.Item>
                    ))}
                </Dock>
                <Explainer text={this.state.descriptor} />
                <Button id="service" link="https://example.com" image="service.png" left={32} top={74} onMouseEnter={this.updateDescriptor("Service")} onMouseLeave={this.resetDescriptor} />
            </div>
        );
    }

    renderMobile() {
        return <div className="blackboard-mobile" />;
    }
}

export default (withResizeDetector(Blackboard) as any) as React.ComponentClass;
