import React from 'react';
import { Button } from 'antd';
import {connect} from "react-redux";
import {StepState} from '../../../action/AddAdsAction';

class AssignmentPharmacyStep extends React.Component {


  render() {


    return (
    <div className="group-button">
        <h4>واگذاری داروخانه</h4>
        <Button danger onClick={()=>{this.props.StepState('mestep')}}>بازگشت</Button>
        <Button onClick={()=>{this.props.StepState('private_assignment')}}>واگذاری خصوصی</Button>
        <Button onClick={()=>{this.props.StepState('government_assignment')}}>واگذاری دولتی / دانشگاهی</Button>
        <Button onClick={()=>{this.props.StepState('private_applicant')}}>متقاضی خصوصی</Button>

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

export default connect(mapStateToProps , mapDispatchToProps)(AssignmentPharmacyStep);
