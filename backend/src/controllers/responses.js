const NotFoundResponse = (res, message) => {
    return res.status(404).json({ message });
}

const SuccessResponse = (res, data) => {
    return res.status(200).json(data);
}

const NoContentResponse = (res) => {
    return res.status(204);
}

module.exports = {
    SuccessResponse,
    NoContentResponse,
    NotFoundResponse
}