$(document).on(`mousemove`, function (e) {
    $(`#terminal-3`).text(`x: ${e.pageX} y: ${e.pageX}`);
});


var timerId = setInterval(function() {
    $(`#terminal-2`).text(new Date().toISOString());
}, 500);


var droppableOptions = {
  drop: function(event, ui) {
    if ($(ui.draggable).hasClass("node")) {
    $(this).find("svg").remove()
      $(ui.draggable).addClass("drop")
      $(ui.draggable).offset({
        top: $(this).offset().top,
        left: $(this).offset().left
      })
    }
  }
}



$(document).ready(function() {
    var max_col=10;
    var max_row=6;
	
    var e_rung = $(`<div class="rung"></div>`);
    $("body").append(e_rung);
    for (var row = 0; row < max_row; row++) {
        var e_row = $(`<div id="row-${row}"></div>`);
        e_rung.append(e_row);
        e_row.width(max_col*60+max_col*20+20);
        for (var col = 0; col < max_col; col++) {
            var e_branch = $(`<div></div>`);
            if (col == 0) { 
                e_branch.addClass(`grid-branch-start`);
            } else {
                e_branch.addClass(`grid-branch`);
            };
            e_row.append(e_branch);
            
            var e_node = $(`<div class="grid-node"></div>`);
            e_row.append(e_node);
            $(e_node).droppable(droppableOptions);
        };
    var e_branch_end = $(`<div class="grid-branch-end"></div>`);
    e_row.append(e_branch_end);
        
    $(`.grid-branch-start`).append(`<svg><line x1="10" y1="0" x2="10" y2="80"/></svg>`);
    $(`.grid-branch-start`).data("branch", 0);
    $(`.grid-branch-end`).append(`<svg><line x1="10" y1="0" x2="10" y2="80"/></svg>`);   
    $(`.grid-branch-end`).data("branch", 0);
    $(`.grid-branch`).append(`<svg></svg>`);     
    $(`.grid-branch`).data("branch", 0);
        
  };
});


$(document).on(`click`,`.grid-branch-start`, function() {
    var arr = [`<svg><line x1="10" y1="0" x2="10" y2="80"/></svg>`,
               `<svg><line x1="10" y1="0" x2="10" y2="80"/><line x1="10" y1="40" x2="20" y2="40"/></svg>`
		      ];
    if ($(this).data(`branch`) >= 0) {
        var branch = $(this).data(`branch`)
        branch = branch + 1
        if (branch >= arr.length) {
    	   branch = 0
        }
        $(this).find(`svg`).remove()
        $(this).append(arr[branch])
        $(this).data(`branch`, branch)
    }
});

$(document).on(`click`,`.grid-branch-end`, function() {
    var arr = [`<svg><line x1="10" y1="0" x2="10" y2="80"/></svg>`,
               `<svg><line x1="10" y1="0" x2="10" y2="80"/><line x1="0" y1="40" x2="10" y2="40"/></svg>`
		      ];
    if ($(this).data(`branch`) >= 0) {
        var branch = $(this).data(`branch`)
        branch = branch + 1
        if (branch >= arr.length) {
    	   branch = 0
        }
        $(this).find(`svg`).remove()
        $(this).append(arr[branch])
        $(this).data(`branch`, branch)
    }
});

$(document).on(`click`,`.grid-branch`, function() {
    var arr = [`<svg></svg>`,   
                `<svg><line x1="0" y1="40" x2="20" y2="40"/></svg>`,
                `<svg><line x1="10" y1="0" x2="10" y2="80"/></svg>`,
                `<svg><line x1="10" y1="0" x2="10" y2="40"/><line x1="10" y1="40" x2="20" y2="40"/></svg>`,
                `<svg><line x1="0" y1="40" x2="10" y2="40"/><line x1="10" y1="40" x2="10" y2="0"/></svg>`,
                `<svg><line x1="0" y1="40" x2="20" y2="40"/><line x1="10" y1="40" x2="10" y2="80"/></svg>`,
                `<svg><line x1="0" y1="40" x2="20" y2="40"/><line x1="10" y1="0" x2="10" y2="40"/></svg>`,
                `<svg><line x1="10" y1="0" x2="10" y2="80"/><line x1="0" y1="40" x2="20" y2="40"/></svg>`,
                `<svg><line x1="10" y1="0" x2="10" y2="80"/><line x1="10" y1="40" x2="20" y2="40"/></svg>`,
                `<svg><line x1="10" y1="0" x2="10" y2="80"/><line x1="0" y1="40" x2="10" y2="40"/></svg>`
		      ];
    if ($(this).data(`branch`) >= 0) {
        var branch = $(this).data(`branch`)
        branch = branch + 1
        if (branch >= arr.length) {
    	   branch = 0
        }
        $(this).find(`svg`).remove()
        $(this).append(arr[branch])
        $(this).data(`branch`, branch)
    }
});



$(document).on(`click`,`#new-node`, function() {
    
    
    var e_node = $(`<div class="node"></div>`);
    
    e_node.data(`type`, $(`#type`).val());
    e_node.data(`address`, $(`#address`).val());
    e_node.data(`symbol`, $(`#symbol`).val());
    e_node.data(`comment`, $(`#comment`).val());

    $(`#type`).val(``)
    $(`#address`).val(``)
    $(`#symbol`).val(``)
    $(`#comment`).val(``)
    
    e_node.append(`<div class="node-name">${e_node.data("address")}</div>`)
    e_node.append(`<div class="node-svg">svg</div>`)
    e_node.append(`<div class="node-add">${e_node.data("type")}</div>`)

    $(`body`).append(e_node);
    e_node.draggable({cursor:`move`, stack: `.node`})
    
});


$(document).on(`click`, `.node-name`, function () {
    
    var e_note = $(`<div class="note">${$(this).parent().data("comment").replace(/(?:\r\n|\r|\n)/g, `<br>`)}</div>`);
    e_note.draggable({cursor:`move`, stack: `.node`,
                      start: function(event, ui){
                          ui.helper.parent().css(`z-index`, 10)}
    });
    if (!$(this).parent().find(`.note`).length) {
        $(this).parent().append(e_note); 
    };  
});


$(document).on(`dblclick`, `.note`, function () {
    $(this).remove();
});



 $(document).on(`click`, `.grid-node`, function () {
     if ($(this).find(`svg`).length) {
         $(this).find(`svg`).remove();
         $(this).data(`branch`, 0);
     } else {
         $(this).append(`<svg><line x1="0" y1="40" x2="60" y2="40"/></svg>`);
         $(this).data(`branch`, 1);
     };
});


