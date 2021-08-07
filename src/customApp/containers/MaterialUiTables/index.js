import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LayoutWrapper from '../../../components/utility/layoutWrapper';
import Papersheet, {
  DemoWrapper,
} from '../../../components/utility/papersheet';
import { Row, FullColumn } from '../../../components/utility/rowColumn';
import EnhancedTable from './enhancedTable';
import {useSelector} from 'react-redux'
import CheckboxesTags from './tag'

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
                {/* <div style={{display:'flex'}}> */}

            <CheckboxesTags label={'Course'} placeholder={'Search student by course'}/>
            <CheckboxesTags label={'Subject'} placeholder={'Search student by subject'}/>
            <CheckboxesTags label={'Batch'} placeholder={'Search student by batch'}/>
            <CheckboxesTags label={'Lecture'} placeholder={'Search student by lecture'}/>
                {/* </div> */}
              </DemoWrapper>
              <DemoWrapper>
                <EnhancedTable styles={{padding:'100px'}} {...props} search={mySearchState}/>
              </DemoWrapper>
            </Papersheet>
          </FullColumn>
        </Row>
        {console.log('useSelector',mySearchState)}
      </LayoutWrapper>
    );
  }

export default withStyles(styles, { withTheme: true })(TablesExample);
