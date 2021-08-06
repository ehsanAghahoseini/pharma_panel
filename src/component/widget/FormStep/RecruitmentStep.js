import React from 'react';
import { Button } from 'antd';
import {connect} from "react-redux";
import {StepState} from '../../../action/AddAdsAction';

class RecruitmentStep extends React.Component {


  render() {


    return (
    <div className="group-button">
        <h4>استخدام</h4>
        <Button danger onClick={()=>{this.props.StepState('mestep')}}>بازگشت</Button>
        <Button onClick={()=>{this.props.StepState('rec_technical_assistant')}}>مسئول فنی</Button>
        <Button onClick={()=>{this.props.StepState('rec_pharmaceutical_technician')}}>تکنسین دارویی</Button>
        <Button onClick={()=>{this.props.StepState('rec_internship')}}>کارآموز</Button>
        <Button onClick={()=>{this.props.StepState('rec_physician_secretary')}}>منشی پزشک</Button>
        <Button onClick={()=>{this.props.StepState('rec_seller')}}>فروشنده </Button>
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

export default connect(mapStateToProps , mapDispatchToProps)(RecruitmentStep);
