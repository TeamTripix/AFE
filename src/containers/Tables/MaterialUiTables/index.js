import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import Papersheet, {
  DemoWrapper,
} from '../../../components/utility/papersheet';
import { Row, FullColumn } from '../../../components/utility/rowColumn';
import EnhancedTable from './enhancedTable';
import {useSelector} from 'react-redux'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

    const TablesExample = (props)=>{
    const mySearchState = useSelector((state)=> state.seachData)
    return (
      <LayoutWrapper>
        <Row>
          <FullColumn>
            <Papersheet>
              <DemoWrapper>
                <EnhancedTable {...props} search={mySearchState}/>
              </DemoWrapper>
            </Papersheet>
          </FullColumn>
        </Row>
      </LayoutWrapper>
    );
  }

export default withStyles(styles, { withTheme: true })(TablesExample);
