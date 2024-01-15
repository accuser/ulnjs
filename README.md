# Uniqu Learner Number

A Unique Learner Number (ULN) is a unique identifier assigned to learners in the United Kingdom. It is used to track and record an individual's learning and qualifications across different educational institutions and training providers.

## Installation

```sh
npm install @accuser/ulnjs
```

## Examples

Create a new ULN object from a String value:

```js
const uln = ULN.fromString("0000000042");
```

Validate a ULN:

```js
if (!ULN.isValid(uln)) {
    // ...grumble
};
```

Require a valid ULN:

```js
class LearnerRegistrationRequest {
    #uln;

    /**
     * @param {string|ULN} uln
     */
    constructor(uln) {
        // `uln` is not `null` or `undefined`
        // `uln` is a valid ULN value
        this.#uln = ULN.requireValidULN(uln);
    }
}
```

## Testing

To clone the package repo and perform unit tests:

```sh
git clone https://github.com/accuser/ulnjs.git
cd ulnjs
node run test
```

## Contributors

The original author of [`@accuser/ulnjs`](https://github.com/accuser/ulnjs) is [Matthew Gibbons](https://github.com/accuser).

## License

Copyright 2024 Matthew Gibbons

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
