$(function () {
  $.getJSON("samaan.json").done(function (data) {
    let $tableBody = $('<tbody id="test"></tbody>');
    let arr1 = [];
    let arr2 = [];
    $.each(data, function (i, item) {
      let $row = $("<tr></tr>");
      $row.append($('<td class="name"></td>').text(item["title"]));
      $row.append($("<td></td>").text(item["author"]));
      $row.append($("<td></td>").text(item["year_written"]));
      $row.append($("<td></td>").text(item["price"]));
      $tableBody.append($row);

      if (item["title"].charAt(0) != "S") {
        arr1.push(item);
      } else {
        arr2.push(item);
      }
    });

    $("thead").after($tableBody);

    let tagged1 = [];
    let $tds = $(".name");
    $.each($tds, function (index, value) {
      tagged1.push({
        element: this,
        text: $tds[index].innerText.trim().toLowerCase(),
      });
    });

    $("#button1")
      .append(`A-M (${arr1.length})`)
      .addClass("active")
      .click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $("td").hide();
        tagged1.forEach(function (td) {
          if ($(td.element).text().charAt(0) != "S") {
            $(td.element).show();
            $(td.element).siblings().show();
          }
        });
      });

    $("#button2")
      .append(`N-Z (${arr2.length})`)
      .addClass("active")
      .click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $("td").hide();
        tagged1.forEach(function (td) {
          if ($(td.element).text().charAt(0) == "S") {
            $(td.element).show();
            $(td.element).siblings().show();
          }
        });
      });

    let $search = $("#filter-search");
    let cache = [];

    $.each($tds, function (index, value) {
      cache.push({
        element: this,
        text: $tds[index].innerText.trim().toLowerCase(),
      });
    });

    function live_search() {
      let query = this.value.trim().toLowerCase();

      if (query) {
        cache.forEach(function (td) {
          let index = 0;
          index = td.text.indexOf(query);

          if (index === -1) {
            $(td.element).siblings().css("background-color", "");
            $(td.element).css("background-color", "");
          } else {
            $(td.element).siblings().css("background-color", "yellow");
            $(td.element).css("background-color", "yellow");
          }
        });
      }
      if (!query) {
        cache.forEach(function (td) {
          td.element.style.backgroundColor = "";
          $(td.element).siblings().css("background-color", "");
        });
      }
    }

    if ("oninput" in $search[0]) {
      $search.on("input", live_search);
    } else {
      $search.on("keyup", live_search);
    }
  });
});
