import React, { Component } from 'react';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import { LocationModal, FacilityTimes, LocationTable } from './../components';
import { connect } from 'react-redux';
import { requestLocations, deleteLocation, addLocation, editLocation, getLocationDetail } from './../actions';
import './styles/styles.scss';

class LocationWrapper extends Component {
    initialFormData = {
        location: '',
        address1: '',
        suite: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        timezone: '',
        facilityTimes: [],
        appointmentPool: []
    }
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            isFacilityFocused: false,
            pagination: {
                page: 1,
                pageLength: 10
            },
            displayLocations: [],
            formData: {
                ...this.initialFormData,
                facilityTimes: this.props.facilityTimes || [],
            }
        }
    }

    fetchRecords = ({ page, pageLength }) => {
        const displayLocations = this.props.locations.slice((page * pageLength) - pageLength, page * pageLength);
        this.setState({
            pagination: {
                page,
                pageLength
            },
            displayLocations
        })
    }

    toggleModal = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal,
            formData: this.initialFormData
        }))
    }

    toggleEditModal = () => {
        this.setState(prevState => ({
            isEditable: !prevState.isEditable,
            formData: this.initialFormData
        }))
    }

    isFocused = () => {
        this.setState(prevState => ({
            isFacilityFocused: true
        }))
    }

    deleteRecord = (row) => {
        this.props.deleteLocation(row.location)
    }

    editRecord = (row) => {
        this.setState({
            isEditable: true
        })
        this.props.getLocationDetail(row.location)
    }

    updateRecord = () => {
        this.props.editLocation(this.state.formData)
        this.toggleEditModal();
    }

    selectedFacilityTimes = (facilityTimes) => {
        facilityTimes = facilityTimes.filter(facilityTime => facilityTime.checked)
        this.setState({
            formData: {
                ...this.state.formData,
                facilityTimes,
            },
            isFacilityFocused: false
        })
    }

    closeFacilityModal = () => this.setState({ isFacilityFocused: false })

    handleFormInput = e => {
        const { name, value } = e.target;
        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value
            }
        })
    }

    handleDropdown = (selectedOption, key) => this.setState({
        formData: {
            ...this.state.formData,
            [key]: selectedOption
        }
    });

    isZipValid = () => {
        if (!!this.state.formData.zip) {
            const regex = /^\S*$/;
            const result = regex.test(this.state.formData.zip)
            this.setState({
                isZipValid: result
            })
        }
    }

    formatPhone = number => {
        let numberPattern = /^(\d{3})(\d{3})(\d{4})$/;
        let match = number.match(numberPattern);
        return match ? `(${match[1]}) ${match[2]}-${match[3]}` : number
    }

    save = async () => {
        const { location, zip, phone } = this.state.formData
        let zipRegex = /[A-Za-z0-9]{5,10}/;
        let phoneRegex = /[0-9]{10}/
        if (!location) {
            alert('Location Name is required')
            return false;
        }
        if (zip && !zipRegex.test(zip)) {
            alert('Zip must be alphanumeric ranging between 5 to 10 characters')
            return false;
        }
        if ((phone) && !phoneRegex.test(phone)) {
            alert('Please enter a mobile number of 10 digits')
            return false;
        }
        let reqObj = {
            ...this.state.formData,
        }
        this.props.addLocation(reqObj);
        this.toggleModal();
    }

    componentDidMount() {
        this.props.requestLocations()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.locations !== this.props.locations)
            this.setState({
                displayLocations: this.props.locations && this.props.locations.slice(0, 3)
            })
        if (prevProps.locationDetail !== this.props.locationDetail) {
            this.setState({
                formData: {
                    ...this.props.locationDetail
                }
            })
        }
    }

    convertAddress = (address) => {
        let ad = [];
        for (let x in address) {
            if (typeof address[x] === 'object')
                ad.push(address[x].label)
            else if (address[x]) {
                ad.push(address[x])
            }
        }
        return ad.length ? ad.join(", ") : '-'
    }

    handleAddition = (tag) => {
        this.setState(state => ({
            formData: {
                ...state.formData,
                appointmentPool: [...state.formData.appointmentPool, tag]
            }
        }));
    }

    render() {
        const { showModal, isFacilityFocused } = this.state;
        const columns = [
            {
                title: 'Location Name', dataKey: 'location', render: (value, row, index) => {
                    return row.location ? row.location.charAt(0).toUpperCase() + row.location.slice(1) : '-'
                }
            },
            {
                title: 'Address', dataKey: 'address', render: (value, row, index) => {

                    const { address1, suite, address2, city, state, zip } = row;

                    return this.convertAddress({ address1, suite, address2, city, state, zip })
                }
            },
            {
                title: 'Phone No.', dataKey: 'phone', render: (value, row, index) => row.phone ? this.formatPhone(row.phone) : '-'
            },
            {
                title: '', dataKey: 'actions', render: (value, row, index) => {
                    return (
                        <div className="text-right">
                            <i className="icon icon-edit" onClick={() => this.editRecord(row)} />
                            <i className="icon icon-delete" onClick={() => this.deleteRecord(row)} />
                        </div>
                    )
                }
            }
        ]
        return (
            <>
                <Container fluid>
                    <Row className="topHeader my-3">
                        <Col>
                            <h5 className="topHeader-title">Locations</h5>
                        </Col>
                        <Col>
                            <Button onClick={this.toggleModal} className="add-location-btn">
                                <i className="icon icon-add" /> Add Location
                            </Button>
                        </Col>
                    </Row>

                    {
                        !isFacilityFocused && <LocationModal
                            title="Add Location"
                            showModal={showModal}
                            toggleModal={this.toggleModal}
                            isFocused={this.isFocused}
                            handleFormInput={this.handleFormInput}
                            formData={this.state.formData}
                            handleDropdown={this.handleDropdown}
                            isZipValid={this.isZipValid}
                            save={this.save}
                            handleAddition={this.handleAddition}
                        />
                    }
                    {
                        this.state.isEditable && !isFacilityFocused && <LocationModal
                            title="Edit Location"
                            showModal={this.state.isEditable}
                            toggleModal={this.toggleEditModal}
                            isFocused={this.isFocused}
                            locationDetail={this.props.locationDetail}
                            handleFormInput={this.handleFormInput}
                            formData={this.state.formData}
                            isZipValid={this.isZipValid}
                            save={this.updateRecord}
                            handleAddition={this.handleAddition}
                        />
                    }
                    {
                        <FacilityTimes
                            isFacilityFocused={isFacilityFocused}
                            selectedFacilityTimes={this.selectedFacilityTimes}
                            closeFacilityModal={this.closeFacilityModal}
                            facilityTimes={this.state.formData.facilityTimes}
                        />
                    }
                    {
                        this.props.loading ? (
                            <div className="spinner-container">
                                <Spinner color="primary" />
                            </div>
                        ) : this.props.locations && this.props.locations.length === 0 ? (
                            <div className="no-locations my-5">
                                <div className="marker-container mt-5 mb-3">
                                    <i className="icon icon-marker" />
                                </div>
                                <div className="no-locations-message text-center">
                                    <h5>Kindly Add Your Location First</h5>
                                    <p>There is no location added right now</p>
                                </div>
                            </div>
                        ) : (
                                    <LocationTable
                                        columns={columns}
                                        data={this.props.locations}
                                        pagination={this.state.pagination}
                                        fetchRecords={this.fetchRecords}
                                        displayData={this.state.displayLocations}

                                    />
                                )
                    }
                </Container>
            </>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.loading,
    locations: state.locations,
    displayLocations: state.displayLocations,
    locationDetail: state.locationDetail
})

const mapDispatchToProps = dispatch => ({
    requestLocations: () => dispatch(requestLocations()),
    deleteLocation: (location) => dispatch(deleteLocation(location)),
    addLocation: (reqObj) => dispatch(addLocation(reqObj)),
    editLocation: (location) => dispatch(editLocation(location)),
    getLocationDetail: (location) => dispatch(getLocationDetail(location))
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationWrapper);