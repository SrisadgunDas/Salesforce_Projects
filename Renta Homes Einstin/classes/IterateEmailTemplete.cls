public class IterateEmailTemplete {
public static String htmlValuestored ;
    @AuraEnabled(cacheable=true)
    public static String htmlVale(List<String> sendingValues) {
        List<EmailTemplate> htmlValuesCame = [SELECT Body, Name, HtmlValue FROM EmailTemplate WHERE Id = '00X5j000001yROdEAM'];
        String htmlValue = htmlValuesCame[0].HtmlValue;
        
        // Replace {apartmentPrice} with the value at index 0 from sendingValues list
        if (!sendingValues.isEmpty()) {
            htmlValue = htmlValue.replace('{apartmentPrice}', sendingValues[1]);
            htmlValue = htmlValue.replace('{ApartmentEmail}', sendingValues[2]);
            htmlValue = htmlValue.replace('{ApartmentLocation}', sendingValues[5]);
            htmlValue = htmlValue.replace('{ApartmentBedRoom}', sendingValues[0]);
            htmlValue = htmlValue.replace('{ApartmentName}', sendingValues[4]);
        }
        
        // Find the index of the 'src="' substring
        Integer srcStartIndex = htmlValue.indexOf('src="');
        if (srcStartIndex >= 0) {
            // Find the closing double quote after 'src="'
            Integer srcEndIndex = htmlValue.indexOf('"', srcStartIndex + 5);
            if (srcEndIndex >= 0) {
                // Extract the original src attribute value (empty string) and replace it with the value at index 3 from sendingValues list
                String modifiedHtml = htmlValue.substring(0, srcStartIndex + 5) + sendingValues[3] + htmlValue.substring(srcEndIndex);
                htmlValuestored = modifiedHtml;
				system.debug('htmlValuestored  '+htmlValuestored);
                return modifiedHtml;
            }
        }
      
        // If the 'src="' substring is not found, return the original HTML value
        return htmlValue;
    }
    @AuraEnabled(cacheable=true)
    public static string sendingEmail(List<String> toEmailAddresses, string JsonStringHtml) {
        // Your existing Apex code here...
        try {
            for (String toEmailAddress : toEmailAddresses) {
                // Fetch email template
               String emailTemplate = JsonStringHtml;
                
                // Replace placeholder in the template with dynamic content
                String emailContent = emailTemplate.replace('{recipient}', toEmailAddress);
                
                // Send the email
                Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
                message.setToAddresses(new List<String>{toEmailAddress});
                message.setSubject('Rental Homes Demo From SmartBots');
                message.setHtmlBody(emailContent);
                Messaging.sendEmail(new List<Messaging.Email>{message});
                
                System.debug('Email sent successfully to: ' + toEmailAddress);
            }
			return 'send success';

        } catch (Exception ex) {
            System.debug('Error sending email: ' + ex.getMessage());
			return 'failed email';
        }
    }
    
}