import { LightningElement, api } from 'lwc';
import { getFlowAttribute } from 'lightning/flowSupport';
import sendEmail from '@salesforce/apex/EmailHandler.sendingEmail';

export default class GetEmailVariable_flow extends LightningElement {
    @api EmailCame; // Public property to receive the accountName from the flow
    @api numberOfEmployees; // Public property to receive the numberOfEmployees from the flow

    handleStatusChange(event) {
        if (event.detail.status === 'FINISHED') {
            console.log('eventtttt  ' + JSON.stringify(event.detail));
            const outputVariables = event.detail.outputVariables;
            for (let i = 0; i < outputVariables.length; i++) {
                const outputVar = outputVariables[i];
                console.log('outputVar' + JSON.stringify(outputVar));
                if (outputVar.name === 'Value_Came_Lwc') {
                    this.EmailCame = outputVar.value; // Access the value directly for simple variables
                    console.log('this.accountName' + this.EmailCame);
                }
            }

            // Call the Apex method imperatively with the EmailCame value
            this.callApexMethod();
        }
    }

    callApexMethod() {
        const toEmailAddresses = [this.EmailCame, 'sadgundasruchi@gmail.com'];
        // Use the EmailCame property to call the Apex method
        sendEmail({ EmailCame: this.EmailCame })
            .then(result => {
                // Handle the result if needed
                console.log('Apex method result:', result);
            })
            .catch(error => {
                // Handle any errors that occurred during the Apex method call
                console.error('Error calling Apex method:', error);
            });
    }
}