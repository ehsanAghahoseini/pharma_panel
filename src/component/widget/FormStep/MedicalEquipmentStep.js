import React from 'react';
import { Button } from 'antd';
import {connect} from "react-redux";
import {StepState} from '../../../action/AddAdsAction';

class MedicalEquipmentStep extends React.Component {


  render() {


    return (
    <div className="group-button">
        <h4>لوازم پزشکی/اورتوپدی</h4>
        <Button danger onClick={()=>{this.props.StepState('shopstep')}}>بازگشت</Button>
        <Button onClick={()=>{this.props.StepState('shop_medical_equipment_init')}}>لوازم پزشکی</Button>
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

export default connect(mapStateToProps , mapDispatchToProps)(MedicalEquipmentStep);
