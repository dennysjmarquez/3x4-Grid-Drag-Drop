




/*
     FILE ARCHIVED ON 3:03:31 Jul 26, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:11:34 Dec 29, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
var Models = window.Models || {};

Models.Grid = function(w, h, el){
  
  this.width = w;
  this.height = h;
  this.blocks = [];
  this.field = new Models.Block(w, h, 0, 0);
  this.element = el;
  
  this.place = function(block, x, y){
    block.setPosition(x, y);
    
    return this._induct(block);
  }
  
  this.add = function(block){
    var grid = this
    var opening = _(this.field.units()).detect(function(unit){
      return grid.canFit(block, unit.x, unit.y);
    });
    return this._induct(block);
  }
  
  this._induct = function(block){
    if(this.canFit(block)){
      this.blocks.push(block);
      this.renderChild(block);
      
      if(this.isComplete()){
        this.element.trigger('complete');
      }
      
      return this;
    }
    
    return false;
  }
  
  this.clear = function(){
    _(this.blocks).each(function(block){
      block.destroy();
    });
  
    this.blocks = [];
    return this;
  }
  
  this.canFit = function(block, blockX, blockY){
    block.setPosition(blockX, blockY);
    
    // check if new block overlaps positioned blocks
    for (var i = 0; i < this.blocks.length; i++){
      if(this.blocks[i].overlapsAny(block)) { return false }
    }
    
    // check if new block fits in bounds of the grid
    return block.overlappedFullyBy(this.field);
  }
  
  this.blockAtPosition = function(unit){
    var testBlock = new Models.Block(1, 1, unit.x, unit.y);
    
    return _(this.blocks).detect(function(block){
      return block.overlapsAny(testBlock);
    });
  }
  
  this.blocksOverlappedByBlock = function(overlapper){
    var grid = this;
    return _(this.blocks).select(function(block){
      return block.overlapsAny(overlapper);
    });
  };
  
  this.isComplete = function(){
    var gridUnitCount = this.field.units().length;
    var blockUnitCount = _.reduce(
      this.blocks,
      function(memo, block){
        return memo + block.units().length;
      }, 0);
    
    return gridUnitCount == blockUnitCount;   
  }
  
  this.render = function(){
    if (_(this.element).isUndefined()){
      this.element = $( document.createElement('div') ).addClass('grid');

      _.each(this.blocks, function(block){
        this.renderChild(block);
      }, this);
      
    }
    
    return this.element;
  }
  
  this.renderChild = function(block){
    this.render();
    this.element.append(block.render());
  }
};