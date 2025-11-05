// グローバルスコープ
var globalVar = "私はグローバル変数です";
let globalLet = "私もグローバルですが、let でスコープされています";
const globalConst = "私はグローバル定数です";


{
// ブロックスコープ
var blockVar = "私はブロックスコープの var です";
let blockLet = "私はブロックスコープの let です";
const blockConst = "私はブロックスコープの const です";

console.log(globalVar); // 出力: "I'm a global variable"console.log(globalLet)
console.log(globalLet); // 出力: "I'm also global, but scoped with let"
console.log(globalConst); // 出力: "I'm a global constant"

console.log(blockLet);
console.log(blockConst);
}


// グローバルスコープ



//Block Scope
console.log(blockVar);
//console.log(blockLet);
//console.log(blockConst);

function show(){
var functionVar = "私はブロックスコープの変数です";
let functionLet = "私はブロックスコープのletです";
const functionConst = "私はブロックスコープのconstです";


//console.log(functionLet); // ReferenceErrorをスローします
//console.log(functionConst); // ReferenceErrorをスローします
}
show();

console.log(functionVar); // ReferenceErrorをスローします

