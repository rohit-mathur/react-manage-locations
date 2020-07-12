import React from 'react';
import { Form, FormGroup, Col, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { states, timezone as timezoneOptions } from './../data';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188
};

const delimiters = [KeyCodes.comma];

const ModalForm = ({ isFocused, handleInput, handleDropdown, isZipValid, formatPhone, formValues, handleAddition }) => {
    const {
        location,
        address1,
        suite,
        address2,
        city,
        state,
        zip,
        phone,
        timezone,
        facilityTimes,
        appointmentPool
    } = formValues

    const facilityTime = facilityTimes && facilityTimes.map(item => `${item.day} ${item.from} ${item.to}`).join(", ")
    return (
        <Form>
            <FormGroup row>
                <Col>
                    <Label>Location Name</Label>
                    <Input type="text" name="location" onChange={handleInput} value={location} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col>
                    <Label>Address Line 1</Label>
                    <Input type="text" name="address1" onChange={handleInput} value={address1} />
                </Col>
                <Col>
                    <Label>Suite No.</Label>
                    <Input type="text" name="suite" onChange={handleInput} value={suite}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col sm={6}>
                    <Label>Address Line 2</Label>
                    <Input type="text" name="address2" onChange={handleInput} value={address2} />
                </Col>
                <Col sm={3}>
                    <Label>City</Label>
                    <Input type="text" name="city" onChange={handleInput} value={city} />
                </Col>
                <Col sm={3}>
                    <Label>State</Label>
                    <Select options={states} onChange={(selectedOption) => handleDropdown(selectedOption, 'state')} value={state} className="form-dropdown" placeholder="" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col sm={3}>
                    <Label>Zip Code</Label>
                    <Input type="text" name="zip" onChange={handleInput} onBlur={isZipValid} value={zip} />
                </Col>
                <Col sm={3}>
                    <Label>Phone Number</Label>
                    <Input type="text" name="phone" onChange={handleInput} value={phone} />
                </Col>
                <Col sm={6}>
                    <Label>Timezone</Label>
                    <Select options={timezoneOptions} onChange={(selectedOption) => handleDropdown(selectedOption, 'timezone')} value={timezone} className="form-dropdown" placeholder="" />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col>
                    <Label>Facility Times</Label>
                    <Input type="text" name="facilityTime" onFocus={isFocused} value={facilityTime} />
                </Col>
                <Col>
                    <Label>Appointment Pool</Label>
                    <ReactTags tags={appointmentPool} delimiters={delimiters} handleAddition={handleAddition} placeholder="" />
                </Col>
            </FormGroup>
        </Form>
    )
}

export default ModalForm;