$(document).ready(function(){

    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){

        var spot = 0;
        var people = data.mu;
        var timeoutID = window.setTimeout(nextPerson, 15000);

        $('.name').text('Name: ' + people[spot].name);
        $('.git-name').text('Github Username: ');
        $('.git-name').append('<a class="git-link" href="https://github.com/' + people[spot].git_username + '">' + people[spot].git_username + '</a>');
        $('.shout').text('Shoutout: ' + people[spot].shoutout);

        for (var i = 0; i < people.length; i++) {

          $('.index-spot').append('<div class="box person' + i + '"></div>');
          $('.person'+ i).data('index', i);

        }

        changeBox();

        $('.next').on('click', nextPerson);

        $('.prev').on('click', prevPerson);

        $('main').on('click', '.box', boxClick);

        function nextPerson() {

          window.clearTimeout(timeoutID);

          changeBox();

          if(spot == people.length - 1){
            spot = 0;
          } else {
            spot++;
          }

          changeName(people[spot]);

          changeBox();

          timeoutID = window.setTimeout(nextPerson, 15000);

        }

        function prevPerson() {

          window.clearTimeout(timeoutID);

          changeBox();

          if(spot == 0){
            spot = people.length - 1;
          } else {
            spot--;
          }

          changeName(people[spot]);

          changeBox();

          timeoutID = window.setTimeout(nextPerson, 15000);

        }

        function boxClick(){

          window.clearTimeout(timeoutID);

          changeBox();

          spot = $(this).data('index');

          changeName(people[spot]);

          changeBox();

          timeoutID = window.setTimeout(nextPerson, 15000);

        }

        function changeName(person) {

          $('.name').fadeOut('fast', function(){
          $('.name').text('Name: ' + person.name);
          });
          $('.name').fadeIn('slow');

          $('.git-name').fadeOut('fast', function(){
          $('.git-name').text('Github Username: ');
          $('.git-name').append('<a class="git-link" href="https://github.com/' + person.git_username + '">' + people[spot].git_username + '</a>');
          });
          $('.git-name').fadeIn('slow');

          $('.shout').fadeOut('fast', function(){
          $('.shout').text('Shoutout: ' + person.shoutout);
          });
          $('.shout').fadeIn('slow');

        }

        function changeBox(){

            $('.person' + spot).toggleClass('red');

        }

      }
    });
});
