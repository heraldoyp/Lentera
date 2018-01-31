const models = require('../models')

module.exports = function(results){
    let temp = [];
    results.forEach(idea => {
        idea.progress = Math.floor((idea.total_funding*100)/idea.goal_funding)
        temp.push(idea)
    }
    )
    // console.log()
    return temp
}