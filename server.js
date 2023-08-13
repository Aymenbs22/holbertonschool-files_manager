const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;
const indexRoutes = require('./routes/index');

app.use('/', indexRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
