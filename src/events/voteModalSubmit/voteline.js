const pb = {
    le: '<:le:1173523215235153920>',
    me: '<:me:1173523212353679420>',
    re: '<:re:1173523210902450186>',
    lf: '<:lf:1173523209409269760>',
    mf: '<:mf:1173523206804619364>',
    rf: '<:rf:1173523216862560346> ',
  };
   
  function formatResults(upvotes = [], downvotes = []) {
    const totalVotes = upvotes.length + downvotes.length;
    const progressBarLength = 14;
    let filledSquares;
    let emptySquares;
    if(totalVotes === 0){
        filledSquares = 7
        emptySquares = 7
    }else{
        filledSquares = Math.round((upvotes.length / totalVotes) * progressBarLength) || 0;
        emptySquares = progressBarLength - filledSquares || 0;
    }
   
    if (!filledSquares && !emptySquares) {
      emptySquares = progressBarLength;

    }
   
    const upPercentage = (upvotes.length / totalVotes) * 100 || 0;
    const downPercentage = (downvotes.length / totalVotes) * 100 || 0;
   
    const progressBar =
      (filledSquares ? pb.lf : pb.le) +
      (pb.mf.repeat(filledSquares) + pb.me.repeat(emptySquares)) +
      (filledSquares === progressBarLength ? pb.rf : pb.re);
   
    const results = [];
    results.push(
      `👍 ${upvotes.length} upvotes (${upPercentage.toFixed(1)}%) • 👎 ${
        downvotes.length
      } downvotes (${downPercentage.toFixed(1)}%)`
    );
    results.push(progressBar);
   
    return results.join('\n');
  }
   
  export default formatResults;