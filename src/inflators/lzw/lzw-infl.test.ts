import { LzwInflator } from ".";

it("inflates small example from compressor test to its original form", () => {

    const comp = Buffer.from("00000101020103000200", "hex");
    const orig = Buffer.from("00000100010100010100000100", "hex");

    const i = new LzwInflator(comp);
    expect(i.inflate()).toEqual(orig);

});