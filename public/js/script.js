$(document).ready(function () {
  console.log('good to go')

  $('#profile').click(function(e) {
    e.preventDefault();
    window.location = '/profile'
  })

  $('#viewSaleAsset').click(function(e) {
    e.preventDefault();
    window.location = '/transactions/checkBids'
  })

  $('#gotMoney').click(function(e) {
    e.preventDefault();
    window.location = '/transactions'
  })

  $('#offSale').click(function(e) {
    e.preventDefault();
    var formdata = $('.editAssetsform').serializeArray()
    // var teamElement = $('.editUser');
    // var teamUrl = teamElement.attr('href');

    // console.log(teamElement)
    // // console.log('i am teamurl ' + teamUrl)
    // console.log($('#profession').val())
    // console.log($('#Name').val())
    console.log(formdata);
    console.log(window.location.href)
    $.ajax({
      method: 'delete',
      url: '/transactions/delete',
      data: formdata
    }).done(function(data) {
      // get data returned from the PUT route
      console.log(data);
      // do stuff when the PUT action is complete
      // teamElement.remove();
      window.location = '/profile'
      // or, you can redirect to another page
    });
  })


  $('#putOnSale').click(function(e) {
    e.preventDefault();
    var formdata = $('.editAssetsform').serializeArray()
    // var teamElement = $('.editUser');
    // var teamUrl = teamElement.attr('href');

    // console.log(teamElement)
    // // console.log('i am teamurl ' + teamUrl)
    // console.log($('#profession').val())
    // console.log($('#Name').val())
    console.log(formdata);
    $.ajax({
      method: 'post',
      url: '/transactions/add',
      data: formdata
    }).done(function(sellPrice) {
      // get data returned from the PUT route
      // do stuff when the PUT action is complete
      // if(err.responseText === 'showAlert')
      if (Number(sellPrice)<1)
          alert('have some pride.. at least be cheap..not free. Go change price' )
      // teamElement.remove();
      window.location = '/profile'
  })
})

  $('#editUser').click(function(e) {
    e.preventDefault();
    window.location = '/edit'
  })

  $('#addAsset').click(function(e) {
    e.preventDefault();
    window.location = '/assets/add'
  })


  $('#modifyUser').click(function(e) {
    e.preventDefault();
    // alert('am here at modify')
    var formdata = $('.editUser').serializeArray()
    // var teamElement = $('.editUser');
    // var teamUrl = teamElement.attr('href');

    // console.log(teamElement)
    // console.log('i am teamurl ' + teamUrl)
    console.log($('#profession').val())
    console.log($('#Name').val())
    console.log(formdata);
    $.ajax({
      method: 'put',
      url: '/edit',
      data: formdata
    }).done(function(data) {
      // get data returned from the PUT route
      console.log(data);
      // do stuff when the PUT action is complete
      // teamElement.remove();
      window.location = '/profile'
      // or, you can redirect to another page
    });
  });

})

  $('#deleteAsset').click(function(e) {
    e.preventDefault();
    var formdata = $('.editAssetsform').serializeArray()
    // var teamElement = $('.editUser');
    // var teamUrl = teamElement.attr('href');

    // console.log(teamElement)
    // // console.log('i am teamurl ' + teamUrl)
    // console.log($('#profession').val())
    // console.log($('#Name').val())
    console.log(formdata);
    console.log(window.location.href)
    $.ajax({
      method: 'delete',
      url: window.location.href,
      data: formdata
    }).done(function(data) {
      // get data returned from the PUT route
      console.log(data);

      // do stuff when the PUT action is complete
      // teamElement.remove();
      window.location = '/profile'
      // or, you can redirect to another page
    });
  });


  $('#editAsset').click(function(e) {
    e.preventDefault();
    var formdata = $('.editAssetsform').serializeArray()
    // var teamElement = $('.editUser');
    // var teamUrl = teamElement.attr('href');

    // console.log(teamElement)
    // // console.log('i am teamurl ' + teamUrl)
    // console.log($('#profession').val())
    // console.log($('#Name').val())
    console.log(formdata);
    console.log(window.location.href)
    $.ajax({
      method: 'put',
      url: window.location.href,
      data: formdata
    }).done(function(data) {
      // get data returned from the PUT route
      console.log(data);
      // do stuff when the PUT action is complete
      // teamElement.remove();
      window.location = '/profile'
      // or, you can redirect to another page
    });
  });
//
//
//
// })


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
