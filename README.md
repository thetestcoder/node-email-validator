
# Email Validation Script

This Node.js script validates a list of email addresses by performing the following checks:
1. Basic email format validation.
2. Checking the domain's MX (Mail Exchange) records to ensure the domain is capable of receiving emails.
3. Additional check to determine whether the domain has multiple MX records, which could indicate a catch-all domain.

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/)

## Installation

1. Clone the repository or copy the code.
```
git clone https://github.com/thetestcoder/node-email-validator.git
```
2. Navigate to the project directory and run the following command to install the required packages:

```bash
npm install
```

The required packages are:
- `dns`: Comes with Node.js by default for resolving DNS queries.
- `validator`: A library for validating and sanitizing strings.

## How to Use

1. Add email addresses to the `emails` array in the script.
2. Run the script using the following command:

```bash
node index.js
```

## Functions

### `checkMXRecords(domain)`

- This function checks the MX records of a given domain.
- If valid MX records are found, the function resolves with the addresses; otherwise, it rejects with an error.

### `validateEmail(email)`

- This function validates an email address by:
  1. Checking if the email format is valid.
  2. Resolving the MX records for the domain.
  3. Returning a status and message based on the validation outcome.

### `validateEmails(emailList)`

- This function loops through a list of emails, validating each one using `validateEmail()`.
- It provides a summary of valid and invalid emails and logs the result.

## Output

The script will output a list of email validation results as well as a summary like this:

```bash
Total emails: <total>
Valid emails: <count>
Invalid emails: <count>
```

Each email will have a corresponding validation result indicating if it's valid or invalid with a specific message.

## Example

```bash
[
  { email: 'thetestcoder@gmail.com', status: 1, message: 'Valid email address!' }
]
```

## License

This project is licensed under the MIT License.