import BaseChatMessage from 'lightningsnapin/baseChatMessage';
import { LightningElement, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
const CHAT_CONTENT_CLASS = 'chat-content';
const AGENT_USER_TYPE = 'agent';
const CHASITOR_USER_TYPE = 'chasitor';
const SUPPORTED_USER_TYPES = [AGENT_USER_TYPE, CHASITOR_USER_TYPE];

/**
 * Displays a chat message using the inherited api messageContent and is styled based on the inherited api userType and messageContent api objects passed in from BaseChatMessage.
 */
export default class CustomeChatting extends BaseChatMessage {
    @track strMessage = '';
    @track messageStyle = '';
    @track isBaseTextVisible = false;
    @track gmap = false;
    is_uploading = false;
    datapicker_Bol = false;
    islocation_avaliable = false;
    is_flowavialable = false;
    is_Flow_To_Lwc = false;
    isSupportedUserType(userType) {
        return SUPPORTED_USER_TYPES.some((supportedUserType) => supportedUserType === userType);
    }

    connectedCallback() 
    {
        //Set message string
        this.strMessage = this.messageContent.value;
        if (this.isSupportedUserType(this.userType)) 
        {
            //if using a lwc, remove any emojis that may have been inserted by the bot (ie :D or :p )
            if (this.userType == 'agent' && this.messageContent.value.startsWith('lwc'))
            {
                this.strMessage = this.strMessage.replace(/😀/g, ':D').replace(/😛/g, ':p');
            }

            if (this.userType == 'agent' && this.messageContent.value.startsWith('lwc:gmap'))
            {
                this.gmap = true;
            }
            else if (this.userType == 'agent' && this.messageContent.value.startsWith('LooKup_location'))
            {
                this.islocation_avaliable = true;
            }
            else if (this.userType == 'agent' && this.messageContent.value.startsWith('lwc:fileupload'))
            {
                this.is_uploading = true;
            }
            else if (this.userType == 'agent' && this.messageContent.value.startsWith('lwc:datepicker'))
            {
                this.datapicker_Bol = true;
            }
            else if (this.userType == 'agent' && this.messageContent.value.startsWith('lwc:flow'))
            {
                this.is_flowavialable = true;
            }
            else if (this.userType == 'agent' && this.messageContent.value.startsWith('Flow_To_Lwc'))
            {
                this.is_Flow_To_Lwc = true;
            }
           

            //ELSE SHOW BASE CHAT MESSAGE
            else if (!this.messageContent.value.startsWith('lwc:hide:'))
            {
                console.log('hi')
                this.isBaseTextVisible = true;
                this.messageStyle = `${CHAT_CONTENT_CLASS} ${this.userType}`;
            }
        } 
        else
        {
            throw new Error('Unsupported user type passed in: ${this.userType}');
        }
    }

isSupportedUserType(userType) 
{
    return SUPPORTED_USER_TYPES.some((supportedUserType) => supportedUserType === userType);
}
    handlePostMessage(event) 
    {
        const dateValue = event.detail;
        console.log('Handling Event with value: ' + dateValue);
        window.postMessage(
            {
                message: dateValue,
                type:  'chasitor.sendMessage'
            },
            window.parent.location.href
        );
    }

}