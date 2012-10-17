
test("parseIntで文字列を数値に変換", function () {
    equal(10, parseInt("10"));
    equal(10, parseInt("010", 10));
    equal(8, parseInt("010"));
});


test("＋で文字列を数値に変換", function () {
    equal(10, +"10");
    equal(10, +"010");
    equal("1010", 1 + "010");
    equal(10, 1 * "010");
});


test("適切でない文字を含む文字列を数値に変換", function (){
    equal(10, parseInt("10.2abc"), "途中まで数値に変換する");
    equal(true, isNaN(+"10.2abc"), "NaNになる");
});


test("undefinedのチェック", function () {
    var v;
    ok(v === undefined);
    ok(typeof v === "undefined");
});


test("falsyな値", function () {
    function is_truethy(val) {
        if (val) {
            return "truthy";
        }
        return "falsy";
    }
    equal("falsy" , is_truethy(false));
    equal("falsy" , is_truethy(""));
    equal("falsy" , is_truethy(0));
    equal("falsy" , is_truethy(null));
    equal("falsy" , is_truethy(undefined));

    equal("truthy", is_truethy("0"));
    equal("truthy", is_truethy("false"));
    equal("truthy", is_truethy({}));
    equal("truthy", is_truethy([]));
});


test("オブジェクトのプロパティのチェック", function () {
    function check1(obj) {
        // objがnullやundefinedのときに例外となる
        if (obj.prop === 1) {
            return true;
        }
        return false;
    }
    equal(true, check1({prop: 1}));
    equal(false, check1({}));
    throws(function () { check1(null); });
    throws(function () { check1(undefined); });

    function check2(obj) {
        if (obj && obj.prop === 1) {
            return true;
        }
        return false;
    }
    equal(false, check2(null));
    equal(false, check2(undefined));
    equal(false, check2({}));

});


test("==と===", function () {
    ok("" == 0);
    ok("" !== 0);
});

