import React, { useState } from "react";
import { Dimmer, Icon, Header, Segment } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import MarketPlace from "./marketPlace";

const SuccessPage = () => {
    const [active, setActive] = useState(true);

    setTimeout(() => window.location.replace(process.env.REACT_APP_REDIRECT_ON_PAYMENT_SUCCESS), 3000);

    const handleHide = () => {
        setActive(false);
    }
    return (
        <Dimmer.Dimmable as={Segment} dimmed={active}>
            <MarketPlace />
            <Dimmer active={active} onClickOutside={handleHide} page>
                <Header as='h2' icon inverted>
                    <Icon name='check' circular color="green" basic />
                    <span>{"Payment Successful"}</span>
                </Header>
                <br/>
                <span>You will be redirected to the home page.</span>
            </Dimmer>
        </Dimmer.Dimmable>
    )
}

export default SuccessPage;