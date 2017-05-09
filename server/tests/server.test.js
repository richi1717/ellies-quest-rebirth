const server = require('../server');
const request = require('supertest');
const indexHTML = require('../../public/index.html');

describe('server', function () {
  let app;

  beforeEach(() => {
    app = server.getApp();
    global.console = { log: jest.fn() };
  });

  test('/ route should give 200 and return the index html', () =>
    request(app)
      .get('/')
      .expect(200, indexHTML())
  );

  test('should call listen with the passed port when starting the server', () => {
    const mockApp = { listen: jest.fn() };
    server.start(3000, mockApp);
    expect(mockApp.listen).toBeCalledWith(3000, expect.anything());
    mockApp.listen.mock.calls[0][1]();
    expect(global.console.log).toHaveBeenCalled();
  });
});