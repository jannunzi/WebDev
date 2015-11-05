var pageModel = require("./page.model.js")();

console.log('\nfindAllPages(1)');
console.log(pageModel.findAllPages(1));

console.log('\nfindPage(1,1)');
console.log(pageModel.findPage(1,1));

console.log('\ncreatePage(1,{...})');
console.log(pageModel.createPage(1,{'id':123,'title':'Upload Picture'}));

console.log('\nfindAllPages(1)');
console.log(pageModel.findAllPages(1));

console.log('\ndeletePage(1,2)');
console.log(pageModel.deletePage(1,2));

console.log('\nupdatePage(1, 4, {"title": "Page 234"})');
console.log(pageModel.updatePage(1, 4, {title: "Page 234"}));

console.log('\nfindAllPages(1)');
console.log(pageModel.findAllPages(1));
