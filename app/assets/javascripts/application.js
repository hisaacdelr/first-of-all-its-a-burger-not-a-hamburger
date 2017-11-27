/* eslint-disable */

// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery-ui
//= require rails-ujs
//= require turbolinks
//= require_tree .

$(document).ready(function () {
  $(function () {
    $(".draggable").draggable();
  });
  var setZIndexByArrayIndex = function setZIndexByArrayIndex(array) {
    for (var _i = 0; _i < array.length; _i++) {
      $(array[_i]).css({ 'z-index': '' + _i });
    }
  };
  // creates a real array for draggables
  var dragArray = [];
  for (var _i2 = 0; _i2 < $('.draggable').length; _i2++) {
    dragElement = $(".draggable")[_i2];
    dragArray.push(dragElement);
    setZIndexByArrayIndex(dragArray);
  };

  collectPositions();

  $('.draggable').on('click', function () {
    // look for it in dragArray
    var current = this;
    for (var _i3 = 0; _i3 < dragArray.length; _i3++) {
      if (dragArray[_i3] === current) {
        var splicedIt = dragArray.splice(_i3, 1);
        dragArray.push(splicedIt[0]);
        setZIndexByArrayIndex(dragArray);
      }
    };
    collectPositions();
  });

  // $('#mood_button').click(function(e) {
  //   console.log('you clicked the save mood button');
  //   saveMood();
  // });

  $('body').on('submit', '#mood_form', function(e) {
    e.preventDefault();
    console.log('you clicked the save mood button');
    const moodItems = collectPositions();
    const trueData = {items: {}};
    for(i = 0; i < moodItems.length; i++){
      trueData['items'][`item${i}`] = {
        item_name: moodItems[i].alt,
        left_coord: moodItems[i].left,
        top_coord: moodItems[i].top
      };
    };

    const url  = '/moods';
    console.log('inside saveMood');
    const data = {msg: 'wow'};
    $.ajax({
      type: "POST",
      url: '/moods',
      data: trueData
    });
  });

});

var collectPositions = function collectPositions() {
  var mood = $('#mood-container');
  mood.top = 100;
  mood.bottom = 500;
  mood.left = 0;
  mood.right = 400;
  var draggables = $('.draggable');
  var moodItems = [];
  for (i = 0; i < draggables.length; i++) {
    var item = draggables[i];
    item.left = item.style.left;
    var leftEnd = item.left.length - 2;
    item.left = parseFloat(item.left.substring(0, leftEnd));
    item.top = item.style.top;
    var topEnd = item.top.length - 2;
    item.top = parseFloat(item.top.substring(0, topEnd));
    item.zIndex = item.style.zIndex;
    if (item.top <= mood.bottom && item.top >= mood.top && item.left <= mood.right) {
      moodItems.push(draggables[i]);
    }
  }
  console.log('there are ' + moodItems.length + ' items in the container');
  console.log(moodItems);
  return moodItems;
};

// $('body').on('submit', 'form', function(e) {
//   e.preventDefault();
//   moodItems = collectPositions();
//   const url = $(this).attr('action');
//   // const formData = $(this).seralize();
//   const formData = moodItems;
//
//   $.post(url, formData, (response) => {
//     console.log(response);
//   });
//
//
// });
//
// $('body').on('submit', 'form', function(e) {
//   // saveMood();
//   console.log('saving mood');
// });

$('#mood_button').click(function(e) {
  console.log('you clicked the save mood button');
});

const saveMood = function saveMood() {
  const moodItems = collectPositions();
  const url  = '/moods'
  console.log('inside saveMood');
  const data = {msg: 'wow'};
  $.ajax({
    type: "POST",
    url: '/moods',
    data: data
  });
  // $.post(url, {msg: 'wow'}, (response) => {
  //   console.log(response);
  //   console.log('did it work');
  // });
};
