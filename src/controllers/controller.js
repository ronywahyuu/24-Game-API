const funcLib = require('./solver.js');

module.exports = {
    resolveProblem(req, res) {
        const list = req.query['numbers'].map((item) => parseInt(item));

        const calculateResult = funcLib.solve(list);

        calculateResult ? res.json({
            'solution': true,
            'equation': calculateResult
        }) : res.json({
            'solution': false,
        })
    }
}