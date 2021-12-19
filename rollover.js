
// Rollover quarterly payments for each year
output.markdown('# Tax Estimate Summary Rollover');

// TODO - need to add a statement to only duplicate if tax year = 2021
const documentsTable = await base.getTable('Documents');
const payments = await documentsTable.getView('Grid view').selectRecordsAsync(); // TODO update for name in airtable base

const newTaxYear = 2022;
 
main()

async function main() {

    let newRecords = [];

    for (let payment of payments.records){
        // TODO - Investigate a better way to copy records
        let newRecord = {};
        for (let field of documentsTable.fields) {
            if (field.name === 'Tax year') {
                if (payment['newTaxYear'] !== 2021) {
                    newRecord[field.name] = {name: newTaxYear.toString()}; //will need for single/multi select
                }
            } else if (field.name === 'Quarterly Payment Amount'){
                newRecord[field.name] = 0;
            }
            else {
                // This line takes the name of the field and uses it as a key
                // into the newRecord dictionary with value of the original cell value
                newRecord[field.name] = payment.getCellValue(field.name);
            }
        }
        newRecords.push(newRecord);
    }

    for (let record in newRecords) {
        documentsTable.createRecordAsync(newRecords[record]);
        console.log(newRecords[record]);
        //debugger;
    }
}
