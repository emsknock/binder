import yargs from "yargs";

const { argv } = yargs(process.argv.slice(2))
    .usage("Usage: $0 <compress|inflate> -i <path> -o <path>")
    .command("compress", "compress a file")
    .command("inflate", "inflate a file")
    .demandCommand(1, "Must call either compress or inflate")
    .options({
        i: { type: "string", demandOption: true, describe: "input file" },
        o: { type: "string", demandOption: true, describe: "output file" }
    });

const { i, o } = argv;
const [command] = argv._;

switch(command) {
    case "compress": break;
    case "inflate": break;
    default:
        console.error(`Unrecognised command: ${command}, only "compress" or "inflate" allowed`);
        process.exit(1);
}