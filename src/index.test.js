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

import assert from 'node:assert';
import { describe, it } from 'node:test';

import { ULN } from './index.js';

describe('ULN', () => {
    describe('fromString', () => {
        it('should create a ULN object from a valid ULN string', () => {
            const uln = ULN.fromString("0000000042");
            assert(uln instanceof ULN);
            assert.strictEqual(uln.toString(), 'ULN(0000000042)');
        });

        it('should throw an error for an invalid ULN string', () => {
            assert.throws(() => ULN.fromString("0000000043"));
        });
    });

    describe('isValidULN', () => {
        it('should return true for a valid ULN string', () => {
            assert(ULN.isValidULN("0000000042"));
        });

        it('should return false for an invalid ULN string', () => {
            assert(!ULN.isValidULN("0000000043"));
        });
    });

    describe('requireValidULN', () => {
        it('should return the ULN object if it is valid', () => {
            const uln = ULN.fromString("0000000042");
            assert.strictEqual(ULN.requireValidULN(uln), uln);
        });

        it('should return the ULN string if it is valid', () => {
            const value = '0000000042';
            assert.strictEqual(ULN.requireValidULN(value), value);
        });

        it('should throw an error if the ULN object is null', () => {
            assert.throws(() => ULN.requireValidULN(null));
        });

        it('should throw an error if the ULN object is undefined', () => {
            assert.throws(() => ULN.requireValidULN(undefined));
        });

        it('should throw an error if the ULN string is not a valid ULN', () => {
            assert.throws(() => ULN.requireValidULN("0000000043"));
        });

        it('should throw an error if the value is not a ULN object or string', () => {
            assert.throws(() => ULN.requireValidULN(42));
        });
    });

    describe('equals', () => {
        it('should return true if two ULN objects have the same value', () => {
            const uln1 = ULN.fromString("0000000042");
            const uln2 = ULN.fromString("0000000042");
            assert(uln1.equals(uln2));
            assert(uln2.equals(uln1));
        });

        it('should return false if two ULN objects have different values', () => {
            const uln1 = ULN.fromString("0000000034");
            const uln2 = ULN.fromString("0000000042");
            assert(!uln1.equals(uln2));
            assert(!uln2.equals(uln1));
        });

        it('should return false if comparing a ULN object with a non-ULN object', () => {
            const uln1 = ULN.fromString("0000000042");
            const uln2 = { value: "0000000042" };
            assert(!uln1.equals(uln2));
        });
    });

    describe('toString', () => {
        it('should return the string representation of the ULN object', () => {
            const uln1 = ULN.fromString("0000000042");
            assert.strictEqual(uln1.toString(), 'ULN(0000000042)');
        });
    });
});