
var maxlength = function (word) {
    return word.substring(0,10);
}

var scorefilter = function (scores,year,term) {
    var self = this;
    return scores.filter(function(score){
        if(self.term=="第一学期"){var xq = "1"}else{var xq = "2"}
        var value = (score.XN == self.year && score.XQ == xq)
        return value
    })
};
exports.maxlength = maxlength;
exports.scorefilter = scorefilter;