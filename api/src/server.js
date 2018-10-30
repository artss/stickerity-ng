import restify from 'restify';

const server = restify.createServer();

server.get('/api', (req, res) => {
  res.json({ test: 2 });
});

server.listen(process.env.PORT || 5001, () => {
  console.log('%s listening at %s', server.name, server.url);
});
