## ReadMe 
#### _Calculator Service_
- It calculates arithmetic expressions and returns the result in the response
- Handles the basic operations, +, -, * and /
- Works with parenthesis in the expression

#### _Requirements_ 
 - `npm` should be installed 
 - Latest code from the `master` branch is available at your machine

### Install NestJS modules
```sh
npm install nestjs
```

### In order to start the service on the local
```sh
npm run start
```
> You should see the service at http://127.0.0.1:3000/<expression>

#### e.g:
- http://127.0.0.1:3000/4/2 will return 2
- http://127.0.0.1:3000/5*2+4-2 will return 12
- http://127.0.0.1:3000/5*2+ will return 'Invalid Expression'

### In order to run the unit tests
```sh
npm run test
```
> There are 26 `unit` test cases which should pass

### In order to run the e2e tests
```sh
npm run test:e2e
```
> There are 5 `e2e` test cases which should pass.

## Versioning

Since the example clearly mentioned the url should be accessible in this manner, 
>localhost:3000/4+2

I didn't implement versioning of the API by adding  `/v1` which would have changed the URL to

>localhost:3000/v1/4+2 

which would've been better in the long run if we want to maintain versioning to support backward compatibility.

##### Owner
Nitun Pachauri