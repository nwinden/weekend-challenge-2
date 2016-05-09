$(document).ready(function(){

    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        //a variable for the current index for the array
        var spot = 0;
        //shorthand for the JSON array
        var people = data.mu;
        //changes the current data being presented every 10 seconds
        var timeoutID = window.setTimeout(changePerson, 10000);

        //changes the P tags on the dom to display the first information on the array
        $('.name').text('Name: ' + people[spot].name);
        $('.git-name').text('Github Username: ');
        $('.git-name').append('<a class="git-link" href="https://github.com/' + people[spot].git_username + '">' + people[spot].git_username + '</a>');
        $('.shout').text('Shoutout: ' + people[spot].shoutout);

        //gives the next and previous buttons data values to change the index respectively
        $('.next').data('change',1);
        $('.prev').data('change',-1);

        //adds as many squares as there are items in the array to the DOM
        for (var i = 0; i < people.length; i++) {

          $('.index-spot').append('<div class="box person' + i + '"></div>');
          $('.person'+ i).data('index', i);

        }

        //toggles a class that turns the square red
        changeBox();

        //the listeners to change the information
        $('.next').on('click', changePerson);

        $('.prev').on('click', changePerson);

        $('body').on('click', '.box', boxClick);

        //changes the person to the next or previous person in the array
        function changePerson() {

          //cancels the timer to automatically change to the next person
          window.clearTimeout(timeoutID);

          //toggles the red class off the current box
          changeBox();

          //the variable that will ether add or subtract from the current spot
          var change;

          //if the timer function goes off, sets the change to 1 automatically or sets it depending to the button clicked
          if ($(this).data('change') == undefined){
            change = 1;
          } else {
            change = $(this).data('change');
          }

          //changes spot index to what the change is set to
          spot += change;

          // if spot goes beyond the end or the beginning of the array it switches respectively
          if (spot < 0){
            spot = people.length - 1;
          } else if(spot > people.length - 1){
            spot = 0;
          }

          //changes to the person at the new spot index onto the dom
          changeName(people[spot]);

          //toggles the red class to the new box index
          changeBox();

          //starts a new timer
          timeoutID = window.setTimeout(changePerson, 10000);

        }

        //changes to the array position to the corresponding box
        function boxClick(){

          //cancels the timer
          window.clearTimeout(timeoutID);

          //toggles off the current box at the corresponding index
          changeBox();

          //finds what index spot should be now
          spot = $(this).data('index');

          //changes to the person at the new spot index onto the dom
          changeName(people[spot]);

          //toggles the red class to the new box index
          changeBox();

          //stats a new timer
          timeoutID = window.setTimeout(changePerson, 10000);

        }

        //the function that changes the elements in the DOM
        function changeName(person) {

          //changes the name on the DOM with a fade function
          $('.name').fadeOut('fast', function(){
          $('.name').text('Name: ' + person.name);
          });
          $('.name').fadeIn('slow');

          //changes the git username on the DOM with a fade function
          $('.git-name').fadeOut('fast', function(){
          $('.git-name').text('Github Username: ');
          $('.git-name').append('<a class="git-link" href="https://github.com/' + person.git_username + '">' + people[spot].git_username + '</a>');
          });
          $('.git-name').fadeIn('slow');

          //changes the shout out on the DOM with a fade function
          $('.shout').fadeOut('fast', function(){
          $('.shout').text('Shoutout: ' + person.shoutout);
          });
          $('.shout').fadeIn('slow');

        }

        //function that toggles the class on a specific div
        function changeBox(){

            $('.person' + spot).toggleClass('red');

        }

      }
    });
});
