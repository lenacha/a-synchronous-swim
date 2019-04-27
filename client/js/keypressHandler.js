
$('body').on('keydown', (event) => {
  var arrowPress = event.key.match(/Arrow(Up|Down|Left|Right)/);
  if (arrowPress) {
    var direction = arrowPress[1];

    serverSwim(direction);
  }
});

const sendServerMove = (keystroke) => {
  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:3000/',
    data: keystroke,
    contentType: 'application/json',
    success: (res) => {
      // reload the page
      console.log('Got response 1: ' + res);
      // SwimTeam.move(res);
    },
    error: () => {
      console.log('error')
    }
  });
};

console.log('Client is running in the browser!');
