/**
 * @name no pride
 * @description saves all server icons before june and replaces the icons during june
 * @version 1.0
 * @authorId 359174224809689089
 */

if (window.DrApi){
  return new class {
    onLoad() { this.currentDate = new Date(); }
    onStart() {
      // console.log(this.currentDate.getMonth()+1)
      this.noPridePatch = DrApi.Patcher.after('noPride', DrApi.webpack.getModuleByProps('getGuildIconURL'), 'getGuildIconURL', (that, args, res) => {
        let r=res
        if (this.currentDate.getMonth()+1 != 6)r=DrApi.storage.setData("noMorePride",args[0].id,r)
        if (this.currentDate.getMonth()+1 == 6)r=DrApi.storage.getData("noMorePride",args[0].id,r)
        return r
      })
    }
    onStoped() { this.noPridePatch() }
  }
}
module.exports = class noPride {
  load() {this.currentDate = new Date();}
  start() {
    this.noPridePatch = BdApi.Patcher.after('noPride', BdApi.findModuleByProps('getGuildIconURL'), 'getGuildIconURL', (that, args, res) => {
    let r=res
    if (this.currentDate.getMonth()+1 != 6)r=BdApi.setData("noMorePride",args[0].id,r)
    if (this.currentDate.getMonth()+1 == 6)r=BdApi.getData("noMorePride",args[0].id,r)
    return r
  })} 
  stop() {this.noPridePatch()} 
}
