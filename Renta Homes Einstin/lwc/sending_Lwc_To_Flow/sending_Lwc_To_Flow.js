import { LightningElement, api, track, wire } from 'lwc';

export default class Sending_Lwc_To_Flow extends LightningElement {
    @track is_flowavailable = false;
    @track flowvariables = {};
    @track valueFromLwc = '';
    @track ifTruId = false;

    @api CameFromParent;

    connectedCallback() {
        this.valueFromLwc = 'this is a string';

        this.flowvariables = [
            {
                name: "Value_Came_Lwc",
                type: "String", // Ensure the data type matches the flow variable type
                value: this.valueFromLwc // Set the value to the LWC variable value
            }
        ];
        this.is_flowavailable = true;
    }
}