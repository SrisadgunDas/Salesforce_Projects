import { LightningElement, api } from 'lwc';

export default class Flow_TO_Lwc extends LightningElement {
    @api accountName; // Public property to receive the accountName from the flow
    @api numberOfEmployees; // Public property to receive the numberOfEmployees from the flow

    handleStatusChange(event) {
        if (event.detail.status === 'FINISHED') { // Correct the status check to 'FINISHED'
            console.log('eventtttt  '+JSON.stringify(event.detail))
           const outputVariables = event.detail.outputVariables;
            for (let i = 0; i < outputVariables.length; i++) {
                const outputVar = outputVariables[i];
                if (outputVar.name === 'Apartment_BedRooms') {
                    this.accountName = outputVar.value.Bed_Rooms__c; // Access the value directly for simple variables
                   
                } else if (outputVar.name === 'NumberOfEmployees') {
                    this.numberOfEmployees = outputVar.value; // Access the value directly for simple variables
                }
            }
        }
    }
}