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
    forceMobile?: boolean;
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
        if (this.props.forceMobile || 3 * this.props.width < 4 * this.props.height) {
            return this.renderMobile();
        } else {
            return this.renderDesktop();
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
        return (
            <div className="blackboard-mobile">
                <header />
                <h3>Important Stuff</h3>
                <div className="list">
                    {this.props.docks.map((item, index) => (
                        <a href={item.link}>
                            <div className="float link" key={index}>
                                {item.name}
                            </div>
                        </a>
                    ))}
                </div>
                <div className="grid">
                    {this.props.floats.map((item, index) => (
                        <div className="grid-item" key={index}>
                            <h3>{item.name}</h3>
                            <img src={item.image} />
                            <div className="link-center">
                                <a href={item.link}>
                                    <div className="link">{item.link.replace("https://", "").replace(/\/$/, "")}</div>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default (withResizeDetector(Blackboard) as any) as React.ComponentClass<Props>;
