import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBreadcrumbOption } from '../Sidebar/options';
import IntlMessages from '../../components/utility/intlMessages';
import appActions from '../../redux/app/actions';
import BreadcrumbWrapper, {
  NavRoutes,
  NavLinks,
  PageInfo,
  FakeBoxWithTab,
  FakeBox,
} from './style';

const bredContainerId = 'bredContainer';
const EmptyBreadcrumb = () => <div id={bredContainerId} />;

class PageBreadcrumb extends Component {
  state = {
    selectedNav: null,
  };
  onHomeCLick = () => {
    const { changeOpenKeys, changeCurrent } = this.props;
    changeOpenKeys({});
    changeCurrent({});
  };
  componentDidMount() {
    this.onBredHeightChange();
  }
  componentDidUpdate() {
    this.onBredHeightChange();
  }
  onBredHeightChange = () => {
    let height = 0;
    try {
      height = document.getElementById(bredContainerId).clientHeight;
    } catch (e) {}
    const { bredHeight, changeBredHeight } = this.props;
    if (height !== bredHeight) {
      changeBredHeight(height);
    }
  };
  render() {
    const { url, showBreadCrumb, customizedTheme, style } = this.props;
    const { parent, activeChildren } = getBreadcrumbOption();
    if (!showBreadCrumb || !parent) {
      return <EmptyBreadcrumb />;
    }
    // const { label, key, icon, hideBreadCrumb } = activeChildren || parent;
    const { label, key, hideBreadCrumb } = activeChildren || parent;
    if (hideBreadCrumb) {
      return <EmptyBreadcrumb />;
    }
    const isNavTab = parent ? parent.isNavTab : null;
    // const LeftIcon = icon ? icon : parent.leftIcon ? parent.leftIcon : '';

    const navLinksOptions = option => (
      <Link
        key={option.key}
        to={`${url}/${option.key}`}
        className={option.key === key ? 'active' : ''}
        onClick={() => this.setState({ selectedNav: option.key })}
      >
        <IntlMessages id={option.label} />
      </Link>
    );
    return (
      <div style={style} id={bredContainerId}>
        {isNavTab ? <FakeBoxWithTab /> : <FakeBox />}
        <BreadcrumbWrapper
          style={{ background: "#f5f5f5" }}
        >

          <PageInfo>
            {/* <Icons>{LeftIcon}</Icons> */}
            <h3 className="pageTitle">
              <IntlMessages id={label} />
            </h3>
          </PageInfo>

          {/* <NavRoutes> */}

          <div style={{display:'flex', fontSize: "0.85rem"}}>
            <Link to={`${url}`} onClick={this.onHomeCLick} style={{textDecoration: 'none',
    color: '#707070'}}>
              {url.replace('/', '')}
            </Link> 
            <span className="currentPageName" style={{color:'#707070'}}>/{key}</span>
          </div>
          {/* </NavRoutes> */}

          {isNavTab ? (
            <NavLinks>{parent.children.map(navLinksOptions)}</NavLinks>
          ) : (
            ''
          )}
        </BreadcrumbWrapper>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ...state.App,
    customizedTheme: state.ThemeSwitcher.breadCrumbTheme,
  };
};
export default connect(mapStateToProps, appActions)(PageBreadcrumb);
