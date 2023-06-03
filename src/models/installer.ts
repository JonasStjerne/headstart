export type installer = {
	name: string;
	category: installerCatagories;
	install: () => Promise<void>;
};

export enum installerCatagories {
	"Logging & Analytics",
	"Visuals",
	"Security",
	"Other",
}
