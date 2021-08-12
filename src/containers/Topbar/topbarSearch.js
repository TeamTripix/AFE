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
      console.log(data)
      this.props.searchValueHandler(data);

    });


  }

  render() {

    const search = {
        position: 'relative',
        borderRadius: '2px',
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
    }
    return (
      <div style={search}>
        <div style={searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          onChange={this.getValue}
          inputProps={{ "aria-label": "search" }}
          value={this.state.initialSearch}
          style={{paddingLeft: '2rem'}}
        />
      </div>
    );
  }
}

export default connect(mapDispatchToProps)(TopbarSearch);
