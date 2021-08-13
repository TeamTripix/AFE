import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '../../components/uielements/icon';
import appActions from '../../redux/app/actions';
import themeActions from '../../redux/themeSwitcher/actions';
import { AppHolder, Toolbar, IconButtons } from './style';
const { toggleCollapsed } = appActions;
const { switchActivation } = themeActions;

class Topbar extends Component {
  render() {
    const {
      toggleCollapsed,
      customizedTheme,
    } = this.props;
    return (
      <AppHolder style={{ background: customizedTheme.backgroundColor }}>
        <Toolbar
          style={{
            paddingLeft: '30px',
            minHeight: '64px',
            background: customizedTheme.topbarTheme,
          }}
        >
          <IconButtons
            id="topbarCollapsed"
            aria-label="open drawer"
            onClick={toggleCollapsed}
            className="right"
          >
            <Icon>menu</Icon>
          </IconButtons>
        </Toolbar>
      </AppHolder>
    );
  }
}

export default connect(
  state => ({
    ...state.App,
    // locale: state.LanguageSwitcher.language.locale,
    customizedTheme: state.ThemeSwitcher.topbarTheme,
  }),
  { toggleCollapsed, switchActivation }
)(Topbar);