const validateFilterFields = function validateFilterFields (filters, model) {
    const whereClause = {};

    if (Object.keys(filters).length > 0) {
        const tableColumns = Object.keys(model.tableAttributes);
        const validateEntries = Object.entries(filters).filter(([k, _]) => tableColumns.includes(k));
        Object.assign(whereClause, Object.fromEntries(validateEntries));
    }

    return whereClause;
}

module.exports = validateFilterFields;