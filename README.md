[![Build Status](https://travis-ci.org/mumuki/mumuki-gobstones-server.svg?branch=master)](https://travis-ci.org/mumuki/mumuki-gobstones-server)
[![Code Climate](https://codeclimate.com/github/mumuki/mumuki-gobstones-server/badges/gpa.svg)](https://codeclimate.com/github/mumuki/mumuki-gobstones-server)
[![Test Coverage](https://codeclimate.com/github/mumuki/mumuki-gobstones-server/badges/coverage.svg)](https://codeclimate.com/github/mumuki/mumuki-gobstones-server)

# Install the server

## Clone the project

```
git clone https://github.com/mumuki/mumuki-gobstones-runner 
cd mumuki-gobstones-runner
```

## Install Ruby

```bash
rbenv install 2.0.0-p481
rbenv rehash
gem install bundler
```

## Install Dependencies

```bash
bundle install
```

# Run the server

```bash
RACK_ENV=development bundle exec rackup -p 4567
```



