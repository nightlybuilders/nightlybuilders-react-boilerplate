# STATIC

Put static files, like favicons, fonts or images, into this folder. Webpack will
automatically copy them into the `dist/static` folder and the server will take
care of delivering them to the client.

Statics are available by accessing http://localhost:8000/__static__/1532637417672/main.styles.css
for instance.

## How to add new static files

Just copy them into one of the folders (eg. `images`) and rebuild the `dist` folder.
This can be achieved by either restarting `npm run watch:client` or any other build
task (eg. `npm run build`).