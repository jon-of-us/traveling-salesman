// Import necessary modules and types
import { Edges, neighborMap, neighbors, isClosedLoop } from "./edges"; // Adjust the path accordingly
import { describe, it, assert } from "vitest";

describe("test", () => {
    it("should pass", () => {
        assert.equal(1, 1);
    });
});

// Define test cases
describe("Edges", () => {
    it("should add edges correctly", () => {
        const edges = new Edges();
        edges.add([1, 2]);
        edges.add([2, 3]);
        edges.add([3, 1]);
        edges.add([4, 5]);
        edges.add([5, 6]);
        edges.add([6, 4]);
        edges.delete([6, 4]);
        edges.delete([5, 6]);

        assert.equal(edges.count(), 4);
        assert.isTrue(edges.has([1, 2]));
        assert.isTrue(edges.has([2, 3]));
        assert.isTrue(edges.has([3, 1]));
        assert.isTrue(edges.has([4, 5]));
        assert.isFalse(edges.has([5, 6]));
        assert.isFalse(edges.has([6, 4]));
    });

    it("should not allow self-loops", () => {
        const edges = new Edges();

        assert.throw(() => edges.add([1, 1]), /self loop not allowed/);
    });

    // Add more test cases as needed
});

describe("neighborMap", () => {
    it("should create a valid neighbor map", () => {
        const edges = new Edges();
        edges.add([1, 2]);
        edges.add([2, 3]);

        const map = neighborMap(edges);

        assert.isTrue(map.has(1));
        assert.isTrue(map.has(2));
        assert.isTrue(map.has(3));

        assert.equal(map.get(1)!.size, 1);
        assert.equal(map.get(2)!.size, 2);
        assert.equal(map.get(3)!.size, 1);

        // Add more assertions as needed
    });

    // Add more test cases as needed
});

describe("neighbors", () => {
    it("should return correct neighbors", () => {
        const edges = new Edges();
        edges.add([1, 2]);
        edges.add([2, 3]);

        const result = neighbors(edges, 2);

        assert.equal(result.size, 2);
        assert.isTrue(result.has(1));
        assert.isTrue(result.has(3));

        // Add more assertions as needed
    });

    // Add more test cases as needed
});

describe("isClosedLoop", () => {
    it("should return true for a closed loop", () => {
        const edges = new Edges();
        edges.add([1, 2]);
        edges.add([2, 3]);
        edges.add([3, 1]);

        assert.isTrue(isClosedLoop(edges));
    });

    it("should return false for an open loop", () => {
        const edges = new Edges();
        edges.add([1, 2]);
        edges.add([2, 3]);

        assert.isFalse(isClosedLoop(edges));
    });

    // Add more test cases as needed
});
