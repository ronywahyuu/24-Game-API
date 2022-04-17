const funcLib = require('./solver.js');

module.exports = {
    resolveProblem(req, res) {
        try {
            const list = req.query['numbers']
                .split(',')
                .map((item) => parseInt(item));

            const calculateResult = funcLib.solve(list);

            calculateResult ? res.json({
                'solution': true,
                'equation': calculateResult
            }) : res.json({
                'solution': false,
            })
        } catch (error) {
            res.json({
                'solution': false,
            })
        }
    }
}