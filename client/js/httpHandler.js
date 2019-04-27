(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: (res) => {
        // reload the page
        console.log(res)
        // window.location = window.location.href;
        serverImage(res)
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

  $('#random').click(function(e){
    ajaxRandomMoveCall();
  });

  $('#sendserver').click(function(e){
    sendServerMove();
  });

  const ajaxRandomMoveCall = () => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: (res) => {
        // reload the page
        console.log('Got response: ' + res);
        SwimTeam.move(res);
      }
    });
  };

  const serverSwim = () => {
    $.ajax({
      type: 'GET',
      url: `${serverUrl}/swim`,
      cache: false,
      contentType: false,
      processData: false,
      success: (res) => {
        // reload the page
        SwimTeam.move(res.toLowerCase());
        console.log('Got server response: ' + res);
      }
    });
  };

  window.serverSwim = serverSwim;
  

  const serverImage = (filepath) => {
    $.ajax({
      type: 'GET',
      url: `${serverUrl}/filepathname`,
      cache: false,
      contentType: false,
      processData: false,
      data: filepath,
      success: (res) => {
        // reload the page
        // SwimTeam.move(res.toLowerCase());
        var backgroundHTML = `<div><img src=${res}/></div>`
        $('.background').append(backgroundHTML);
        console.log(res);
        console.log('Got image from server!');
      }
    });
  };
})();

//style="background-image: