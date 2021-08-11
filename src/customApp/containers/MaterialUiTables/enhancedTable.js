import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Scrollbars from "../../../components/utility/customScrollBar";
import { withStyles } from "@material-ui/core/styles";
import keycode from "keycode";
import TopbarSearch from "../../../containers/Topbar/topbarSearch";
import CustomCalendar from "./calenderDialog";
import CircularIndeterminate from '../../../containers/snipper'

import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  // TableSortLabel,
} from "../../../components/uielements/table";
import { Table } from "./materialUiTables.style";
import Toolbar from "../../../components/uielements/toolbar";
// import Typography from '../../../components/uielements/typography';
import Paper from "../../../components/uielements/paper";
// import Checkbox from '../../../components/uielements/checkbox';
// import IconButton from '../../../components/uielements/iconbutton';
// import Icon from '../../../components/uielements/icon/index.js';
// import Tooltip from "../../../components/uielements/tooltip";
// import CustomizedDialogs from "./queryViewer";
// import { validate } from "uuid";

const columnData = [
  {
    id: "studentName",
    numeric: false,
    disablePadding: true,
    label: "Student",
  },
  {
    id: "studentAttendance",
    numeric: true,
    disablePadding: false,
    label: "Attendance",
  },
  // { id: 'fat', numeric: false, disablePadding: false, label: 'Email' },
  // { id: 'carbs', numeric: false, disablePadding: false, label: 'Query' },
  // { id: 'protein', numeric: true, disablePadding: false, label: 'Reply' },
  // { id: 'proteinh', numeric: true, disablePadding: false, label: 'Option' }
];

class EnhancedTableHead extends Component {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };
  render() {
    // const {
      // onSelectAllClick,
      // order,
      // orderBy,
      // numSelected,
      // rowCount,
    // } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            {/* <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            /> */}
          </TableCell>
          {columnData.map((column) => {
            return (
              <TableCell
                style={
                  column.id === "studentName"
                    ? { textAlignLast: "start" }
                    : { textAlignLast: "end" }
                }
                key={column.id}
                numeric={column.numeric}
                // padding={column.disablePadding ? 'none' : 'default'}
              >
                {/* <Tooltip
                  title="Sort"
                  placement={column.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                > */}
                {/* <TableSortLabel 
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  > */}
                {column.label}
                {/* </TableSortLabel> */}
                {/* </Tooltip> */}
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
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {/* <Typography variant="h6">Nutrition</Typography> */}

        <TopbarSearch />
      </div>
      <div className={classes.spacer} />
      {/* <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <Icon>delete</Icon>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <Icon>filter_list</Icon>
            </IconButton>
          </Tooltip>
        )}
      </div> */}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

export default class EnhancedTable extends Component {
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

  componentDidMount() {
    fetch("http://35.244.8.93:7000/api/user/select/all").then((result) => {
      result.json().then((res) => {
        this.setState({ data: res.reverse() });
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

  // handleClick = (event, id) => {
  //   const { selected } = this.state;
  //   const selectedIndex = selected.indexOf(id);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }

  //   this.setState({ selected: newSelected });
  // };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = (id) => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    // const searchValue = "r";
    console.log(data)
    return (
      <>
        {data.length === 0 ? <CircularIndeterminate/> : <Paper style={{ padding: "inherit" }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <Scrollbars style={{ width: "100%" }}>
            <Table className={classes.table}>
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
                  // .filter( val => {
                  //   if(searchValue === ""){
                  //     return val
                  //   }else if(val.name.toString().toLowerCase().includes(searchValue.toString().toLowerCase())){
                  //     return val
                  //   }
                  // })
                  .map((val) => {
                    // const isSelected = this.isSelected(validate.id);
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={val.id}
                        role="checkbox"
                        // aria-checked={""}
                      >
                        <TableCell padding="checkbox">
                          <CustomCalendar Data={val} />
                        </TableCell>
                        <TableCell style={{ fontSize: "1rem", color: "black" }}>
                          <p style={{ margin: "0px" }}>
                            {val.user_first_name} {val.user_last_name}
                          </p>
                        </TableCell>

                        <TableCell style={{ textAlignLast: "end" }}>
                          <p style={{ margin: "0px" }}>
                            <b>{val.attendance_percentage}%</b>
                          </p>
                          <p
                            style={{
                              margin: "0px",
                              fontSize: "0.5rem",
                              color: "grey",
                            }}
                          >
                            Out of 0 lecture
                          </p>
                        </TableCell>
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
              </TableFooter>
            </Table>
          </Scrollbars>
        </Paper>}
      </>
    );
  }
}
