import { withFullScreen } from "fullscreen-ink";
import { App } from "./App";

export class Main {
  public static async bootstrap() {
    await withFullScreen(<App />).start();
  }
}
