import React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import PropTypes from "prop-types";

import { CometChatUserList } from "../../Users";
import { CometChatGroupList } from "../../Groups";
import { CometChatConversationList } from "../../Chats";
import { CometChatUserProfile } from "../../UserProfile";

import * as enums from "../../../util/enums.js";

import Translator from "../../../resources/localization/translator";
import { theme } from "../../../resources/theme";

import {
  footerStyle,
  navbarStyle,
  itemStyle,
  itemLinkStyle
} from "./style";

import chatGreyIcon from "./resources/chats-grey.png";
import chatBlueIcon from "./resources/chats-blue.png";
import contactGreyIcon from "./resources/contacts-grey.png";
import contactBlueIcon from "./resources/contacts-blue.png";
import groupGreyIcon from "./resources/groups-grey.png";
import groupBlueIcon from "./resources/groups-blue.png";
import moreGreyIcon from "./resources/userinfo-grey.png";
import moreBlueIcon from "./resources/userinfo-blue.png";

export class CometChatNavBar extends React.Component {

  constructor(props) {

    super(props);

    this.chatListRef = React.createRef();
    this.groupListRef = React.createRef();
  }

  getDefaultComponent = () => {

    switch (this.props.activeTab) {
      case "users":
        return <CometChatUserList
          theme={this.props.theme}
          lang={this.props.lang}
          _parent="unified"
          friendsOnly={this.props.friendsOnly}
          actionGenerated={this.props.actionGenerated}
          onItemClick={(item, type) => this.props.actionGenerated(enums.ACTIONS["ITEM_CLICKED"], type, item)} />;
      case "calls":
        return "calls";
      case "chats":
        return <CometChatConversationList
          ref={el => this.chatListRef = el}
          theme={this.props.theme}
          lang={this.props.lang}
          _parent="unified"
          actionGenerated={this.props.actionGenerated}
          onItemClick={(item, type) => this.props.actionGenerated(enums.ACTIONS["ITEM_CLICKED"], type, item)} />;
      case "groups":
        return <CometChatGroupList
          ref={el => this.groupListRef = el}
          theme={this.props.theme}
          lang={this.props.lang}
          actionGenerated={this.props.actionGenerated}
          _parent="unified"
          onItemClick={(item, type) => this.props.actionGenerated(enums.ACTIONS["ITEM_CLICKED"], type, item)} />;
      case "info":
        return <CometChatUserProfile
          theme={this.props.theme}
          lang={this.props.lang}
          onItemClick={(item, type) => this.props.actionGenerated(enums.ACTIONS["ITEM_CLICKED"], type, item)} />;
      default:
        return null;
    }
  }

  render() {

    const chatsTabActive = (this.props.activeTab === this.props.tabs["CHATS"]) ? true : false;
    const userTabActive = (this.props.activeTab === this.props.tabs["USERS"]) ? true : false;
    const groupsTabActive = (this.props.activeTab === this.props.tabs["GROUPS"]) ? true : false;
    const moreTabActive = (this.props.activeTab === this.props.tabs["INFO"]) ? true : false;

    return (
      <React.Fragment>
        {this.getDefaultComponent()}
        <div css={footerStyle()} className="sidebar__footer">
          <div css={navbarStyle()} className="footer__navbar">
            <div css={itemStyle()} className="navbar__item" onClick={() => this.props.actionGenerated(enums.ACTIONS["CHANGE_TAB"], this.props.tabs["CHATS"])}>
              <div
                css={itemLinkStyle(chatGreyIcon, chatBlueIcon, chatsTabActive, this.props.tabs["CHATS"])}
                className="item__link item__link__chats"
                title={Translator.translate("CHATS", this.props.lang)}></div>
            </div>
            <div css={itemStyle()} className="navbar__item" onClick={() => this.props.actionGenerated(enums.ACTIONS["CHANGE_TAB"], this.props.tabs["USERS"])}>
              <div
                css={itemLinkStyle(contactGreyIcon, contactBlueIcon, userTabActive, this.props.tabs["USERS"])}
                className="item__link item__link__contacts"
                title={Translator.translate("USERS", this.props.lang)}></div>
            </div>
            <div css={itemStyle()} className="navbar__item" onClick={() => this.props.actionGenerated(enums.ACTIONS["CHANGE_TAB"], this.props.tabs["GROUPS"])}>
              <div
                css={itemLinkStyle(groupGreyIcon, groupBlueIcon, groupsTabActive, this.props.tabs["GROUPS"])}
                className="item__link item__link__groups"
                title={Translator.translate("GROUPS", this.props.lang)}></div>
            </div>
            <div css={itemStyle()} className="navbar__item" onClick={() => this.props.actionGenerated(enums.ACTIONS["CHANGE_TAB"], this.props.tabs["INFO"])}>
              <div
                css={itemLinkStyle(moreGreyIcon, moreBlueIcon, moreTabActive, this.props.tabs["INFO"])}
                className="item__link item__link__info"
                title={Translator.translate("MORE", this.props.lang)}></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

// Specifies the default values for props:
CometChatNavBar.defaultProps = {
  lang: Translator.getDefaultLanguage(),
  theme: theme
};

CometChatNavBar.propTypes = {
  lang: PropTypes.string,
  theme: PropTypes.object
}
