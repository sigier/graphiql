const userOwnership = (req, valueCompare) => {
    if(req._id.toString() !== userOwnership._id.toString()){
        return false;
    }
    return true;
}

module.exports = {
    userOwnership
}