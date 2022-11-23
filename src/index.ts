import { daniuExec } from "./scripts/daniu";
import { initAllDir } from "./utils";

const execMain = {
  daniuExec,
};

!(async function () {
  initAllDir();
  await execMain.daniuExec();
})();
