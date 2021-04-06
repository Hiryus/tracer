const fs = require('fs');
const tracer = require('..');

const spy = {
    fs: {
        mkdir: jest.spyOn(fs, 'mkdir')
            .mockImplementation((path, opts, callback) => callback())
            .mockName('fs.mkdir'),
        appendFile: jest.spyOn(fs, 'appendFile')
            .mockImplementation()
            .mockName('fse.appendFile'),
    },
    console: {
        log: jest.spyOn(console, 'log')
            .mockImplementation()
            .mockName('console.log'),
        debug: jest.spyOn(console, 'debug')
            .mockImplementation()
            .mockName('console.debug'),
        info: jest.spyOn(console, 'info')
            .mockImplementation()
            .mockName('console.info'),
        warn: jest.spyOn(console, 'warn')
            .mockImplementation()
            .mockName('console.warn'),
        error: jest.spyOn(console, 'error')
            .mockImplementation()
            .mockName('console.error'),
    },
};

describe('tracer', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should do console logging', async () => {
        tracer.loggers.set([{
            levels: ['fatal', 'error', 'warning', 'info', 'debug', 'trace', 'access'],
            type: 'console',
            format: 'text',
        }]);

        tracer.log('info', 'message_0');
        tracer.access('message_1');
        tracer.trace('message_2');
        tracer.debug('message_3');
        tracer.info('message_4');
        tracer.warn('message_5');
        tracer.error('message_6');
        tracer.fatal('message_7');

        expect(spy.console.log).toBeCalledTimes(3);
        expect(spy.console.debug).toBeCalledTimes(1);
        expect(spy.console.info).toBeCalledTimes(2);
        expect(spy.console.warn).toBeCalledTimes(1);
        expect(spy.console.error).toBeCalledTimes(1);
        expect(spy.fs.mkdir).not.toBeCalled();
        expect(spy.fs.appendFile).not.toBeCalled();

        expect(spy.console.info.mock.calls[0][0]).toMatch(/[0-9 :.-]+\|INFO: message_0/i);
        expect(spy.console.log.mock.calls[0][0]).toMatch(/[0-9 :.-]+\|ACCESS: message_1/i);
        expect(spy.console.log.mock.calls[1][0]).toMatch(/[0-9 :.-]+\|TRACE: message_2/i);
        expect(spy.console.debug.mock.calls[0][0]).toMatch(/[0-9 :.-]+\|DEBUG: message_3/i);
        expect(spy.console.info.mock.calls[1][0]).toMatch(/[0-9 :.-]+\|INFO: message_4/i);
        expect(spy.console.warn.mock.calls[0][0]).toMatch(/[0-9 :.-]+\|WARNING: message_5/i);
        expect(spy.console.error.mock.calls[0][0]).toMatch(/[0-9 :.-]+\|ERROR: message_6/i);
        expect(spy.console.log.mock.calls[2][0]).toMatch(/[0-9 :.-]+\|FATAL: message_7/i);
    });

    it('should do file logging', async () => {
        tracer.loggers.set([{
            levels: ['fatal', 'error', 'warning', 'info', 'debug', 'trace', 'access'],
            type: 'file',
            format: 'text',
            path: 'test.log',
        }]);

        tracer.log('info', 'message_0');
        tracer.access('message_1');
        tracer.trace('message_2');
        tracer.debug('message_3');
        tracer.info('message_4');
        tracer.warn('message_5');
        tracer.error('message_6');
        tracer.fatal('message_7');

        expect(spy.fs.mkdir).toBeCalled();
        expect(spy.fs.appendFile).toBeCalledTimes(8);
        expect(spy.console.log).not.toBeCalled();
        expect(spy.console.debug).not.toBeCalled();
        expect(spy.console.info).not.toBeCalled();
        expect(spy.console.warn).not.toBeCalled();
        expect(spy.console.error).not.toBeCalled();

        expect(spy.fs.appendFile).toBeCalledWith('test.log', expect.anything(), 'utf8', expect.anything());
        expect(spy.fs.appendFile.mock.calls[0][1]).toMatch(/[0-9 :.-]+\|INFO: message_0/i);
        expect(spy.fs.appendFile.mock.calls[1][1]).toMatch(/[0-9 :.-]+\|ACCESS: message_1/i);
        expect(spy.fs.appendFile.mock.calls[2][1]).toMatch(/[0-9 :.-]+\|TRACE: message_2/i);
        expect(spy.fs.appendFile.mock.calls[3][1]).toMatch(/[0-9 :.-]+\|DEBUG: message_3/i);
        expect(spy.fs.appendFile.mock.calls[4][1]).toMatch(/[0-9 :.-]+\|INFO: message_4/i);
        expect(spy.fs.appendFile.mock.calls[5][1]).toMatch(/[0-9 :.-]+\|WARNING: message_5/i);
        expect(spy.fs.appendFile.mock.calls[6][1]).toMatch(/[0-9 :.-]+\|ERROR: message_6/i);
        expect(spy.fs.appendFile.mock.calls[7][1]).toMatch(/[0-9 :.-]+\|FATAL: message_7/i);
    });

    it('should filter logs based on log level setting', async () => {
        tracer.loggers.set([{
            levels: ['error', 'debug'],
            type: 'console',
            format: 'text',
        }]);

        tracer.trace('message_1');
        tracer.debug('message_2');
        tracer.info('message_3');
        tracer.warn('message_4');
        tracer.error('message_5');
        tracer.fatal('message_6');

        expect(spy.console.log).not.toBeCalled();
        expect(spy.console.debug).toBeCalledTimes(1);
        expect(spy.console.info).not.toBeCalled();
        expect(spy.console.warn).not.toBeCalled();
        expect(spy.console.error).toBeCalledTimes(1);
    });

    it('should be able to log in JSON format (raw)', async () => {
        tracer.loggers.set([{
            levels: ['info'],
            type: 'console',
            format: 'json.raw',
        }]);

        tracer.info('message_1', {});

        const log = JSON.parse(spy.console.info.mock.calls[0][0]);
        expect(log).toEqual(expect.objectContaining({
            timestamp: expect.any(Number),
            date: expect.any(String),
            level: 'info',
            message: 'message_1',
        }));
    });

    it('should be able to log in JSON format (pretty)', async () => {
        tracer.loggers.set([{
            levels: ['info'],
            type: 'console',
            format: 'json.pretty',
        }]);

        tracer.info('message_1', {});

        expect(spy.console.info.mock.calls[0][0]).toMatch(/\n\s/);
        const log = JSON.parse(spy.console.info.mock.calls[0][0]);
        expect(log).toEqual(expect.objectContaining({
            timestamp: expect.any(Number),
            date: expect.any(String),
            level: 'info',
            message: 'message_1',
        }));
    });

    it('should add the log timestamp', async () => {
        tracer.loggers.set([{
            levels: ['info'],
            type: 'console',
            format: 'json.raw',
        }]);

        const before = Date.now();
        tracer.info('message_2');
        const after = Date.now();

        const log = JSON.parse(spy.console.info.mock.calls[0][0]);
        expect(log.timestamp).toBeWithinRange(before, after);
    });

    it('should log metadata', async () => {
        tracer.loggers.set([{
            levels: ['info'],
            type: 'console',
            format: 'json.raw',
        }]);

        tracer.info('unexpected info', { foo: 'bar' });
        const log = JSON.parse(spy.console.info.mock.calls[0][0]);
        expect(log).toEqual(expect.objectContaining({ foo: 'bar' }));
    });
});
