import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Scrollbars from "../../components/utility/customScrollBar";
import { withStyles } from "@material-ui/core/styles";
import keycode from "keycode";
import TopbarSearch from "../../containers/Topbar/topbarSearch";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularIndeterminate from "../../containers/snipper";
import ReplayIcon from "@material-ui/icons/Replay";

import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "../../components/uielements/table/index";
import { Table } from "./materialUiTables.style";
import Toolbar from "../../components/uielements/toolbar";
import Paper from "../../components/uielements/paper";
import IconButton from "../../components/uielements/iconbutton";
import Icon from "../../components/uielements/icon/index.js";
import Tooltip from "../../components/uielements/tooltip";
import FormDialog from "./feeCreation";
import FormDialogs from "./feeUpdation";
import { connect } from "react-redux";

const columnData = [
  { id: "calories", numeric: true, disablePadding: false, label: "Fees Type" },
  { id: "fat", numeric: false, disablePadding: false, label: "Paid Fees" },
  { id: "carbs", numeric: false, disablePadding: false, label: "Fees Status" },
  { id: "protein", numeric: true, disablePadding: false, label: "Comment" },
  { id: "protein1", numeric: true, disablePadding: false, label: "Total Fess" },
  {
    id: "protein2",
    numeric: true,
    disablePadding: false,
    label: "Installment Type",
  },
  {
    id: "protein3",
    numeric: true,
    disablePadding: false,
    label: "Next Schedule Date",
  },
  { id: "protein4", numeric: true, disablePadding: false, label: "Created On" },
  { id: "protein5", numeric: true, disablePadding: false, label: "Updated On" },
];

class EnhancedTableHead extends Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };
  render() {
    const {
      // onSelectAllClick,
      order,
      orderBy,
      // numSelected,
      // rowCount,
    } = this.props;

    return (
      <TableHead style={{backgroundColor:'#7d4398'}}>
        <TableRow>
          <TableCell padding="checkbox">
          </TableCell>
          {columnData.map((column) => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                style={{color:'white'}}
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
    <>
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
      <h4 style={{color:'#707070'}}>Fees</h4>

        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
            <div style={{ display: "flex" }}>
              <div style={{marginRight:'20px'}}>


          <TopbarSearch  />
              </div>
              <FormDialog />
            </div>
        </div>
      </Toolbar>
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

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
        <Typography {...classes.typography} style={{ pointer: "cursor" }}>
          {props.props.slice(0, 20) + "..."}
        </Typography>
      </Tooltip>
    </div>
  );
}

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
    };
  }

  refresh () {
    fetch("http://35.244.8.93:7000/api/fee/select/all").then((result) => {
      result.json().then((res) => {
        if (res.fatal === true) {
          this.setState({ data: res });
        } else {
          this.setState({ data: res.reverse() });
        }
      });
    });
  }

  componentDidMount() {
    this.refresh()
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

  render() {
    // const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;

    const searchValue = this.props.value;

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
          <Paper style={{ padding: "inherit", borderRadius: "15px", margin: "0px"  }}>
            <EnhancedTableToolbar
            //  numSelected={selected.length}
            />
            <Scrollbars style={{ width: "100%" }}>
              <Table style={{ minWidth: "700" }}>
                <EnhancedTableHead
                  // numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  // onSelectAllClick={this.handleSelectAllClick}
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
                        val.student_id
                          .toString()
                          .toLowerCase()
                          .includes(searchValue.toString().toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((val) => {
                      const isSelected = this.isSelected(val.id);
                      return (
                        <TableRow
                          hover
                          onClick={(event) => this.handleClick(event, val.id)}
                          onKeyDown={(event) =>
                            this.handleKeyDown(event, val.id)
                          }
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={val.id}
                          // selected={isSelected}
                        >
                          <TableCell padding="checkbox">
                            <FormDialogs data={val} />
                          </TableCell>
                          <TableCell>{val.fees_type}</TableCell>
                          <TableCell>{val.paid_fees}</TableCell>
                          <TableCell>{val.fees_status}</TableCell>
                          <TableCell>
                            {unescape(val.comment).length >= 20 ? (
                              <SimplePopover props={unescape(val.comment)} />
                            ) : (
                              unescape(val.comment)
                            )}
                          </TableCell>
                          <TableCell>{val.total_fees}</TableCell>
                          <TableCell>{val.installment_type}</TableCell>
                          <TableCell>{val.next_schedule_date.slice(8,10)}-{val.next_schedule_date.slice(5,7)}-{val.next_schedule_date.slice(0,4)}</TableCell>
                          <TableCell>{val.created_on.slice(8,10)}-{val.created_on.slice(5,7)}-{val.created_on.slice(0,4)}</TableCell>
                          <TableCell>{val.updated_on.slice(8,10)}-{val.updated_on.slice(5,7)}-{val.updated_on.slice(0,4)}</TableCell>
                        </TableRow>
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
                  {/* <div onClick={console.log("refresh")}>

                    <ReplayIcon />
                  </div> */}
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
