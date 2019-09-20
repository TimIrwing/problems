/**
 * @param {string[]} emails
 * @return {number}
 */
const numUniqueEmails = function(emails) {
  const processedEmails = [];

  for (const email of emails) {
    let [_, localName, domainName] = email.match(/(.+)@(.+)/);

    localName = localName.replace(/\./g, ``);

    const indexOfPlusSign = localName.indexOf(`+`);

    if (~indexOfPlusSign) {
      localName = localName.slice(0, indexOfPlusSign);
    }

    const processedEmail = `${localName}@${domainName}`;

    if (!~processedEmails.indexOf(processedEmail)) {
      processedEmails.push(processedEmail);
    }
  }

  return processedEmails.length;
};
