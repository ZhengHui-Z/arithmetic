function judge(a, b, op) {
    res = 0;
    flag = 1;
    if (op == 0) {
        res = a + b;
        if (res > 100 || a == 0 || b == 0) return 0;
    }
    else if (op == 1) {
        res = a - b;
        if (res < 0) return 0;
    }
    else if (op == 2) {
        res = a * b;
        if (res > 100) return 0;
    }
    else {
        if (b == 0) return 0;
        res = a / b;
        if (a == 0 || a % b != 0 || res > 100) return 0;
    }
    return [1, res];
}
function get_formula() {
    step = 0
    formula = new Array()
    // reslut = new Array()
    while (step < 100) {
        op1 = Math.floor(Math.random() * 4);
        op2 = Math.floor(Math.random() * 4);

        a = Math.floor(Math.random() * 101);
        b = Math.floor(Math.random() * 101);
        c = Math.floor(Math.random() * 101);
        op = ['+', '-', '&times;', '&divide;'];
        // op = ['+', '-', '*', '÷'];
        res1 = 0;
        res = 0;
        if (judge(a, b, op1)[0] == 1) {
            res1 = judge(a, b, op1)[1];
        }
        else { continue; }
        if (judge(res1, c, op2)[0] == 1) {
            res = judge(res1, c, op2)[1];
            step++;
        }
        else { continue; }
        if ((op1 == 0 || op1 == 1) && (op2 == 2 || op2 == 3))
            str = "(" + a + " " + op[op1] + " " + b + ")" + " " + op[op2] + " " + c;
        else
            str = a + " " + op[op1] + " " + b + " " + op[op2] + " " + c;

        formula.push({ 'id': step, 'title': str, 'res': res, diff: '<i class="layui-icon">&#xe67a;</i><i class="layui-icon">&#xe67a;</i> ' })
        // reslut[step] = res;
    }
    return formula
}
function randomInt(lowerValue, upperValue) {
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
}

function operate(a, b, op) {
    if (op == 0) return a + b;
    else if (op == 1) return a - b;
    else if (op == 2) return a * b;
    else if (op == 3 && b != 0) return a / b;
    else return -1;
}

function alu(num, boss) {
    var opr = ['+', '-', '&times;', '&divide;'];
    var star = '<i class="layui-icon" style="color: #1E9FFF;">&#xe67a;</i>';
    var obj = [];
    for (var i = 0; i < num;) {
        var op = [];
        var a = [];
        for (var j = 0; j < 2; j++){
            var tmp = Math.random();
            if (tmp > boss / num) {
                op.push(randomInt(0, 1));
            }
            else {
                op.push(randomInt(2, 3));
            }
        }
        for (var j = 0; j < 3; j++) {
            var tmp = Math.random();
            if (tmp < 0.0005) a.push(0);
            else a.push(randomInt(1, 100));
        }
        var flag = randomInt(0, 1);
        if (flag)//abc*-
        {
            var tmp = operate(a[1], a[2], op[0]);
            if (tmp >= 0 && tmp <= 100 && tmp == Math.floor(tmp)) {
                var res = operate(a[0], tmp, op[1]);
                if (res >= 0 && res <= 100 && res == Math.floor(res)) {
                    if (op[0] >= 2 && op[1] <= 1 || op[0] == 0 && op[1] == 0 || op[0] == 2 && op[1] == 2 || op[0] == 1 && op[1] == 0 || op[0] == 3 && op[1] == 2) var title = (a[0] + opr[op[1]] + a[1] + opr[op[0]] + a[2]);
                    else var title = (a[0] + opr[op[1]] + '(' + a[1] + opr[op[0]] + a[2] + ')');
                    var diff = "";
                    for (var j = 0; j < op[0] / 2 + op[1] / 2 + 2; j++) diff += star;
                    obj.push({ 'id': i+1, 'title': title, 'res': res, 'diff': diff });
                    i++;
                }

            }
        }
        else//ab+c/
        {
            var tmp = operate(a[0], a[1], op[0]);
            if (tmp >= 0 && tmp <= 100 && tmp == Math.floor(tmp)) {
                var res = operate(tmp, a[2], op[1]);
                if (res >= 0 && res <= 100 && res == Math.floor(res)) {
                    if (op[0] <= 1 && op[1] >= 2) var title = ('(' + a[0] + opr[op[0]] + a[1] + ')' + opr[op[1]] + a[2]);
                    else var title = (a[0] + opr[op[0]] + a[1] + opr[op[1]] + a[2]);
                    var diff = "";
                    for (var j = 0; j < op[0] / 2 + op[1] / 2 + 2; j++) diff += star;
                    obj.push({ 'id': i+1, 'title': title, 'res': res, 'diff': diff });
                    i++;
                }

            }

        }
    }
    return obj;
}
