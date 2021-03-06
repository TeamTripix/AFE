import styled from 'styled-components';
import { palette } from 'styled-theme';
import AppBar from '../../components/uielements/appbar';
import Toolbars from '../../components/uielements/toolbar';
import IconButton from '../../components/uielements/iconbutton';
import { borderRadius, boxShadow } from '../../settings/style-util';

const Toolbar = styled(Toolbars)`
  @media only screen and (max-width: 768px) {
    padding: 0 17px !important;
  }
`;

const AppHolder = styled(AppBar)`
  position: fixed;
  z-index: 1300;
  width: 100%;
  height: 65px;
  transition: all 0.2s ease-in-out;
`;

const IconButtons = styled(IconButton)`
  width: auto;
  height: auto;
  color: #939393;
`;

const TopbarComponents = styled.div`
  width: 100%;
  display: flex;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    margin-left: auto;

    li {
      margin-left: ${props => (props['data-rtl'] === 'rtl' ? '25px' : '0')};
      margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : '25px')};
      cursor: pointer;
      line-height: normal;
      position: relative;
      display: inline-block;

      @media only screen and (max-width: 360px) {
        margin-left: ${props => (props['data-rtl'] === 'rtl' ? '20px' : '0')};
        margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : '20px')};
      }

      &.topbarUser {
        height: auto;
        ${'' /* height: 35px; */};
      }

      &:last-child {
        margin: 0;
      }

      i {
        font-size: 24px;
        color: ${palette('text', 0)};
        line-height: 1;
      }

      ${IconButtons} {
        .iconWrapper {
          font-size: 12px;
          color: #fff;
          width: 20px;
          height: 20px;
          display: -webkit-inline-flex;
          display: -ms-inline-flex;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          line-height: 20px;
          position: absolute;
          top: -8px;
          left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '10px')};
          right: ${props => (props['data-rtl'] === 'rtl' ? '10px' : 'inherit')};
          ${borderRadius('50%')};
        }
      }

      &.topbarMail {
        color: #000000;

        ${IconButtons} {
          .iconWrapper {
            span {
              background-color: ${palette('topbarNotification', 3)};
            }
          }
        }
      }

      &.topbarNotification {
        .iconWrapper {
          span {
            background-color: ${palette('topbarNotification', 2)};
          }
        }
      }

      &.topbarMessage {
        .iconWrapper {
          span {
            background-color: ${palette('topbarNotification', 1)};
          }
        }
      }

      &.topbarAddtoCart {
        .iconWrapper {
          span {
            background-color: ${palette('topbarNotification', 0)};
          }
        }
      }

      &.topbarUser {
        .imgWrapper {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background-color: ${palette('grayscale', 9)};
          ${borderRadius('50%')};

          img {
            height: 100%;
            object-fit: cover;
          }

          .userActivity {
            width: 10px;
            height: 10px;
            display: block;
            background-color: ${palette('color', 3)};
            position: absolute;
            bottom: 0;
            right: 3px;
            border: 1px solid #ffffff;
            ${borderRadius('50%')};
          }
        }
      }
    }
  }
`;

export { AppHolder, IconButtons, TopbarComponents, Toolbar };
