// CustomGallery.js
import { LightningElement, wire, api, track } from 'lwc';
import showingSelectedList from '@salesforce/apex/get_Location.showing_selectedList';
import { FlowNavigationNextEvent,FlowAttributeChangeEvent  } from 'lightning/flowSupport';
import getAPartments from '@salesforce/apex/IterateEmailTemplete.htmlVale';
import SendEmailToClient from '@salesforce/apex/IterateEmailTemplete.sendingEmail';
export default class custom_carosal extends LightningElement {
apartmentArray = [];
emailisvisable = false;
emailAddress = '';
listEmail = [];
flowvariables = {};
@api HowMany_BedRooms;
@api location_selected;
@track apartmentDetails = [];
showImage = false;
ifTruId = false
currentImageIndex = 0;
valueFromLwc = ''
StoreId =''  ;
@api name;
apartmentTotalPrice 
apartmentImageURl
contactEmail
apartmentLocation
apartmentBedRoom
apartmentName
JsonHtmlValue
apartmentId
listEmailAddress = ['sadgundasruchi@gmail.com'];
// Wire the Apex method to fetch apartment details
@wire(showingSelectedList, { locationaddress: '$location_selected', bed_rooms: '$HowMany_BedRooms' })
wiredApartmentDetails({ data, error }) {
    if (data) {
        this.apartmentDetails = data;
        this.showImage = data.length > 0;
        this.currentImageIndex = 0;
    } else if (error) {
        // Handle error if needed
        console.error(error);
    }
}

get currentApartment() {
    return this.apartmentDetails[this.currentImageIndex];
}

showPrevious() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.apartmentDetails.length) % this.apartmentDetails.length;
}

showNext() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.apartmentDetails.length;
}
sendsData() {
    const selectedApartment = this.apartmentDetails[this.currentImageIndex];
    if (selectedApartment) {
         this.apartmentId = selectedApartment.Id; 
        this.apartmentName = selectedApartment.Name; 
        // Assuming the property name is 'Id' with a capital 'I'
        this.apartmentBedRoom = selectedApartment.Bed_Rooms__c;
        this.apartmentLocation = selectedApartment.Location__c;
        this.apartmentImageURl = selectedApartment.Apartment_url__c;
        this.contactEmail = selectedApartment.Email__c;
        this.apartmentTotalPrice = selectedApartment.Apartment_TotalPrice__c;
        
        this.apartmentArray = [this.apartmentBedRoom, this.apartmentTotalPrice, this.contactEmail, this.apartmentImageURl, this.apartmentName, this.apartmentLocation];
        console.log('this.apartmentArray ' + this.apartmentArray);
        this.handleSearch();
        // The handleSearch() method is already called, so no need to call it again here.
        // ... rest of the code
    }
}


async handleSearch() {
    try {
        const result = await getAPartments({ sendingValues: this.apartmentArray });
        this.JsonHtmlValue = JSON.stringify(result).replace(/\\/g, '');
       // console.log('result came ' + this.JsonHtmlValue);
        this.emailisvisable = true;
        return this.JsonHtmlValue;
    } catch (error) {
        this.error = error;
        return null;
    }
}
//input code
handlechange(event) {
    this.emailAddress = event.target.value;
}

SendingEmailClick() {
    
    
    console.log('listEmail  '+this.emailAddress)
    this.listEmailAddress.push(this.emailAddress)
    console.log('listEmail  '+this.listEmailAddress)
    console.log('JsonHtmlValue '+this.JsonHtmlValue)
    SendEmailToClient({ toEmailAddresses: this.listEmailAddress, JsonStringHtml: this.JsonHtmlValue})
        .then((result) => {
            console.log('result came ' + result);
            this.emailisvisable = false;
        })
        .catch((error) => {
            this.error = error;
        });
}

}