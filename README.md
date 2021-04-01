## Installation

Simply `npm install tracer`.


## Usage

```javascript
// Import library
const tracer = require('tracer');

// By default, event message is output as text on the console for all default
// levels (fatal, error, warning, info, debug, trace and access).
// See "configuration" section to change it.

// The log event, you can use the log() function:
// tracer.log(level, message, [metadata])
tracer.log('info', 'application started');
tracer.log('access', 'GET /article/157', { ip: '127.0.0.1' });

// There are also shortcuts for the default log levels.
// Metadata is facultative too.
tracer.fatal('message', { foo: 'bar' });
tracer.error('message', { foo: 'bar' });
tracer.warn('message', { foo: 'bar' });
tracer.info('message', { foo: 'bar' });
tracer.debug('message', { foo: 'bar' });
tracer.trace('message', { foo: 'bar' });
tracer.access('message', { foo: 'bar' });
```


## Configuration

```javascript
const tracer = require('tracer');

tracer.loggers.clear(); // to remove defautl loggers
tracer.loggers.add({
    levels: ['fatal', 'error'],
    type: 'console',
    format: 'text',
});
tracer.loggers.add({
    levels: ['fatal', 'error', 'warning', 'info', 'debug', 'trace'],
    type: 'file',
    format: 'json.raw',
    path: 'application.log',
});

// or in one go:

tracer.loggers.set([{
    levels: ['fatal', 'error'],
    type: 'console',
    format: 'text',
}, {
    levels: ['fatal', 'error', 'warning', 'info', 'debug', 'trace'],
    type: 'file',
    format: 'json.raw',
    path: 'application.log',
}]);
```


## Formats

* `text`: outputs each event message as a text line (metadata is ingored for this format)
* `json.raw`: outputs each event as a JSON string, one event per line (and thus, without indentation)
* `json.pretty`: outputs each event as a JSON string with indentation and line breaks


## Test

* To launch tests, just run `npm run test`.
* To gather coverage data, run `npm run coverage`.
  Coverage reports are in the `coverage` directory.


## Contribute

See [doc/contributing.md](doc/contributing.md)
