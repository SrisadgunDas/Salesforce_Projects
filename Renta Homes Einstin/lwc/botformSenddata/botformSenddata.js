import { LightningElement ,track} from 'lwc';

export default class BotformSenddata extends LightningElement {
    @track name;
    @track email;
    @track phone;
  
    handleNameChange(event) {
      this.name = event.target.value;
    }
  
    handleEmailChange(event) {
      this.email = event.target.value;
    }
  
    handlePhoneChange(event) {
      this.phone = event.target.value;
    }
  
    handleSubmit() {
      const userDetails = {
        name: this.name,
        email: this.email,
        phone: this.phone
      };
  
      // Pass user details to Einstein Bot
      this.dispatchEvent(new CustomEvent('userdata', { detail: userDetails }));
    }
  }