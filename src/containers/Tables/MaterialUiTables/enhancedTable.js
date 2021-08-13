import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Scrollbars from '../../../components/utility/customScrollBar';
import { withStyles } from '@material-ui/core/styles';
import keycode from 'keycode';
import TopbarSearch from '../../Topbar/topbarSearch';
import {connect} from 'react-redux'


import {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '../../../components/uielements/table';
import { Table } from './materialUiTables.style';
import Toolbar from '../../../components/uielements/toolbar';
// import Typography from '../../../components/uielements/typography';
import Paper from '../../../components/uielements/paper';
// import Checkbox from '../../../components/uielements/checkbox';
// import IconButton from '../../../components/uielements/iconbutton';
// import Icon from '../../../components/uielements/icon/index.js';
import Tooltip from '../../../components/uielements/tooltip';
import CustomizedDialogs from './queryViewer'



// const columnData = [
//   {
//     id: 'name',
//     numeric: false,
//     disablePadding: true,
//     label: 'Name',
//   },
//   { id: 'calories', numeric: true, disablePadding: false, label: 'Mobile' },
//   { id: 'fat', numeric: false, disablePadding: false, label: 'Email' },
//   { id: 'carbs', numeric: false, disablePadding: false, label: 'Query' },
//   { id: 'protein', numeric: true, disablePadding: false, label: 'Reply' },
//   { id: 'proteinh', numeric: true, disablePadding: false, label: 'Option' }
// ];




// // console.log(value)
// class EnhancedTableHead extends Component {
//   createSortHandler = property => event => {
//     this.props.onRequestSort(event, property);
//   };
//   searchValue = (e) => {
//     console.log("done")
//     console.log(e.target.value)
//   }
//   render() {
//     const {
//       // onSelectAllClick,
//       order,
//       orderBy,
//       // numSelected,
//       // rowCount,
//     } = this.props;


//     return (
//       <TableHead>
//         <TableRow >
//           {/* <TableCell > */}
//             {/* <Checkbox
//               indeterminate={numSelected > 0 && numSelected < rowCount}
//               checked={numSelected === rowCount}
//               onChange={onSelectAllClick}
//             /> */}
//           {/* </TableCell> */}
//           {columnData.map(column => {
//             return (
//               <TableCell
//                 key={column.id}
//                 numeric={column.numeric}
//                 // padding={column.disablePadding ? 'none' : 'default'}
//               >
//                 <Tooltip
//                   title="Sort"
//                   placement={column.numeric ? 'bottom-end' : 'bottom-start'}
//                   enterDelay={300}
//                 >
//                   <TableSortLabel
//                     active={orderBy === column.id}
//                     direction={order}
//                     onClick={this.createSortHandler(column.id)}
//                   >
//                     {column.label}
//                   </TableSortLabel>
//                 </Tooltip>
//               </TableCell>
//             );
//           }, this)}
//         </TableRow>
//       </TableHead>
//     );
//   }
// }

// const toolbarStyles = theme => ({
//   root: {
//     paddingRight: 2,
//   },
//   highlight: {
//     color: theme.palette.grey[50],
//     backgroundColor: theme.palette.primary[500],
//   },
//   spacer: {
//     flex: '1 1 100%',
//   },
//   actions: {
//     fill: theme.palette.text.primary,
//   },
//   title: {
//     flex: '0 0 auto',
//   },
// });

// let EnhancedTableToolbar = props => {
//   const { numSelected, classes } = props;


//   return (
//     <Toolbar
//       className={classNames(classes.root, {
//         [classes.highlight]: numSelected > 0,
//       })}
//     >
//       <div className={classes.title}>
//         {/* <Typography variant="h6">Nutrition</Typography> */}

//           <TopbarSearch/>
//       </div>
//       <div className={classes.spacer} />
//       {/* <div className={classes.actions}>
//         {numSelected > 0 ? (
//           <Tooltip title="Delete">
//             <IconButton aria-label="Delete">
//               <Icon>delete</Icon>
//             </IconButton>
//           </Tooltip>
//         ) : (
//           <Tooltip title="Filter list">
//             <IconButton aria-label="Filter list">
//               <Icon>filter_list</Icon>
//             </IconButton>
//           </Tooltip>
//         )}
//       </div> */}
//     </Toolbar>
//   );
// };

// EnhancedTableToolbar.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
// };



// EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

// // ------------------------------mapStateToProps---------------------------

// const mapStateToProps = (props) => {
//   return{
//     value: props.searchValue.data
//   }
// }

// // ------------------------------mapStateToProps---------------------------


// class EnhancedTable extends Component {
//   constructor(props, context) {
//     super(props, context);

//     this.state = {
//       order: 'asc',
//       orderBy: 'calories',
//       selected: [],
//       data: [
        // {
        //   id: "1",
        //   name: "Rahul",
        //   mobile: 8785469321,
        //   email: "rahul@gmail.com",
        //   query: "Query",
        //   reply: "Done",
        //   option: "yes",
        //   date: "2-oct-2019"
        // },
        // {
        //   id: "2",
        //   name: "Mohit",
        //   mobile: 8985474125,
        //   email: "mohit@gmail.com",
        //   query: "Module type",
        //   reply: "Pending",
        //   option: "yes",
        //   date: "25-nov-2019"
        // },
        // {
        //   id: "3",
        //   name: "Rohit",
        //   mobile: 8965874521,
        //   email: "rohit@gmail.com",
        //   query: "Query3",
        //   reply: "Done",
        //   option: "yes",
        //   date: "2-oct-2019"
        // },
        // {
        //   id: "4",
        //   name: "Divya",
        //   mobile: 7841200369,
        //   email: "divya@gmail.com",
        //   query: "Teaher",
        //   reply: "Pending",
        //   option: "yes",
        //   date: "2-oct-2019"
        // },
        // {
        //   id: "5",
        //   name: "Pooja",
        //   mobile: 7854125693,
        //   email: "pooja@gmail.com",
        //   query: "Teaching",
        //   reply: "Pending",
        //   option: "yes",
        //   date: "2-oct-2019"
        // },
        // {
        //   id: "6",
        //   name: "Monu",
        //   mobile: 7854123698,
        //   email: "monu@gmail.com",
        //   query: "study",
        //   reply: "Done",
        //   option: "yes",
        //   date: "2-oct-2019"
        // },
//       ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
//       page: 0,
//       rowsPerPage: 10,
//     };
//     // this.searchValue = this.props.bind(this)
//     // console.log(this.searchValue)
//   }

//   handleRequestSort = (event, property) => {
//     const orderBy = property;
//     let order = 'desc';

//     if (this.state.orderBy === property && this.state.order === 'desc') {
//       order = 'asc';
//     }

//     const data =
//       order === 'desc'
//         ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
//         : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

//     this.setState({ data, order, orderBy });
//   };

//   handleSelectAllClick = (event, checked) => {
//     if (checked) {
//       this.setState({ selected: this.state.data.map(n => n.id) });
//       return;
//     }
//     this.setState({ selected: [] });
//   };

//   handleKeyDown = (event, id) => {
//     if (keycode(event) === 'space') {
//       this.handleClick(event, id);
//     }
//   };

//   handleClick = (event, id) => {
//     const { selected } = this.state;
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }

//     this.setState({ selected: newSelected });
//   };

//   handleChangePage = (event, page) => {
//     this.setState({ page });
//   };

//   handleChangeRowsPerPage = event => {
//     this.setState({ rowsPerPage: event.target.value });
//   };

//   isSelected = id => this.state.selected.indexOf(id) !== -1;


  
//   render() {
//     const { classes } = this.props;
//     const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    // const searchValue = this.props.value

//     return (
//       <>
//       <Paper style={{ padding: "inherit" }}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <Scrollbars style={{ width: '100%' }}>
//           <Table className={classes.table}>
//             <EnhancedTableHead
//               // numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               // onSelectAllClick={this.handleSelectAllClick}
//               onRequestSort={this.handleRequestSort}
//               rowCount={data.length}
//             />
//             <TableBody>
//               {data

//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                // .filter( val => {
                //   if(searchValue === ""){
                //     return val
                //   }else if(val.name.toString().toLowerCase().includes(searchValue)){
                //     return val
                //   }
                // })
//                 .map(val => {
//                   const isSelected = this.isSelected(val.id);
//                   return (
//                     <TableRow
//                       hover
//                       onClick={event => this.handleClick(event, val.id)}
//                       onKeyDown={event => this.handleKeyDown(event, val.id)}
//                       role="checkbox"
//                       aria-checked={isSelected}
//                       tabIndex={-1}
//                       key={val.id}
//                       // selected={isSelected}
//                     >
//                       {/* <TableCell padding="checkbox">
//                         <Checkbox checked={isSelected} />
//                       </TableCell> */}
                      // <TableCell>{val.name}</TableCell>
                      // <TableCell>{val.mobile}</TableCell>
                      // <TableCell>{val.email}</TableCell>
                      // <TableCell>{val.query}</TableCell>
                      // <TableCell>{val.reply}</TableCell>
                      // <TableCell>{val.option}</TableCell>
                      // <TableCell><CustomizedDialogs query={val.query} name={val.name} date={val.date}/></TableCell>
//                     </TableRow>
//                   );
//                 })}

//             </TableBody>
//             <TableFooter>
//               <TableRow>
//                 <TablePagination
//                   count={data.length}
//                   rowsPerPage={rowsPerPage}
//                   page={page}
//                   onChangePage={this.handleChangePage}
//                   onChangeRowsPerPage={this.handleChangeRowsPerPage}
//                   />
//               </TableRow>
//             </TableFooter>
//           </Table>
//         </Scrollbars>
//       </Paper>
      
//     </>
//     );
//   }
// }

// // console.log(mapStateToProps)




// export default connect(mapStateToProps)(EnhancedTable)
// // export default EnhancedTable 





// ===================start=====================

const columnData = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Mobile' },
  { id: 'fat', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'carbs', numeric: false, disablePadding: false, label: 'Query' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'Reply' },
  { id: 'proteinh', numeric: true, disablePadding: false, label: 'Option' }
];

class EnhancedTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };
  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          {/* <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell> */}
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding="normal"
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: 2,
  },
  highlight: {
    color: theme.palette.grey[50],
    backgroundColor: theme.palette.primary[500],
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    fill: theme.palette.text.primary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classes.root}
    >
      <div className={classes.title}>
        <TopbarSearch/>
      </div>
      <div className={classes.spacer} />
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
  return{
    value: props.searchValue.data
  }
}

// ------------------------------mapStateToProps---------------------------

class EnhancedTable extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      data:[
        {
          id: "1",
          name: "Rahul",
          mobile: 8785469321,
          email: "rahul@gmail.com",
          query: "Query",
          reply: "Done",
          option: "yes",
          date: "2-oct-2019"
        },
        {
          id: "2",
          name: "Mohit",
          mobile: 8985474125,
          email: "mohit@gmail.com",
          query: "Module type",
          reply: "Pending",
          option: "yes",
          date: "25-nov-2019"
        },
        {
          id: "3",
          name: "Rohit",
          mobile: 8965874521,
          email: "rohit@gmail.com",
          query: "Query3",
          reply: "Done",
          option: "yes",
          date: "2-oct-2019"
        },
        {
          id: "4",
          name: "Divya",
          mobile: 7841200369,
          email: "divya@gmail.com",
          query: "Teaher",
          reply: "Pending",
          option: "yes",
          date: "2-oct-2019"
        },
        {
          id: "5",
          name: "Pooja",
          mobile: 7854125693,
          email: "pooja@gmail.com",
          query: "Teaching",
          reply: "Pending",
          option: "yes",
          date: "2-oct-2019"
        },
        {
          id: "6",
          name: "Monu",
          mobile: 7854123698,
          email: "monu@gmail.com",
          query: "study",
          reply: "Done",
          option: "yes",
          date: "2-oct-2019"
        },
      ] .sort((a, b) => (a.calories < b.calories ? -1 : 1)),
      page: 0,
      rowsPerPage: 10,
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
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

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const searchValue = this.props.value

    return (
      <Paper className={classes.root} style={{ padding: "inherit" }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <Scrollbars style={{ width: '100%' }}>
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
                .filter( val => {
                  if(searchValue === ""){
                    return val
                  }else if(val.name.toString().toLowerCase().includes(searchValue.toString().toLowerCase())){
                    return val
                  }
                })
                .map(val => {
                  const isSelected = this.isSelected(val.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, val.id)}
                      onKeyDown={event => this.handleKeyDown(event, val.id)}
                      tabIndex={-1}
                      key={val.id}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell> */}
                      <TableCell>{val.name}</TableCell>
                      <TableCell>{val.mobile}</TableCell>
                      <TableCell>{val.email}</TableCell>
                      <TableCell>{val.query}</TableCell>
                      <TableCell>{val.reply}</TableCell>
                      <TableCell>{val.option}</TableCell>
                      <TableCell><CustomizedDialogs query={val.query} name={val.name} date={val.date}/></TableCell>
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
      </Paper>
    );
  }
}

export default connect(mapStateToProps)(EnhancedTable)

