const app = require('./common.server');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.dev');
const path = require('path');

const port = 8000;

const compiler = webpack(config);
const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '/../dist/index.html')));
    res.end();
});

app.listen(port, 'localhost', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('=== Dev-server startet på http://localhost:%s/', port);
});
