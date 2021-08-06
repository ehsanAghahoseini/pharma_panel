import React from 'react';
import { Button } from 'antd';
import {connect} from "react-redux";
import {StepState} from '../../../action/AddAdsAction';

class PharmaceuticalNeedsStep extends React.Component {


  render() {


    return (
    <div className="group-button">
        <h4>نیازهای دارویی / کالا</h4>
        <Button danger onClick={()=>{this.props.StepState('mestep')}}>بازگشت</Button>
        <Button onClick={()=>{this.props.StepState('pharmaceutical_kala')}}>کالا</Button>
        <Button onClick={()=>{this.props.StepState('pharmaceutical_medicine')}}> دارو</Button>
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

export default connect(mapStateToProps , mapDispatchToProps)(PharmaceuticalNeedsStep);
