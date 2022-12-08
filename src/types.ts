export type Job = {
	id: number;
	title: string;
	company: string;
	url: string;
	description: string;
	skillList: string;
	skills: Skill[];
	todo: string;
}

export type Skill = {
	idCode: string;
	name: string;
	url: string;
	description: string;
}

export type Todo = {
	todoText: string;
	company: string;
	title: string;
	url: string;
}

export type TotaledSkill = {
	skill: Skill;
	total: number;
}

export const nullObjectSkill: Skill = {
	idCode: '',
	name: '',
	url: '',
	description: ''
}
