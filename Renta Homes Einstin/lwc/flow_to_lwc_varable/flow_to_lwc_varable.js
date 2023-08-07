import { LightningElement, api, wire } from 'lwc';
import { getFlowAttribute } from 'lightning/flowSupport';
export default class Flow_to_lwc_varable extends LightningElement {
    @api availableActions = []; // Required to support flow actions
    accountName;
    numberOfEmployees;

    // Wire the flow variables to the corresponding properties
    @wire(getFlowAttribute, { attribute: 'location_Data' })
    wiredAccountName({ data }) {
        if (data) {
            this.accountName = data;
        }
    }

    @wire(getFlowAttribute, { attribute: 'Apartment_BedRooms' })
    wiredNumberOfEmployees({ data }) {
        if (data) {
            this.numberOfEmployees = data;
        }
    }


}