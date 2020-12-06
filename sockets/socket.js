const { io } = require('../index');

// Socket Messages
io.on('connection', client => {
    console.log('client connected');

    client.on('disconnect', () => {
        console.log('client disconnected')
    });

    // client.on('message', data => {
    //     console.log(data);
    //     io.emit( 'message', {admin: 'nuevo mensaje'} );
    // })
});