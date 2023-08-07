public class EmailHandler {
    @AuraEnabled(cacheable=true)
    public static void sendingEmail(List<String> toEmailAddresses) {
        // Your existing Apex code here...
        try {
            for (String toEmailAddress : toEmailAddresses) {
                // Fetch email template
                String emailTemplate = fetchEmailTemplate();

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
        } catch (Exception ex) {
            System.debug('Error sending email: ' + ex.getMessage());
        }
    }

    private static String fetchEmailTemplate() {
        // In a real-world scenario, you could query the email template based on some criteria
        // or fetch it from a custom setting, custom metadata, or a static resource.
        // For the sake of this example, we'll use a placeholder template.
        Id EmailTemplateId = '00X5j000001yROdEAM';
        List<EmailTemplate> templateList = [SELECT Body, Name, HtmlValue FROM EmailTemplate WHERE Id = :EmailTemplateId];

        if (templateList.size() > 0) {
            EmailTemplate emailTemplate = templateList[0];
            return emailTemplate.HtmlValue; // Assuming you want to use the HTML version of the template
        }

        // If the specified EmailTemplateId is not found, you might want to handle this scenario accordingly.
        // For now, it will return a default template.
        String emailTemplate = '<html><body><p>Hello {recipient},</p><p>This is the content of the email template.</p></body></html>';
        return emailTemplate;
    }

    // The rest of your existing Apex code...
}