import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Scrollbars from "../../../components/utility/customScrollBar";
import { withStyles } from "@material-ui/core/styles";
import keycode from "keycode";
import TopbarSearch from "../../Topbar/topbarSearch";
import { connect } from "react-redux";
import CircularIndeterminate from "../../snipper";
import { makeStyles } from "@material-ui/core/styles";

import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "../../../components/uielements/table";
import { Table } from "./materialUiTables.style";
import Toolbar from "../../../components/uielements/toolbar";
// import Typography from '../../../components/uielements/typography';
import Paper from "../../../components/uielements/paper";
// import Checkbox from '../../../components/uielements/checkbox';
// import IconButton from '../../../components/uielements/iconbutton';
// import Icon from '../../../components/uielements/icon/index.js';
import Tooltip from "../../../components/uielements/tooltip";
import CustomizedDialogs from "./queryViewer";
import Typography from "@material-ui/core/Typography";

const columnData = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  { id: "Mobile", numeric: true, disablePadding: false, label: "Mobile" },
  { id: "Email", numeric: false, disablePadding: false, label: "Email" },
  { id: "Query", numeric: false, disablePadding: false, label: "Query" },
  { id: "Action", numeric: true, disablePadding: false, label: "Action" },
  // { id: "proteinh", numeric: true, disablePadding: false, label: "Option" },
];

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

function SimplePopover(props) {
  const classes = useStyles();
  return (
    <div>
      <Tooltip title={props.props}>
        <Typography {...classes.typography} style={{ pointer: "cursor" , fontSize:'0.875rem'}}>
          {props.props.slice(0, 20) + "..."}
        </Typography>
      </Tooltip>
    </div>
  );
}

class EnhancedTableHead extends Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };
  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } =
      this.props;

    return (
      <TableHead style={{ backgroundColor: "#7d4398" }}>
        <TableRow>
          {columnData.map((column) => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                style={{
                  color: "white",
                  paddingTop: "13px",
                  paddingBottom: "13px",
                }}
              >
                {column.label}
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyles = (theme) => ({
  root: {
    paddingRight: 2,
  },
  highlight: {
    color: theme.palette.grey[50],
    backgroundColor: theme.palette.primary[500],
  },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    fill: theme.palette.text.primary,
  },
  title: {
    flex: "0 0 auto",
  },
});

let EnhancedTableToolbar = (props) => {
  const { numSelected, classes } = props;

  return (
    // <Toolbar className={classes.root}>
    //   <div className={classes.title} style={{ display: "flex", justifyContent: "space-between" }}>
    //     {/* <div > */}
    //       {/* <p>Enquiry list</p> */}
    //       <TopbarSearch />
    //     {/* </div> */}
    //   </div>
    //   <div className={classes.spacer} />
    // </Toolbar>
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
      style={{paddingLeft:'0.9rem'}}
    >
      <div className={classes.title}>
        <h4 style={{ color: "#707070" }}>Enquiry List</h4>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <div style={{ display: "flex" }}>
          <TopbarSearch />
        </div>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

// ------------------------------mapStateToProps---------------------------

const mapStateToProps = (props) => {
  return {
    value: props.searchValue.data,
  };
};

// ------------------------------mapStateToProps---------------------------

class EnhancedTable extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: "asc",
      orderBy: "calories",
      selected: [],
      data: [].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
      page: 0,
      rowsPerPage: 10,
      color: {},
    };
  }

  componentDidMount() {
    fetch("http://35.244.8.93:7000/api/enquiry/select/all").then((result) => {
      result.json().then((res) => {
        if (res.fatal === true) {
          this.setState({ data: res });
        } else {
          this.setState({ data: res.reverse() });
        }
      });
    });
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    const data =
      order === "desc"
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map((n) => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleKeyDown = (event, id) => {
    if (keycode(event) === "space") {
      this.handleClick(event, id);
    }
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = (id) => this.state.selected.indexOf(id) !== -1;

  handleRowColorGrey = () => {
    this.setState({ color: { backgroundColor: "#f5f5f5" } });
  };

  handleRowColorWhite = () => {
    this.setState({ color: { backgroundColor: "#ffffff" } });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, color } =
      this.state;
    const searchValue = this.props.value;
    // const grey = {backgroundColor:'#f5f5f5'}
    // const white = {backgroundColor:'#f5f5f5'}
    // data.map((val)=>{
    //   val.id % 2 === 0 ?this.setState({color:grey}): this.setState({color:white})
    // })

    return (
      <>
        {data.fatal === true ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>Server Error</h1>
          </div>
        ) : data.length === 0 ? (
          <CircularIndeterminate />
        ) : (
          <Paper
            className={classes.root}
            style={{ padding: "inherit", borderRadius: "15px", margin: "0px" }}
          >
            <EnhancedTableToolbar numSelected={selected.length} />
            <Scrollbars style={{ width: "100%" }}>
              <Table className={classes.table}>
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={data.length}
                />
                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter((val) => {
                      if (searchValue === "") {
                        return val;
                      } else if (
                        val.first_name
                          .toString()
                          .toLowerCase()
                          .includes(searchValue.toString().toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((val) => {
                      const isSelected = this.isSelected(val.id);
                      // val.id % 2 === 0
                      //   ? this.handleRowColorWhite()
                      //   : this.handleRowColorGrey();

                      return (
                        <>
                          <TableRow
                            style={color}
                            hover
                            onClick={(event) => this.handleClick(event, val.id)}
                            onKeyDown={(event) =>
                              this.handleKeyDown(event, val.id)
                            }
                            tabIndex={-1}
                            key={val.id}
                            // style={color}
                          >
                            {/* <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell> */}
                            <TableCell
                              style={{
                                paddingTop: "10px",
                                paddingBottom: "10px",
                              }}
                            >
                              {val.first_name} {val.last_name}
                            </TableCell>
                            <TableCell style={{
                                paddingTop: "10px",
                                paddingBottom: "10px",
                              }}>{val.mobile}</TableCell>
                            <TableCell style={{
                                paddingTop: "10px",
                                paddingBottom: "10px",
                              }}>{val.email}</TableCell>
                            <TableCell style={{
                                paddingTop: "10px",
                                paddingBottom: "10px",
                              }}>
                              {val.counselor_comment.length >= 25 ? (
                                <SimplePopover props={val.counselor_comment} />
                              ) : (
                                val.counselor_comment
                              )}
                            </TableCell>
                            {/* <TableCell>{val.reply}</TableCell>
                          <TableCell>{val.option}</TableCell> */}
                            <TableCell style={{
                                paddingTop: "10px",
                                paddingBottom: "10px",
                              }}>
                              <CustomizedDialogs data={val} />
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      count={data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Scrollbars>
          </Paper>
        )}
      </>
    );
  }
}

export default connect(mapStateToProps)(EnhancedTable);
