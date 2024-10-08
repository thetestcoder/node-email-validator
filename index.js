const dns = require('dns');
const validator = require('validator');

// Sample list of emails for validation
const emails = [
   // email address only here
   "thetestcoder@gmail.com",
 ];

// Function to check MX records of a domain
const checkMXRecords = (domain) => {
    return new Promise((resolve, reject) => {
        dns.resolveMx(domain, (err, addresses) => {
            if (err) {
                return reject(err);
            }
            const validMX = addresses.some((address) => address.exchange && address.exchange.trim() !== '');
            if (!validMX) {
                return reject(new Error('Invalid MX domain'));
            }
            resolve(addresses);
        });
    });
};

// Function to validate email structure, MX records, and additional checks
const validateEmail = async (email) => {
    const domain = email.split('@')[1];

    // Step 1: Basic Email Format Check
    if (!validator.isEmail(email)) {
        return { email, status:0, message: 'Invalid format for email address' };
    }

    // Step 3: Check MX Records for Domain
    try {
        const mxRecords = await checkMXRecords(domain);
        if (mxRecords.length === 0) {
            return { email, status: 0, message: 'No MX records found, domain unreachable' };
        }
    } catch (error) {
        return { email, status: 0, message: 'Domain unreachable! Consider invalid' };
    }

    const mxLength = await checkMXRecords(domain);
    if (mxLength.length > 1) {
        return { email, status: 1, message: 'Catch-all domain, deliverability uncertain' };
    }

    return { email, status: 1, message: 'Valid email address!' };
};

// Validate all emails
const validateEmails = async (emailList) => {
    const results = [];
    var totalEmails = emailList.length;
    var validEmails = 0;
    var invalidEmails = 0;
    for (const email of emailList) {
        const result = await validateEmail(email);
        if (result.status === 1) {
            validEmails++;
        } else {
            invalidEmails++;
        }
        results.push(result);
    }
    console.log(`Total emails: ${totalEmails}`);
    console.log(`Valid emails: ${validEmails}`);
    console.log(`Invalid emails: ${invalidEmails}`);
    return results;
};

// Start validation
validateEmails(emails).then((results) => {
    console.log(results);
}).catch((err) => {
    console.error("Error during validation: ", err);
});
