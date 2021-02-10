import React, { useState } from "react";
import { Dimmer, Icon, Header, Segment } from "semantic-ui-react";
import {Redirect} from "react-router-dom";
import MarketPlace from "./marketPlace";

const FailurePage = () => {
    const [active, setActive] = useState(true);
    const handleHide = () => {
        setActive(false);
    }
    return (
        <Dimmer.Dimmable as={Segment} dimmed={active}>
            <MarketPlace />
            {!active && <Redirect to="/"/>}
            <Dimmer active={active} onClickOutside={handleHide} page>
                <Header as='h2' icon inverted>
                    <Icon name='close' circular color="red" />
                    <span>{"Payment Failed."}</span>
                </Header>
                <br/>
                <span>Please try again.</span>
            </Dimmer>
        </Dimmer.Dimmable>
    )
}

export default FailurePage;