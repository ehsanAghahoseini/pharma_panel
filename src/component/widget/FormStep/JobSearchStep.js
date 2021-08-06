import React from 'react';
import { Button } from 'antd';
import {connect} from "react-redux";
import {StepState} from '../../../action/AddAdsAction';

class JobSearchStep extends React.Component {


  render() {


    return (
    <div className="group-button">
        <h4>کاریابی</h4>
        <Button danger onClick={()=>{this.props.StepState('mestep')}}>بازگشت</Button>
        <Button onClick={()=>{this.props.StepState('technical_assistant')}}>مسئول فنی</Button>
        <Button onClick={()=>{this.props.StepState('pharmaceutical_technician')}}>تکنسین دارویی</Button>
        <Button onClick={()=>{this.props.StepState('internship')}}>کارآموز</Button>
        <Button onClick={()=>{this.props.StepState('physician_secretary')}}>منشی پزشک</Button>
        <Button onClick={()=>{this.props.StepState('seller')}}>فروشنده </Button>
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

export default connect(mapStateToProps , mapDispatchToProps)(JobSearchStep);
