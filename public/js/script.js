$(document).ready(function () {
  console.log('good to go')



  $('#modifyUser').click(function(e) {
    e.preventDefault();
    alert('am here at modify')
    var formdata = $('.editUser').serializeArray()
    var teamElement = $('.editUser');
    // var teamUrl = teamElement.attr('href');

    console.log(teamElement)
    // console.log('i am teamurl ' + teamUrl)
    console.log($('#profession').val())
    console.log($('#Name').val())
    console.log(formdata);
    $.ajax({
      method: 'put',
      url: '/users/:id',
      data: formdata
    }).done(function(data) {
      // get data returned from the PUT route
      console.log(data);
      alert(data)
      // do stuff when the PUT action is complete
      teamElement.remove();
      window.location = '/users'
      // or, you can redirect to another page
    });
  });

  $('#deleteUser').click(function(e) {
    e.preventDefault();
    alert('am here at delete')
    var formdata = $('.editUser').serializeArray()
    var teamElement = $('.editUser');
    // var teamUrl = teamElement.attr('href');

    console.log(teamElement)
    // console.log('i am teamurl ' + teamUrl)
    console.log($('#profession').val())
    console.log($('#Name').val())
    console.log(formdata);
    $.ajax({
      method: 'delete',
      url: '/users/:id',
      data: formdata
    }).done(function(data) {
      // get data returned from the PUT route
      console.log(data);
      alert(data)
      // do stuff when the PUT action is complete
      teamElement.remove();
      window.location = '/users'
      // or, you can redirect to another page
    });
  });



})


// original working scripts
  // $('.editUser').on('submit', function(e) {
  //   e.preventDefault();
  //   alert('am here')
  //   var formdata = $(this).serializeArray()
  //   var teamElement = $(this);
  //   var teamUrl = teamElement.attr('href');
  //   // var teamData = teamElement.serialize();
  //   // console.log(teamData);S
  //   console.log(teamElement)
  //   console.log('i am teamurl ' + teamUrl)
  //   console.log($('#profession').val())
  //   console.log($('#Name').val())
  //   console.log(formdata);
  //   $.ajax({
  //     method: 'delete',
  //     url: teamUrl,
  //     data: formdata
  //   }).done(function(data) {
  //     // get data returned from the PUT route
  //     console.log(data);
  //     alert(data)
  //     // do stuff when the PUT action is complete
  //     teamElement.remove();
  //     // window.location = '/users'
  //     // or, you can redirect to another page
  //   });
  // });
