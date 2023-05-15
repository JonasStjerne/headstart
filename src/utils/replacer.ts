import fs from "fs";
import { Path } from "typescript";
export const replace = (
  filename: Path,
  replacements: string,
  matcher: string | RegExp
) => {
  return new Promise<void>(function (resolve) {
    fs.readFile(filename, "utf-8", function (err, data) {
      let regex;
      if (err) {
        throw err;
      }
      if (typeof matcher === "string") {
        regex = new RegExp(matcher, "g");
        data = data.replace(regex, replacements);
      } else {
        regex = new RegExp(
          "(" + matcher.source + ")",
          "g" +
            (matcher.ignoreCase ? "i" : "") +
            (matcher.multiline ? "m" : "") +
            (matcher.sticky ? "y" : "")
        );

        data = data.replace(regex, replacements);
      }
      fs.writeFile(filename, data, "utf-8", function (err) {
        if (err) {
          throw err;
        } else {
          resolve();
        }
      });
    });
  });
};
