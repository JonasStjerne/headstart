export type installer = {
	name: string;
	category: installerCatagories;
	install: (dir: string) => Promise<void>;
};

export enum installerCatagories {
	"Logging & Analytics",
	"Visuals",
}
