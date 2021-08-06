import React from 'react';
import { Button } from 'antd';
import {connect} from "react-redux";
import {StepState} from '../../../action/AddAdsAction';

class MeStep extends React.Component {


  render() {


    return (
      <div className="group-button">
        <Button danger onClick={()=>{this.props.StepState('first')}}>بازگشت</Button>
        <Button onClick={()=>{this.props.StepState('pharmaceutical_needs')}}>دارو - کالایاب</Button>
        <Button onClick={()=>{this.props.StepState('job_search')}}>کاریابی</Button>
        <Button onClick={()=>{this.props.StepState('recruitment')}}>استخدام</Button>
        <Button onClick={()=>{this.props.StepState('assignment_pharmacy')}}>واگذاری داروخانه</Button>
        <Button onClick={()=>{this.props.StepState('therapeutic_real_estate')}}>املاک درمانی</Button>
        <Button onClick={()=>{this.props.StepState('education')}}>آموزش</Button>
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

export default connect(mapStateToProps , mapDispatchToProps)(MeStep);
