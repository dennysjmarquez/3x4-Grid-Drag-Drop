




/*
     FILE ARCHIVED ON 3:04:16 Jul 26, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:11:38 Dec 29, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
// Closure to keep vars out of global scope
(function() {


$(document).ready(function(){

  window.placeholderGrid = new Models.Grid(4,3, $('#placeholderGrid'));
  _.times(12, function(){
    placeholderGrid.add(new Models.Block(1,1))
  });
  
  window.grid = new Models.Grid(4, 3, $('#workingGrid'));
  
  
  $('.key').draggable({
    helper: renderDragHelper
  });
  
  $('#placeholderGrid .block').droppable({
    over: overGridHandler,
    drop: dropGridHandler
  });
  
  $('#workingGrid').droppable({
    out: outGridHandler
  });
  
  $('.instructionOverlay').click(hideInstructions);
  $('.instructionArrow').click(hideInstructions);
  
  $('#resetButton').click(function(){
    grid.clear();
    disableShowCode();
  });
  
  $('#showCode').click( showCodeBox );
  $('#codeBox .closeWindow').click( hideCodeBox );
  
  $('.key').bind('touchend', keyTouchHandler);
});




var hideInstructions = function(){
    $('.instructionOverlay').addClass('fade');
    $('.instructionArrow').addClass('fade');
}





var renderDragHelper = function(){
  var sizeHash = new Models.Block().sizeFromElement($(this).attr('class'));
  var sizeClass = 's' + sizeHash.width + 'x' + sizeHash.height;
  var helper = $('<li class="key dragging ' + sizeClass + '"></li>');
  return helper;
}

var overGridHandler = function(event, ui){
  
  // scale key up to grid size
  if(ui.helper.hasClass('key')){
    ui.helper.removeClass('key').addClass('block');
  }
  
  // add class to style according to wether piece fits or not
  $('#placeholderGrid').removeClass('canFit');
  $('#placeholderGrid').removeClass('cantFit');
  
  if(grid.canFit( generateBlock(ui.helper, $(this)) )){
    $('#placeholderGrid').addClass('canFit');
  } else {
    $('#placeholderGrid').addClass('cantFit');
  }
  
  
  showFitWhileDragging(ui.helper, $(this));
}

var outGridHandler = function(){
  clearFit();
}

var showFitWhileDragging = function(helper, unit){
  var overlapped = placeholderGrid.blocksOverlappedByBlock( generateBlock(helper, unit) );
  
  $('#placeholderGrid .block').removeClass('draggingOver');
  
  _(overlapped).each(function(block){
    block.element.addClass('draggingOver');
  });  
}

var clearFit = function(){
  $('.dragging.block').removeClass('block').addClass('key');
  $('.draggingOver').removeClass('draggingOver');
}

var dropGridHandler = function(event, ui){
  grid.place( generateBlock(ui.helper, $(this)) );
  clearFit();
  
  if(grid.isComplete()){
    enableShowCode();
  }
}


var keyTouchHandler = function(event){
  var block = new Models.Block();
  var size = block.sizeFromElement($(this).attr('class'));
  
  block.width = size.width;
  block.height = size.height;
  
  grid.add( block );
  
  if(grid.isComplete()){
    enableShowCode();
  }
}


var generateBlock = function(draggedBlock, unit){
  var block = new Models.Block();
  var size = block.sizeFromElement(draggedBlock.attr('class'))
  var position = block.positionFromElement(unit.attr('class'));
  
  block.width = size.width;
  block.height = size.height;
  block.x = position.x;
  block.y = position.y;
  
  return block;
}





var enableShowCode = function(){
  $('#showCode').attr('disabled', false);
}

var disableShowCode = function(){
  $('#showCode').attr('disabled', true);
}

var enableReset = function(){

}

var disableReset = function(){

}

var showCodeBox = function(){
  $('#codeText').val( template( $('#workingGrid').html() ) );
  $('#codeBox').fadeIn('fast');
}

var hideCodeBox = function(){
  $('#codeBox').fadeOut('fast', function(){
    $('#codeText').val( '' );
  });
}







var template = function(yield){
  return '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "/web/20130726030416/http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n\
<html xmlns="/web/20130726030416/http://www.w3.org/1999/xhtml">\n\
<head>\n\
\n\
<style type="text/css">\n\
  \n\
  /* Main Containers */\n\
\n\
  body {\n\
  	margin: 0;\n\
  	}\n\
                                      \n\
  #wrapper {                          \n\
    width: 960px;                     \n\
    }                                 \n\
                                      \n\
  #grid {                             \n\
  	float: left;                      \n\
  	width: 960px;                     \n\
  	margin: 0;                        \n\
  	padding: 0;                       \n\
  	background: white;                \n\
  	}                                 \n\
                                      \n\
  .block {                            \n\
    position: absolute;               \n\
    border: 1px solid black;          \n\
    }                                 \n\
                                      \n\
  .inner {                            \n\
    height: 100%;                     \n\
    width: 100%;                      \n\
    }                                 \n\
                                      \n\
  .s1x1 {                             \n\
    height: 240px;                    \n\
    width: 240px;                     \n\
    }                                 \n\
                                      \n\
  .s2x1 {                             \n\
    height: 240px;                    \n\
    width: 480px;                     \n\
    }                                 \n\
                                      \n\
  .s3x1 {                             \n\
    height: 240px;                    \n\
    width: 720px;                     \n\
    }                                 \n\
                                      \n\
  .s4x1 {                             \n\
    height: 240px;                    \n\
    width: 960px;                     \n\
    }                                 \n\
                                      \n\
  .s1x2 {                             \n\
    height: 480px;                    \n\
    width: 240px;                     \n\
    }                                 \n\
                                      \n\
  .s2x2 {                             \n\
    height: 480px;                    \n\
    width: 480px;                     \n\
    }                                 \n\
                                      \n\
  .s3x2 {                             \n\
    height: 480px;                    \n\
    width: 720px;                     \n\
    }                                 \n\
                                      \n\
  .s4x2 {                             \n\
    height: 480px;                    \n\
    width: 960px;                     \n\
    }                                 \n\
                                      \n\
  .s1x3 {                             \n\
    height: 720px;                    \n\
    width: 240px;                     \n\
    }                                 \n\
                                      \n\
  .s2x3 {                             \n\
    height: 720px;                    \n\
    width: 480px;                     \n\
    }                                 \n\
                                      \n\
  .s3x3 {                             \n\
    height: 720px;                    \n\
    width: 720px;                     \n\
    }                                 \n\
                                      \n\
  .s4x3 {                             \n\
    height: 720px;                    \n\
    width: 960px;                     \n\
    }                                 \n\
                                      \n\
                                      \n\
  /* Blocks Position */               \n\
                                      \n\
  .p0x0 {                             \n\
    top: 0px;                         \n\
    left: 0px;                        \n\
    }                                 \n\
                                      \n\
  .p1x1 {                             \n\
    top: 0px;                         \n\
    left: 240px;                      \n\
    }                                 \n\
                                      \n\
  .p2x0 {                             \n\
    top: 0px;                         \n\
    left: 480px;                      \n\
    }                                 \n\
                                      \n\
  .p3x0 {                             \n\
    top: 0px;                         \n\
    left: 720px;                      \n\
    }                                 \n\
                                      \n\
  .p0x1 {                             \n\
    top: 240px;                       \n\
    left: 0px;                        \n\
    }                                 \n\
                                      \n\
  .p1x0 {                             \n\
    top: 0;                           \n\
    left: 240px;                      \n\
    }                                 \n\
                                      \n\
  .p1x1 {                             \n\
    top: 240px;                       \n\
    left: 240px;                      \n\
    }                                 \n\
                                      \n\
  .p2x1 {                             \n\
    top: 240px;                       \n\
    left: 480px;                      \n\
    }                                 \n\
                                      \n\
  .p3x1 {                             \n\
    top: 240px;                       \n\
    left: 720px;                      \n\
    }                                 \n\
                                      \n\
                                      \n\
  .p0x2 {                             \n\
    top: 480px;                       \n\
    left: 0px;                        \n\
    }                                 \n\
                                      \n\
  .p1x2 {                             \n\
    top: 480px;                       \n\
    left: 240px;                      \n\
     }                                \n\
                                      \n\
  .p2x2 {                             \n\
    top: 480px;                       \n\
    left: 480px;                      \n\
     }                                \n\
                                      \n\
  .p3x2 {                             \n\
    top: 480px;                       \n\
    left: 720px;                      \n\
    }                                 \n\
                                      \n\
                                      \n\
  .creditline {                       \n\
    position: absolute;               \n\
    top: 750px;                       \n\
    left: 10px;                       \n\
    font-family: Helvetica, sans-serif;\n\
    font-size: 13px;                  \n\
    color: gray;                      \n\
  }                                   \n\
                                      \n\
</style>                              \n\
\n\
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />\n\
<title>Tatami</title\n\
<link href="grids.css" rel="stylesheet" type="text/css" />\n\
<style type="text/css">\n\
</style></head>\n\
\n\
<body>\n\
\n\
<div id="wrapper">\n\
  <div id="grid">\n\
' + yield + '\n\
  </div>\n\
</div>\n\
\n\
<span class="creditline">Grid Builder by Dubberly Design Office</span>\n\
\n\
</body>\n\
</html>'
}

}).call(this);

