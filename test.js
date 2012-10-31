
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


test("blockはスコープを持たず、関数だけがスコープを持つ" , function () {
    var a = 1;

    if (true) {
        var a = 2;

        (function () {
            var a = 3;
            equal(3, a);
        }());
    }
    equal(2, a);
});

test("&&演算子でプロパティにアクセス可能かをチェック", function () {
    var o;
    var name = o && o.getName();
    equal(undefined, name);
    o = {};
    o.getName = function() { return "getName!!!"; };
    name = o && o.getName();
    equal("getName!!!", name);
});

test("||演算子でデフォルト値を設定", function () {
    var otherName;
    var name = otherName || "default";

    equal("default", name);

    otherName = "myName";
    name = otherName || "default";
    equal("myName", name);
});


test("オブジェクトのプロパティへのアクセス方法", function () {
    var o = {name: "Simon"};
    var key = "name";
    equal("Simon", o.name);
    equal("Simon", o["name"]);
    equal("Simon", o[key]);
});


test("lengthは最後の要素+1", function () {
    var a = [ "dog", "cat", "hen" ];
    a[100] = "fox";

    equal(100 + 1, a.length);
    equal(undefined, a[3]);
});


test("配列をコピーする方法", function () {
    var a = [ 1, 2, 3 ],
        b = a,
        c = a.slice(),
        d = a.concat();
    a[0] = 100;
    equal(100, a[0]);
    equal(100, b[0]);
    equal(  1, c[0]);
    equal(  1, d[0]);
});


test("配列を空にする方法", function () {
    var a = [ 1, 2, 3 ],
        b = [ 1, 2, 3 ];

    a.length = 0;
    equal(0, a.length);

    b.splice(0, b.length);
    equal(0, b.length);
});


test("引数が渡されなかった場合はundefinedになる", function () {
    function add(x, y) {
        equal(undefined, x);
    }
    add();
});


test("applyで配列を引数として渡す", function () {
    function add(x, y) {
        return x + y;
    }
    equal(5, add.apply(null, [2, 3]));
});


test("名前付き無名関数の有効範囲", function () {
    var v1 = (function f() {
        equal("function", typeof f);
        return 1;
    }());
    var v2 = (function f() {
        //debugger;
        equal("function", typeof f);
        return 2;
    }());
    equal(1, v1);
    equal(2, v2);
    equal("undefined", typeof f);
});
