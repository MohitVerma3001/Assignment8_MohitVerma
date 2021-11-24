$(function(){
  $.getJSON("books.json").done(function(data){
    let $tableBody = $('<tbody id="test"></tbody>');
    let a1 = [];
    let a2 = [];    
    $.each(data.bk, function(index, value){     
      let $row = $('<tr></tr>');
      $row.append($('<td class="name"></td>').text(value.BookName));
      $row.append($('<td></td>').text(value.Writer));
      $row.append($('<td></td>').text(value.PublishingDate));
      $row.append($('<td></td>').text(value.Rating)); 
      $tableBody.append($row);
      
      if(data.bk[index].name.charAt(0) != 'S') {
        a1.push(data.bk[index]);
      } else {
        a2.push(data.bk[index]);
      }
    });

    $('thead').after($tableBody);

    let tagged1 = [];
    let $tds = $('.name');
    $.each($tds, function( index, value ) {
      tagged1.push({
        element: this,
        text: $tds[index].innerText.trim().toLowerCase()
      });
    });

    $('#but1').append(`A-M (${a1.length})`).addClass('active').click(function () {
      $(this).addClass('active').siblings().removeClass('active');
      $('td').hide();
        tagged1.forEach(function (td) {
          if ($(td.element).text().charAt(0) != 'S'){
            $(td.element).show();
            $(td.element).siblings().show();
          }
        });
    });

    $('#but2').append(`N-Z (${a2.length})`).addClass('active').click(function () {
      $(this).addClass('active').siblings().removeClass('active');
      $('td').hide();
      tagged1.forEach(function (td) {
        if ($(td.element).text().charAt(0) == 'S'){
          $(td.element).show();
          $(td.element).siblings().show();
        }
      });
    });

    let $search = $('#search');
    let cache = [];
    
    $.each($tds, function( index, value ) {
      cache.push({
        element: this,
        text: $tds[index].innerText.trim().toLowerCase()
      });
     

    });

  
    function book_filter() {
      let query = this.value.trim().toLowerCase();
      
      if(query) {
        cache.forEach(function (td) {
          let index = 0;
          index = td.text.indexOf(query);
          // td.element.style.backgroundColor = index === -1 ? '' : 'yellow';
          // console.log("d", $(td.element).parent());
          if(index === -1){ 
            $(td.element).siblings().css("background-color", "") 
            $(td.element).css("background-color", "")   
          } else {
            $(td.element).siblings().css("background-color", "yellow")
            $(td.element).css("background-color", "yellow")
          } 
        });
      } 
      if(!query) {
        cache.forEach(function(td){
          td.element.style.backgroundColor = "";
          $(td.element).siblings().css("background-color", "")
        });

      }

    }
  
    if('oninput' in $search[0]) {
      $search.on('input', book_filter);
    } else {
     $search.on('keyup', book_filter);
    }

  

  });


});