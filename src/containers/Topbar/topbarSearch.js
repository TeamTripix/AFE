import React from "react";
import { alpha } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import searchValue from "../../redux/search/action";
import { connect } from "react-redux";

const mapDispatchToProps = () => ({
 searchValueHandler: data =>  data.dispatch.dispatch(searchValue(data.data)),
});

class TopbarSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initialSearch: "",
    };
    this.getValue = this.getValue.bind(this);
  }

  getValue(e) {
    this.setState({
      initialSearch: e.target.value,
    },()=>{

      const data = {
        data : this.state.initialSearch,
        dispatch : this.props 
      }
      this.props.searchValueHandler(data);

    });


  }

  render() {

    const search = {
        position: 'relative',
        border: '1px solid #DFDFDF',
        backgroundColor: alpha('#nnn', 0.15),
        '&:hover': {
          backgroundColor: alpha('#nnf', 0.25),
        },
        marginLeft: 0,
        width: '100%',
    }

    const searchIcon = {
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '5px'
    }

    const mediaQueryForSearchBar = {
      width: '20vw',
      marginLeft:'2rem',
      "&:@media (max-width: 800px)": {
        displays: "block",
        marginBottom:'1rem'
      }
    }
    return (
      <div style={search}>
        <div style={searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search by name"
          onChange={this.getValue}
          inputProps={{ "aria-label": "search" }}
          value={this.state.initialSearch}
          style={mediaQueryForSearchBar}
        />
      </div>
    );
  }
}

export default connect(mapDispatchToProps)(TopbarSearch);
