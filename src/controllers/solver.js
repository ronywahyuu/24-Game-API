function solve(numbers, goal, expr) {
  goal = (typeof goal !== 'undefined') ? goal : 24;
  expr = (typeof expr !== 'undefined') ? expr : [];

  if (expr.length == 0) {
    expr = numbers.slice().map(String);
  }
  if (numbers.length == 1) {
    if (numbers[0] == goal) {
      return numbers[0];
    } else {
      return false;
    }
  };

  if (numbers.length == 2) {
    var arr = combinetwo(numbers[0], numbers[1]);
    var answers = arr[0],
      answer_exps = arr[1];
    for (i = 0; i < answers.length; i++) {
      var answer = answers[i];
      if (Math.abs(answer - goal) < 0.00001) {
        return remove_redundant_brackets(convert_expr_to_string(expr[0], expr[1], answer_exps[i]));
      }
    }
    return false;
  } else {
    var pairs = removeDuplicates(getPairs(numbers));
    for (var pair_index = 0; pair_index < pairs.length; pair_index++) {
      var pair = pairs[pair_index];
      var res = combinetwo(pair[0], pair[1]);
      var possible_values = res[0];
      var possible_expr = res[1];
      for (var counter = 0; counter < possible_values.length; counter++) {
        var value = possible_values[counter];
        var expression = possible_expr[counter];
        var a_index = numbers.indexOf(pair[0]);
        var b_index = numbers.indexOf(pair[1]);

        if (a_index == b_index) {
          b_index = numbers.indexOf(pair[1], a_index + 1);
        }

        var expr_string = convert_expr_to_string(expr[a_index], expr[b_index], expression);
        var newlist = numbers.slice();
        var newexpr = expr.slice();

        // replace the two numbers with the combined result
        a_index = newlist.indexOf(pair[0]);
        newlist.splice(a_index, 1);
        b_index = newlist.indexOf(pair[1]);
        newlist.splice(b_index, 1);
        newlist.push(value);

        // order matters
        newexpr.splice(a_index, 1);
        newexpr.splice(b_index, 1);
        newexpr.push(expr_string);
        var result = solve(newlist, goal, newexpr);
        if (result) {
          return remove_redundant_brackets(result);
        }
      }
    }
  }
  return false;
}

function removeDuplicates(arr) {
  var hash = {};
  var out = [];
  for (var i = 0; i < arr.length; i++) {
    var key = arr[i].join('|');
    if (!hash[key]) {
      out.push(arr[i]);
      hash[key] = 'found'
    }
  }
  return out;
}

function convert_expr_to_string(a, b, expr) {
  var temp = [a, b];
  var result = '(' + temp[expr[0]].toString() + ')' + expr[1].toString() + '(' + temp[expr[2]].toString() + ')';
  return result;
}

function combinetwo(a, b) {
  var result = [a + b, a * b];
  var expr = [
    [0, '+', 1],
    [0, '*', 1]
  ];
  if (b > a) {
    result.push(b - a);
    expr.push([1, '-', 0]);
  } else {
    result.push(a - b);
    expr.push([0, '-', 1]);
  }

  if (b != 0) {
    result.push(a / b);
    expr.push([0, '/', 1]);
  }

  if (a != 0) {
    result.push(b / a);
    expr.push([1, '/', 0]);
  }
  return [result, expr];
}

function remove_redundant_brackets(expr) {
  var stack = [];
  // indices to be deleted
  var indices = [];
  for (var i = 0; i < expr.length; i++) {
    var ch = expr[i];
    if (ch == '(') {
      stack.push(i);
    }
    if (ch == ')') {
      var last_bracket_index = stack.pop();
      var enclosed = expr.slice(last_bracket_index + 1, i);
      if (!isNaN(enclosed)) {
        indices.push(i);
        indices.push(last_bracket_index);
      }
    }
  }
  // remove the elements whose indices are in indices list
  var result = [];
  for (var idx = 0; idx < expr.length; idx++) {
    if (!isInArray(idx, indices)) {
      result.push(expr[idx])
    }
  }
  return result.join("");
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function getPairs(arr) {
  var pairs = [];
  var out = [];
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i; j < arr.length - 1; j++) {
      out.push([arr[i], arr[j + 1]]);
    }
  }
  return out;
}

module.exports = {
  solve
}