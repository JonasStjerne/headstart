import fs from "fs";
export const insert = ({
	filename,
	insert,
	matcher,
	direction = "after",
}: {
	filename: string;
	insert: string;
	matcher: string;
	direction: "before" | "after";
}) => {
	return new Promise<void>(function (resolve) {
		fs.readFile(filename, "utf-8", function (err, data) {
			if (err) {
				throw err;
			}
			let regex = new RegExp(matcher, "g");
			if (direction === "before") {
				data = data.replace(regex, `\n${insert} $&`);
			}
			if (direction === "after") {
				data = data.replace(regex, `$& \n${insert}`);
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
