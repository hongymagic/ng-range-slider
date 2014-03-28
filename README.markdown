## CQ5 localisation directive – `cba-cmx`

**Current version**: 0.0.28

**Maintainers**:

- David Hong
- Brett Baldwin
- Ravi Chotalia

This is a CQ5 localisation (resources) mock handler. Idea is to remove static
strings from views and use angular directives instead. And since CQ5 is not
ready for consumption, this module allows developers to use static JSON file
to specify and mock CQ5 localisation.

### Install

Use bower to install:

```
> bower install ssh://git@stash.dev.cba:7999/bow/cba-angular-cmx.git
```

### Usage

Single line configuration depending on how you want to retrieve the CMX
resource file:

#### Using HTTP endpoint (URL)

```
angular
.module('my-app', ['cba-cmx'])
.run(function (localisation) {
	localisation.load('api/cmx');
});
```

#### Using bootstrapping method

```
window.cmx = { ... };

angular
.module('my-app', ['cba-cmx'])
.run(function ($window, localisation) {
	localisation.set($window.cmx);
});
```

#### Localisation Service

If you wish to use custom binder like `bindonce` use `localisation` service directly:

```
angular
.module('my-app')
.controller('HomeController', function ($scope, localisation) {
	$scope.content = localisation.get('home');
});
```

And in **HTML**:

```
<label data-bindonce="content.title"></label>
```

#### Controller

If you wish to use the directive, make sure you give your controller a `$$name`:

```
angular
.module('my-app')
.controller('MyController', function ($scope) {
	$scope.$$name = 'Home';
});
```

#### Directives

Then, you simply include directives in your view:

```
<dl>
	<dt data-cmx="help-label"></dt>
	<dd data-cmx="help-text"></dd>
</dl>
```

#### Prepend mode

Simply add `data-insert="before"` to prepend CMX resource:

```
<label data-cmx="amount-label" data-insert="before"><input type="checkbox"></label>
```

becomes

```
<label>Amount: <input type="checkbox"></label>
```

#### Append mode

Simply add `data-insert="after"` to append CMX resource:

```
<label data-cmx="interest-postfix" data-insert="after"><input type="checkbox"></label>
```

becomes

```
<label><input type="checkbox">% p.a</label>
```

#### Setting `input[value]` attribute

```
<input data-cmx-value="key">
```

becomes

```
<input value="value">
```

#### Setting _any_ attribute

```
<img data-cmx="logo" data-cmx-attr="href">
```

becomes

```
<img href="http://google.com/logo.png">
```

### DEMO

```
> node demo
```

And enjoy the magic carpet ride.

### Contribute

Pick one of the items from `TODO` section then:

1. Fork
2. Branch
3. Edit code
4. Write tests
5. Make sure JSHint passes
6. Make sure whitespacing is correct
7. Send a pull-request

#### Running it on developer machine

```
> npm install
> bower install
> grunt
```

### TODO

- [X] Should be able to replace innerHTML

```
data-cmx="key"
```

- [X] Should be able to prepend

```
data-insert="before"
```

- [X] Should be able to append

```
data-insert="after"
```

- [X] Should be able to populate [value]

```
data-cmx-value="key"
```

- [X] Should be able to populate an attribute

```
data-cmx-attr="value" data-cmx="key"
```

- [ ] Should be able to use element <cmx />

```
<cmx>key</cmx>
```

- [ ] Should be able to use angular expressions

```
// Given
$scope.amount = 3000;

// When
data-cmx="key" // where key is: "Your monthly repayment is {{ amount | current: 'AUD$' }} per month"

// Then
"Your monthly repayment is 3000 per month"
```

- [-] Set of examples

```
See /demo directory
```

- [ ] Need to verify data structure with CQ5 JSON format

### Wish

- I wish Stash interface was half as nice as Github
