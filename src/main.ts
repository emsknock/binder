import yargs from "yargs";
import { doProcessing } from "./io";

const { argv } = yargs(process.argv.slice(2))
    .usage("Usage: $0 <compress|inflate> -i <path> -o <path>")
    .command("compress", "compress a file")
    .command("inflate", "inflate a file")
    .demandCommand(1, "Must call either compress or inflate")
    .options({
        i: { type: "string", demandOption: true, describe: "input file" },
        o: { type: "string", demandOption: true, describe: "output file" },
        huf: { type: "boolean", describe: "force huffman" },
        lzw: { type: "boolean", describe: "force lzw" },
        timed: { type: "boolean", describe: "measure and print time taken" }
    });

const [command] = argv._;

switch (command) {
    case "compress":
    case "inflate":
        doProcessing(argv);
        break;
    default:
        console.error(`Unrecognised command: ${command}, only "compress" or "inflate" allowed`);
        process.exit(1);
}

export type Argv = typeof argv;