import React, { Component, useState } from "react";
import Button from "./Button";
import Explainer from "./Explainer";
import { withResizeDetector } from "react-resize-detector";
// @ts-ignore
import Dock from "react-osx-dock";
import "./Blackboard.css";

interface Item {
    name: string;
    image: string;
    link: string;
}

interface PositionedItem extends Item {
    x: number;
    y: number;
}

interface Props {
    docks: Item[];
    floats: PositionedItem[];
}

interface PropsWithResize extends Props {
    width: number;
    height: number;
}

interface State {
    descriptor: string;
}

class Blackboard extends Component<PropsWithResize, State> {
    constructor(props: PropsWithResize) {
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
                <Dock width={this.props.docks.length * 80} magnification={1} magnifyDirection="down" className="dock" backgroundClassName="dock-background">
                    {this.props.docks.map((item, index) => (
                        <Dock.Item key={index} className="dock-item">
                            <a href={item.link} onMouseEnter={this.updateDescriptor(item.name)} onMouseLeave={this.resetDescriptor}>
                                <img src={item.image} />
                            </a>
                        </Dock.Item>
                    ))}
                </Dock>
                <Explainer text={this.state.descriptor} />
                {this.props.floats.map((item, index) => (
                    <Button key={index} link={item.link} image={item.image} left={item.x} top={item.y} onMouseEnter={this.updateDescriptor(item.name)} onMouseLeave={this.resetDescriptor} />
                ))}
            </div>
        );
    }

    renderMobile() {
        return <div className="blackboard-mobile" />;
    }
}

export default (withResizeDetector(Blackboard) as any) as React.ComponentClass<Props>;
