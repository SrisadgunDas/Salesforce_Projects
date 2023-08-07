public class HtmlManipulator {
    public static String replaceSrc(String htmlString, String newUrl) {
        // Find the position of "src=" in the HTML string
        Integer srcIndex = htmlString.indexOf('src="');
        
        // If "src=" is not found, return the original HTML
        if (srcIndex == -1) {
            return htmlString;
        }
        
        // Find the position of the closing double-quote after "src="
        Integer closingQuoteIndex = htmlString.indexOf('"', srcIndex + 5); // Adding 5 to skip "src="
        
        // If closing double-quote is not found, return the original HTML
        if (closingQuoteIndex == -1) {
            return htmlString;
        }
        
        // Escape the double quotes in the new URL
        newUrl = String.escapeSingleQuotes(newUrl);
        
        // Replace the "src" attribute with the new URL
        String modifiedHtml = htmlString.substring(0, srcIndex + 5) + newUrl + htmlString.substring(closingQuoteIndex);
        
        return modifiedHtml;
    }
}