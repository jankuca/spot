import { Command, flags } from "@oclif/command";
import { lint } from "../../../lib/src/linting/linter";
import { safeParse } from "../common/safe-parse";

const ARG_API = "spot_contract";

/**
 * oclif command to lint a spot contract
 */
export default class Lint extends Command {
  static description = "Lint a Spot contract";

  static examples = ["$ spot lint api.ts"];

  static args = [
    {
      name: ARG_API,
      required: true,
      description: "path to Spot contract",
      hidden: false
    }
  ];

  static flags = {
    help: flags.help({ char: "h" })
  };

  async run() {
    const { args } = this.parse(Lint);
    const contractPath = args[ARG_API];
    const parsedContract = safeParse.call(this, contractPath).source;
    // TODO: Make it possible to specify with a config file which lint rules to enable.
    const lintingErrors = lint(parsedContract);
    lintingErrors.forEach(error => {
      this.error(
        `${error.source.location}#${error.source.line}: ${error.message}`
      );
    });
  }
}