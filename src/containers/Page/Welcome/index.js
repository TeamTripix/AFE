import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dashboard from '../../../assets/images/dashboard.png';
import IntlMessages from '../../../components/utility/intlMessages';
import FourZeroFourStyleWrapper from './404.style';

class FourZeroFour extends Component {
  render() {
    return (
      <FourZeroFourStyleWrapper className="mate404Page">
        <div className="mate404Content">
          <h1>
            <IntlMessages id="A F E" />
          </h1>
          <h4>
            <IntlMessages id="Attendance Fee Enquiry" />
          </h4>
          <p>
            <IntlMessages id="Checkout the side navbar and navigate to these module" />
          </p>

          <Link to="/dashboard/fee-management">
            <button type="button">
              <IntlMessages id="Fee Management" />
            </button>
          </Link>
        </div>

        <div className="mate404Artwork">
          <img alt="#" src={dashboard} />
        </div>
      </FourZeroFourStyleWrapper>
    );
  }
}

export default FourZeroFour;
