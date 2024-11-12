const NotFoundResponse = (res, message) => {
    return res.status(404).json({ message });
}

const SuccessResponse = (res, teste) => {
    return res.status(200).json(teste);
}

const NoContentResponse = (res) => {
    return res.status(204).send();
}

const SuccessfulPagedResponse = (res, data, page, perPage) => {
    return res.status(200).json(
        {
            data: data.count === 0 ? [] : data.rows,
            meta: {
              total: data.count,
              per_page: page,
              current_page: perPage,
              last_page: Math.ceil(data.count / perPage)
            }
        }
    )
}



module.exports = {
    SuccessfulPagedResponse,
    SuccessResponse,
    NoContentResponse,
    NotFoundResponse
}