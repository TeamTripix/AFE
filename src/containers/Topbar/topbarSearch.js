import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import searchValue from "../../redux/search/action";
import { connect } from "react-redux";

const mapDispatchToProps = props => ({
 searchValueHandler: data => data.dispatch.dispatch(searchValue(data.data))
// data:console.log(data)
});

class TopbarSearch extends React.Component {
  useStyles = makeStyles((theme) => ({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: 120,
        "&:focus": {
          width: 200,
        },
      },
    },
  }));

  //  function TopbarSearch(props) {
  //   const classes = useStyles();
  //   const [value, setValue] = useState("")
  //   // const dispatch = useDispatch()

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
    });

    const data = {
      data : this.state.initialSearch,
      dispatch : this.props 
    }

    this.props.searchValueHandler(data);
    // console.log(this.props.searchValueHandler) 
  }

  render() {
    // const classes = this.useStyle;
    return (
      <div>
        <div>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          onChange={this.getValue}
          inputProps={{ "aria-label": "search" }}
          value={this.state.initialSearch}
        />
      </div>
    );
  }
}

export default connect(mapDispatchToProps)(TopbarSearch);
