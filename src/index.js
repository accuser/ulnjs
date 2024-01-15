/*
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
 */

import util from "node:util";

/**
 * Regular expression for validating a ULN value.
 * 
 * @private
 * @constant
 */
const ULN_REGEX = /^(?<digits>[0-9]{9})(?<checkDigit>[0-9]{1})$/;

/**
 * Private token for the ULN constructor.
 * 
 * @private
 * @constant
 */
const privateToken = Symbol("privateToken");

/**
 * Calculates the sum of the ULN digits based on the specified formula.
 * 
 * @param {string} digits the digits of the ULN value
 * @returns {number} the sum of the ULN digits
 */
const calculateSum = (digits) => {
    let sum = 0;

    for (let i = 0; i < digits.length; i++) {
        sum += (10 - i) * parseInt(digits.charAt(i));
    }

    return sum;
}

/**
 * Represents a 10-digit Unique Learner Number (ULN).
 * 
 * @see <a href=
 *      "https://www.gov.uk/education/learning-records-service-lrs">Learning
 *      Records Service</a>
 */
export class ULN {
    /**
     * Creates a new ULN object from the specified value.
     * 
     * @param {string} value 
     * @returns {ULN} a new ULN object
     */
    static fromString(value) {
        return new ULN(privateToken, this.requireValidULN(value));
    }

    /**
     * Returns `true` if the specified ULN value is a valid ULN value.
     * 
     * @param {string} value 
     * @returns {boolean} `true` if the specified ULN value is a valid ULN value
     */
    static isValidULN(value) {
        const match = value.match(ULN_REGEX);

        if (!match) {
            throw new Error("Invalid ULN format");
        }

        const digits = match.groups.digits;
        const checkDigit = parseInt(match.groups.checkDigit.charAt(0));

        const remainder = calculateSum(digits) % 11;

        if (remainder === 0) {
            return false;
        }

        return (10 - remainder === checkDigit);
    }

    /**
     * Validates a ULN.
     * 
     * @overload
     * @param {ULN} uln the ULN object to validate
     * @returns {ULN} the validated ULN object
     * @throws {Error} if the specified ULN object is `null` or `undefined`
     * 
     * @overload
     * @param {string} value the ULN value to validate
     * @returns {string} the validated ULN value
     * @throws {Error} if the specified ULN value is not a valid ULN value
     */
    static requireValidULN(uln_or_value) {
        if (uln_or_value === null || uln_or_value === undefined) {
            throw new Error("`uln` cannot be null");
        }

        if (uln_or_value instanceof ULN) {
            // do nothing
        } else if (typeof uln_or_value === "string" && this.isValidULN(uln_or_value)) {
            // do nothing
        } else if (typeof uln_or_value === "string") {
            throw new Error("`value` is not a valid ULN value");
        } else {
            throw new Error("`uln` must be an instance of ULN");
        }

        return uln_or_value;
    }

    #value;

    /**
     * Do not use this constructor directly. Use `ULN.fromString()` instead.
     * 
     * @overload
     * @private
     * @hideconstructor
     */
    constructor(token, value) {
        if (token !== privateToken) {
            throw new Error("ULN objects cannot be constructed directly. Use `ULN.fromString()` instead.");
        }

        this.#value = value;
    }

    /**
     * Checks if this ULN is equal to the specified ULN.
     * 
     * @param {ULN} other 
     * @returns {boolean} `true` if the specified ULN object is equal to this ULN
     */
    equals(other) {
        if (this === other) {
            return true;
        }

        return (other instanceof ULN) && (this.#value === other.#value);
    }

    /**
     * Returns the ULN value as a formatted string.
     * 
     * @returns {string} the ULN value as a formatted string
     */
    toString() {
        return this.constructor.name + "(" + this.#value + ")";
    }

    /**
     * Node.js inspect() implementation.
     * 
     * @private
     * @see https://nodejs.org/api/util.html#util_custom_inspection_functions_on_objects
     */
    [util.inspect.custom](depth, inspectOptions, inspect) {
        return this.toString();
    }
}
