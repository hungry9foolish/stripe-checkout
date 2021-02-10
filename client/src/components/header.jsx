import React from "react";
import { Menu, Image, Segment } from "semantic-ui-react";
import { default as CartLauncher } from "./cart/cartLauncher";
import logo from "../resources/CompanyLogo.jpg";
 
const PageHeader = () => (
  <Segment>
    <Menu fixed='top' inverted>
      <Menu.Item position="left"></Menu.Item>
      <Image size='tiny' src={logo} style={{ align: "center" }} />
      <Menu.Item position="right">
        <CartLauncher/>
      </Menu.Item>
    </Menu>
  </Segment>
);

export default PageHeader;