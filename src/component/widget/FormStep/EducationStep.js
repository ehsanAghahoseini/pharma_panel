import React from 'react';
import { Button } from 'antd';
import {connect} from "react-redux";
import {StepState} from '../../../action/AddAdsAction';

class Education extends React.Component {


  render() {


    return (
    <div className="group-button">
        <h4>آموزش</h4>
        <Button danger onClick={()=>{this.props.StepState('mestep')}}>بازگشت</Button>
        <Button onClick={()=>{this.props.StepState('pharmacy_trainee')}}>کارآموز داروخانه (آموزش علمی) </Button>
    </div>
    );
  }
}


const mapStateToProps = state => {
  return({
    Displaystep: state.step,
  })
}
const mapDispatchToProps = {StepState};

export default connect(mapStateToProps , mapDispatchToProps)(Education);
