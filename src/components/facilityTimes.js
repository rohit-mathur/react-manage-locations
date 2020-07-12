import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Col, Input } from 'reactstrap';
import './styles/facilityTimes.scss';

class FacilityTimes extends React.Component {
    constructor(props) {
        super(props)
        const initialDayState = {
            checked: false,
            from: '',
            to: ''
        }
        this.state = {
            facilityTimes: [
                {
                    ...initialDayState,
                    day: 'Sun'
                },
                {
                    ...initialDayState,
                    day: 'Mon'
                },
                {
                    ...initialDayState,
                    day: 'Tue'
                },
                {
                    ...initialDayState,
                    day: 'Wed'
                },
                {
                    ...initialDayState,
                    day: 'Thu'
                },
                {
                    ...initialDayState,
                    day: 'Fri'
                },
                {
                    ...initialDayState,
                    day: 'Sat'
                }
            ]
        }
    }

    isDigit = (value) => {
        if (!isNaN(value)) {
            return true
        } else if (value.indexOf(":") === 2) {
            return !isNaN(value.replace(":", ""))
        }
        return false
    }

    updateTime = (e, reqObj) => {
        const facilityTimes = this.state.facilityTimes.map(facilityTime => {
            if (e.target.name.indexOf(facilityTime.day.toLowerCase()) !== -1) {
                return {
                    ...facilityTime,
                    ...reqObj
                }
            }
            return facilityTime
        })
        return facilityTimes
    }

    onTimeChange = e => {
        const {name, value} = e.target;
        if (value.length <= 5 && this.isDigit(value)) {
            const timeType = name.indexOf('from') !== -1 ? 'from' : 'to'
            const reqObj = value.length === 2 ? { [timeType]: value + ":" } : { [timeType]: value }
            const facilityTimes = this.updateTime(e, reqObj)
            this.setState({ facilityTimes })
        }
    }

    handleKeyDown = e => {
        if (e.keyCode === 8) {
            const facilityTimes = this.state.facilityTimes.map(facilityTime => {
                if (e.target.name.indexOf(facilityTime.day.toLowerCase()) !== -1) {
                    if (e.target.name.indexOf('from') !== -1) {
                        return {
                            ...facilityTime,
                            from: ''
                        }
                    }
                    return {
                        ...facilityTime,
                        to: ''
                    }
                }
                return facilityTime;
            })
            this.setState({
                facilityTimes
            })
        }
    }

    applyAllChecked = e => {
        const { day } = e.target.dataset;
        const data = this.state.facilityTimes.filter(facilityTime => facilityTime.day.toLowerCase() === day)
        let reqObj = {
            from: data[0].from,
            to: data[0].to,
            frommer: data[0].frommer,
            tomer: data[0].tomer,
        }
        const facilityTimes = this.state.facilityTimes.map(facilityTime => facilityTime.checked ? { ...facilityTime, ...reqObj } : facilityTime)

        this.setState({ facilityTimes })
    }

    toggleCheckbox = (e) => {
        const { day } = e.target.dataset;
        const facilityTimes = this.state.facilityTimes.map(facilityTime => {
            if (facilityTime.day.toLowerCase() === day) {
                return {
                    ...facilityTime,
                    checked: e.target.checked
                }
            }
            return facilityTime
        })
        this.setState({
            facilityTimes
        })
    }

    convertTime = e => {
        let reqObj = {}, val = e.target.value;
        const timeType = e.target.name.indexOf('from') !== -1 ? 'from' : 'to'
        if (val.slice(0, 2) > 12) {
            reqObj = {
                [`${timeType}mer`]: false,
                [timeType]: (val.slice(0, 2) - 12) + val.slice(2, 5)
            }
        } else {
            reqObj = {
                [`${timeType}mer`]: true
            }
        }
        if (val < 10) {
            reqObj = {
                [`${timeType}mer`]: false,
                [timeType]: "0" + val
            }
        }
        const facilityTimes = this.updateTime(e, reqObj)
        this.setState({ facilityTimes })
    }

    selectedFacilityTimes = () => {
        this.props.selectedFacilityTimes(this.state.facilityTimes)
    }


    render() {
        const { isFacilityFocused } = this.props;
        return (
            <Modal isOpen={isFacilityFocused} backdrop={true} className="custom-modal facility-time-modal">
                <ModalHeader>Facility Times</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Col xs={{
                                offset: 1,
                                size: 4
                            }} className="time-header">From</Col>
                            <Col className="time-header">To</Col>
                        </FormGroup>
                        {
                            this.state.facilityTimes.map(facilityTime => (
                                <FormGroup row className="align-center">

                                    <Col xs={1} className="d-flex align-center">
                                        <Input type="checkbox" data-day={facilityTime.day.toLowerCase()} onChange={this.toggleCheckbox} checked={facilityTime.checked} />
                                        <span className="day">{facilityTime.day}</span>
                                    </Col>
                                    <Col xs={4} className="time-container pr-0">
                                        <Input type="text"
                                            className="time-field"
                                            name={`from${facilityTime.day.toLowerCase()}`}
                                            onChange={this.onTimeChange}
                                            value={facilityTime.from}
                                            onKeyDown={this.handleKeyDown}
                                            placeholder="HH:MM"
                                            onBlur={this.convertTime} />
                                        <div className="meridiem-container">
                                            <span className={`meridiem ${facilityTime.frommer ? 'active' : ''}`}>AM</span>
                                            <span className={`meridiem ${!facilityTime.frommer ? 'active' : ''}`}>PM</span>
                                        </div>
                                    </Col>
                                    <Col xs={4} className="time-container">
                                        <Input type="text"
                                            className="time-field"
                                            name={`to${facilityTime.day.toLowerCase()}`}
                                            onChange={this.onTimeChange}
                                            value={facilityTime.to}
                                            onKeyDown={this.handleKeyDown}
                                            placeholder="HH:MM"
                                            onBlur={this.convertTime} />
                                        <div className="meridiem-container">
                                            <span className={`meridiem ${facilityTime.tomer ? 'active' : ''}`}>AM</span>
                                            <span className={`meridiem ${!facilityTime.tomer ? 'active' : ''}`}>PM</span>
                                        </div>
                                    </Col>
                                    <Col xs={3}>
                                        <Button className="btn-apply" onClick={this.applyAllChecked} data-day={facilityTime.day.toLowerCase()}>Apply To All Checked</Button>
                                    </Col>
                                </FormGroup>
                            ))
                        }

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.props.closeFacilityModal} className="btn-cancel">Cancel</Button>
                    <Button onClick={this.selectedFacilityTimes} className="btn-save">Save</Button>{' '}
                </ModalFooter>
            </Modal>
        )
    }
}

export default FacilityTimes;