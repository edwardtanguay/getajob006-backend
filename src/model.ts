import fs from 'fs';
import * as model from './model.js';
import { Job, Skill, nullObjectSkill, TotaledSkill, Todo } from './types.js';

const _jobs: Job[] = JSON.parse(fs.readFileSync('./src/data/jobs.json', 'utf8'));
const skillInfos: any = JSON.parse(fs.readFileSync('./src/data/skillInfos.json', 'utf8'));

export const getApiInstructionsHtml = () => {
	return `
<style>
a, h1 {
	background-color: #ddd;
	font-family: courier;
}
</style>
<h1>GETAJOB API</h1>	
<ul>
	<li><a href="jobs">/jobs</a> - array of job listings will all fields</li>
	<li><a href="todos">/todos</a> - array of todos with todo/company/title fields</li>
	<li><a href="totaledSkills">/totaledSkills</a> - array of skills with totals how often they occur in job listings</li>
</ul>
	`;
}

export const getJobs = (): Job[] => {
	const jobs: Job[] = [];
	_jobs.forEach(_job => {
		const job = {
			..._job,
			skills: model.getSkillsWithList(_job.skillList)
		}
		jobs.push(job);
	})
	return jobs;
}

export const getTodos = (): Todo[] => {
	return _jobs.map((job: Job) => {
		return {
			todoText: job.todo,
			company: job.company,
			title: job.title,
			url: job.url
		}
	});
}

export const getTotaledSkills = () => {
	const totaledSkills: TotaledSkill[] = [];
	model.getJobs().forEach(job => {
		job.skills.forEach(skill => {
			const existingTotaledSkill = totaledSkills.find(totaledSkill => totaledSkill.skill.idCode === skill.idCode);
			if (!existingTotaledSkill) {
				totaledSkills.push({
					skill,
					total: 1
				});
			} else {
				existingTotaledSkill.total++;
			}
		});
	})
	return totaledSkills;
}

export const getSkillsWithList = (skillList: string) => {
	const skills: Skill[] = [];
	const skillIdCodes = skillList.split(',').map(m => m.trim());
	skillIdCodes.forEach(skillIdCode => {
		const skill: Skill = model.lookupSkill(skillIdCode);
		skills.push(skill);
	});
	return skills;
}

export const lookupSkill = (idCode: string): Skill => {
	const _skill = skillInfos[idCode];
	if (_skill === undefined) {
		return {
			...nullObjectSkill,
			idCode
		}
	} else {
		return {
			..._skill,
			idCode,
		}
	}
} 