const checkMillionDollarIdea = (req, res, next) => {
const numWeeks = Number(req.body.numWeeks);
const weeklyRevenue = Number(req.body.weeklyRevenue);
const total = numWeeks * weeklyRevenue;
    if (!numWeeks || !weeklyRevenue || isNaN(total) || total < ((10 ** 3) ** 2)) // ((10*10*10)*10)
    {
        res.status(400).send();
    } else {
    next();
}
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
