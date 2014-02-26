# {%= name %}

{%= description %}

## Getting Started
Install {%= name %} with: `npm install -g {%= name %}` or clone repo [https://github.com/{%= git_user %}/{%= git_repo %}](https://github.com/{%= git_user %}/{%= git_repo %}).

```bash
$ git clone https://github.com/{%= git_user %}/{%= git_repo %}
$ cd {%= name %}
$ npm install
```

Run {%= name %} using:

```bash
$ {%= name %}
```

Or if you have cloned the repo:

```bash
$ node src/app.js
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}  
Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
