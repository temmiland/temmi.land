/**
 * Copyright (C) 2024 Temmi Pietsch - All Rights Reserved
 *
 * You may not use, distribute or modify this code without the explicitly
 * permission of the author.
 */

import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import Footer from '../../layouts/Footer';
import SkillGrid from '../../widgets/SkillGrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '../../components/util/Typography';
import Header from '../../layouts/Header';
import Trail from '../../components/util/Trail';
import Filter from '../../components/util/Filter';
import { SkillCategory } from '../../../models/skillcategory.d';
import { skills } from '../../../data/skills';
import { downloadFile, skillsToCsv, skillsToJson } from '../../../utils/skillExport';
import { DEFAULT_SKILL_SORT, SKILL_SORT_LABELS, SkillSortOption } from '../../../utils/skillSort';

const SKILL_SORT_OPTIONS = Object.keys(SKILL_SORT_LABELS) as SkillSortOption[];

const HeaderSection = styled.section`
	margin: 0;
	padding: 0;
`;

const SkillSection = styled.section`
	margin: 0;
	padding: 3.6vw 6vw 16vw 6vw;
	position: relative;
	background: #141414;
	display: grid;

	@media (min-width: 320px) and (max-width: 600px) {
		padding: 22.6vw 0vw 60vw 0vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		padding: 15vw 0vw 65vw 0vw;
	}

	.skill-content {
		@media (min-width: 2000px) {
			margin: 0 auto;
		}
	}

	.skill-header {
		margin: 3.5vw 6.5vw;
	}
`;

const skillCategoryOptions = Object.values(SkillCategory).map((category) => ({
	value: category,
	label: category
}));

const FooterSection = styled.section`
	padding: 2.4vw 0;

	@media (min-width: 320px) and (max-width: 600px) {
		padding: 12vw 0;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		padding: 5vw 0;
	}

	@media (min-width: 2000px) {
		padding: 48px 0;
	}
`;

const PageGradient = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 400;
	bottom: 0;
	pointer-events: none;

	@media (min-width: 2000px) {
		background: linear-gradient(
				90deg,
				rgba(0, 0, 0, 1) 250px,
				rgba(0, 0, 0, 0) 750px,
				rgba(0, 0, 0, 0) 2750px,
				rgba(0, 0, 0, 1) 3250px
			)
			no-repeat;
		background-attachment: fixed;
		background-size: 3500px 100%;
		background-position: center;
		min-height: 100%;
		min-width: 3250px;
		margin: 0;
	}
`;

const PageMountains = styled.div`
	position: relative;
	max-width: 3000px;
	height: 34vw;
	margin-left: auto;
	margin-right: auto;
	z-index: 300;
	background: url(./footer.svg);
	background-repeat: no-repeat;
	pointer-events: none;
	margin-top: -46.25vw;

	@media (min-width: 320px) and (max-width: 600px) {
		background-size: 265vw;
		height: 100vw;
		background-position: right;
		margin-top: -147.5vw;
		margin-right: -20vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		background-size: 265vw;
		height: 100vw;
		background-position: right;
		margin-top: -120vw;
		margin-right: -20vw;
	}

	@media (min-width: 2000px) {
		background-size: cover;
		height: 1000px;
		margin-top: -1230px;
		background-position: center;
	}
`;

const FilterExportRow = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	grid-template-areas:
		'chips controls'
		'search controls';
	align-items: start;

	@media (min-width: 320px) and (max-width: 600px) {
		grid-template-columns: 1fr;
		grid-template-areas:
			'chips'
			'controls'
			'search';
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		grid-template-columns: 1fr;
		grid-template-areas:
			'chips'
			'controls'
			'search';
	}
`;

const FilterCol = styled.div`
	grid-area: chips;
`;

const SearchRow = styled.div`
	grid-area: search;
	padding: 0 6.5vw;
	margin: 0 0 1vw 0;

	@media (min-width: 320px) and (max-width: 600px) {
		margin: 0 0 3vw 0;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		margin: 0 0 2vw 0;
	}
`;

const SearchInputWrapper = styled.div`
	position: relative;
	max-width: 39vw;

	svg {
		position: absolute;
		top: 50%;
		left: 1vw;
		transform: translateY(-50%);
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.9vw;
		pointer-events: none;
	}

	input {
		box-sizing: border-box;
		width: 100%;
		padding: 1.1vw 2.6vw;
		border: 0.075vw solid rgba(255, 255, 255, 0.35);
		border-radius: 2.6vw;
		background: rgba(255, 255, 255, 0.06);
		color: #ffffff;
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		font-size: 0.9vw;
		transition: 100ms linear;

		&::placeholder {
			color: rgba(255, 255, 255, 0.45);
		}

		&:focus {
			outline: none;
			border-color: rgba(255, 255, 255, 0.6);
			background: rgba(255, 255, 255, 0.1);
		}
	}

	.clear-search {
		position: absolute;
		top: 50%;
		right: 0.9vw;
		transform: translateY(-50%);
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.9vw;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;

		&:hover {
			color: #ffffff;
		}
	}

	@media (min-width: 320px) and (max-width: 600px) {
		max-width: 100%;

		svg {
			left: 3.5vw;
			font-size: 3.5vw;
		}

		input {
			padding: 4vw 9vw;
			border: 0.25vw solid rgba(255, 255, 255, 0.35);
			border-radius: 8vw;
			font-size: 3.25vw;
		}

		.clear-search {
			right: 3vw;
			font-size: 3.25vw;
		}
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		max-width: 100%;

		svg {
			left: 1.5vw;
			font-size: 2vw;
		}

		input {
			padding: 1.8vw 4vw;
			border: 0.125vw solid rgba(255, 255, 255, 0.35);
			border-radius: 4vw;
			font-size: 2vw;
		}

		.clear-search {
			right: 1.5vw;
			font-size: 2vw;
		}
	}

	@media (min-width: 2000px) {
		max-width: 780px;

		svg {
			left: 14px;
			font-size: 18px;
		}

		input {
			padding: 20px 38px;
			border: 1px solid rgba(255, 255, 255, 0.35);
			border-radius: 52px;
			font-size: 18px;
		}

		.clear-search {
			right: 12px;
			font-size: 16px;
		}
	}
`;

const ControlsCol = styled.div`
	grid-area: controls;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 0.6vw;
	padding: 0 6.5vw 0 0;
	margin: 1.5vw 0 3vw 0;

	@media (min-width: 320px) and (max-width: 600px) {
		align-items: flex-start;
		gap: 2vw;
		padding: 0 6.5vw;
		margin: 1vw 0 5vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		align-items: flex-start;
		gap: 1vw;
		padding: 0 6.5vw;
		margin: 3vw 0;
	}

	@media (min-width: 2000px) {
		gap: 12px;
		margin: 30px 0 60px 0;
	}
`;

const DropdownMenu = styled.div`
	position: relative;
`;

const DropdownTrigger = styled.button`
	display: inline-flex;
	align-items: center;
	gap: 0.45vw;
	padding: 0.5vw 1.1vw;
	border: 0.075vw solid rgba(255, 255, 255, 0.35);
	border-radius: 1.3vw;
	background: rgba(255, 255, 255, 0.06);
	color: #ffffff;
	cursor: pointer;
	font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
	font-size: 0.9vw;
	transition: 100ms linear;

	&:hover,
	&.open {
		color: #000000;
		background: #ffffff;
	}

	svg {
		font-size: 0.95vw;

		@media (min-width: 320px) and (max-width: 600px) {
			font-size: 3.5vw;
		}

		@media (min-width: 600px) and (max-width: 1024px) {
			font-size: 2vw;
		}

		@media (min-width: 2000px) {
			font-size: 18px;
		}
	}

	.caret {
		transition: transform 120ms ease;
	}

	&.open .caret {
		transform: rotate(180deg);
	}

	@media (min-width: 320px) and (max-width: 600px) {
		gap: 1.5vw;
		padding: 1.5vw 3.5vw;
		border: 0.25vw solid rgba(255, 255, 255, 0.35);
		border-radius: 4vw;
		font-size: 3.25vw;
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		gap: 1vw;
		padding: 0.75vw 1.5vw;
		border: 0.125vw solid rgba(255, 255, 255, 0.35);
		border-radius: 2vw;
		font-size: 2vw;
	}

	@media (min-width: 2000px) {
		gap: 9px;
		padding: 10px 22px;
		border: 1px solid rgba(255, 255, 255, 0.35);
		border-radius: 26px;
		font-size: 18px;
	}
`;

const DropdownPanel = styled.div`
	position: absolute;
	top: calc(100% + 0.5vw);
	right: 0;
	z-index: 10;
	display: flex;
	flex-direction: column;
	gap: 0.2vw;
	min-width: 11vw;
	padding: 0.35vw;
	background: linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%);
	border: 0.07vw solid rgba(255, 255, 255, 0.16);
	border-radius: 0.7vw;
	backdrop-filter: blur(0.7vw);
	--webkit-backdrop-filter: blur(0.7vw);
	box-shadow: 0 0.5vw 1.5vw rgba(0, 0, 0, 0.35);

	button {
		display: flex;
		align-items: center;
		gap: 0.55vw;
		padding: 0.5vw 0.7vw;
		border: none;
		border-radius: 0.4vw;
		background: transparent;
		color: #ffffff;
		cursor: pointer;
		text-align: left;
		font-family: 'Bogart Medium', system-ui, Avenir, Helvetica, Arial, sans-serif;
		font-size: 0.85vw;
		transition: 100ms linear;

		&:hover {
			background: rgba(255, 255, 255, 0.12);
		}

		&.active {
			background: rgba(255, 255, 255, 0.16);
			color: #80cee1;
		}
	}

	@media (min-width: 320px) and (max-width: 600px) {
		left: 0;
		right: auto;
		min-width: 45vw;
		padding: 1.5vw;
		border-radius: 3.5vw;
		gap: 1vw;

		button {
			padding: 2vw 2.5vw;
			border-radius: 2vw;
			gap: 2vw;
			font-size: 3.25vw;
		}
	}

	@media (min-width: 600px) and (max-width: 1024px) {
		left: 0;
		right: auto;
		min-width: 22vw;
		padding: 0.8vw;
		border-radius: 1.6vw;

		button {
			padding: 0.9vw 1.2vw;
			border-radius: 0.9vw;
			font-size: 2vw;
		}
	}

	@media (min-width: 2000px) {
		min-width: 200px;
		padding: 7px;
		border-radius: 14px;
		gap: 4px;

		button {
			padding: 10px 14px;
			border-radius: 8px;
			font-size: 17px;
		}
	}
`;

export default function Skills() {
	const [categoryToMatch, setCategoryToMatch] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [sortBy, setSortBy] = useState<SkillSortOption>(DEFAULT_SKILL_SORT);
	const [isSortOpen, setIsSortOpen] = useState(false);
	const [isExportOpen, setIsExportOpen] = useState(false);
	const sortMenuRef = useRef<HTMLDivElement>(null);
	const exportMenuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isSortOpen && !isExportOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (!sortMenuRef.current?.contains(event.target as Node)) {
				setIsSortOpen(false);
			}
			if (!exportMenuRef.current?.contains(event.target as Node)) {
				setIsExportOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isSortOpen, isExportOpen]);

	const normalizedSearchQuery = searchQuery.trim().toLowerCase();

	const exportData = skills
		.filter((skill) => !categoryToMatch || skill.category === categoryToMatch)
		.filter((skill) => (
			!normalizedSearchQuery || skill.name.toLowerCase().includes(normalizedSearchQuery)
		));

	const fileSuffix = categoryToMatch
		? `-${categoryToMatch
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '')}`
		: '';

	const handleExportJson = () => {
		downloadFile(`skills${fileSuffix}.json`, skillsToJson(exportData), 'application/json');
		setIsExportOpen(false);
	};

	const handleExportCsv = () => {
		downloadFile(`skills${fileSuffix}.csv`, skillsToCsv(exportData), 'text/csv');
		setIsExportOpen(false);
	};

	return (
		<>
			<HeaderSection>
				<Header animationDirection={ 'left' } />
			</HeaderSection>
			<SkillSection>
				<div className={ 'skill-content' }>
					<Trail
						animationDirection={ 'left' }
						animationSpeed={ 50 }
					>
						<div className={ 'skill-header' }>
							<Typography variant={ 'h1' }>
								{ 'Skills' }
								<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'star'] } />
								<FontAwesomeIcon
									className={ 'h-icon' }
									icon={ ['fas', 'wand-magic-sparkles'] }
								/>
								<FontAwesomeIcon className={ 'h-icon' } icon={ ['fas', 'code'] } />
							</Typography>
						</div>
					</Trail>
					<Trail
						animationDirection={ 'left' }
						animationSpeed={ 50 }
						animationDelay={ 175 }
					>
						<FilterExportRow>
							<FilterCol>
								<Filter
									options={ skillCategoryOptions }
									activeValue={ categoryToMatch }
									onChange={ setCategoryToMatch }
								/>
							</FilterCol>
							<ControlsCol>
								<DropdownMenu ref={ exportMenuRef }>
									<DropdownTrigger
										className={ isExportOpen ? 'open' : '' }
										onClick={ () => setIsExportOpen(!isExportOpen) }
									>
										<FontAwesomeIcon icon={ ['fas', 'file-export'] } />
										{ 'Export' }
										<FontAwesomeIcon
											className={ 'caret' }
											icon={ ['fas', 'caret-down'] }
										/>
									</DropdownTrigger>
									{ isExportOpen ? (
										<DropdownPanel>
											<button onClick={ handleExportJson }>
												<FontAwesomeIcon icon={ ['fas', 'file-code'] } />
												{ 'Export JSON' }
											</button>
											<button onClick={ handleExportCsv }>
												<FontAwesomeIcon icon={ ['fas', 'file-csv'] } />
												{ 'Export CSV' }
											</button>
										</DropdownPanel>
									) : null }
								</DropdownMenu>
								<DropdownMenu ref={ sortMenuRef }>
									<DropdownTrigger
										className={ isSortOpen ? 'open' : '' }
										onClick={ () => setIsSortOpen(!isSortOpen) }
									>
										<FontAwesomeIcon icon={ ['fas', 'arrow-down-wide-short'] } />
										{ `Sort: ${SKILL_SORT_LABELS[sortBy]}` }
										<FontAwesomeIcon
											className={ 'caret' }
											icon={ ['fas', 'caret-down'] }
										/>
									</DropdownTrigger>
									{ isSortOpen ? (
										<DropdownPanel>
											{ SKILL_SORT_OPTIONS.map((option) => (
												<button
													key={ option }
													className={ option === sortBy ? 'active' : '' }
													onClick={ () => {
														setSortBy(option);
														setIsSortOpen(false);
													} }
												>
													{ SKILL_SORT_LABELS[option] }
												</button>
											)) }
										</DropdownPanel>
									) : null }
								</DropdownMenu>
							</ControlsCol>
							<SearchRow>
								<SearchInputWrapper>
									<FontAwesomeIcon icon={ ['fas', 'magnifying-glass'] } />
									<input
										type={ 'text' }
										value={ searchQuery }
										placeholder={ 'Search skills…' }
										onChange={ (event) => setSearchQuery(event.target.value) }
									/>
									{ searchQuery ? (
										<button
											type={ 'button' }
											className={ 'clear-search' }
											onClick={ () => setSearchQuery('') }
										>
											<FontAwesomeIcon icon={ ['fas', 'xmark'] } />
										</button>
									) : null }
								</SearchInputWrapper>
							</SearchRow>
						</FilterExportRow>
						<SkillGrid
							categoryToMatch={ categoryToMatch }
							sortBy={ sortBy }
							searchQuery={ searchQuery }
						/>
					</Trail>
				</div>
			</SkillSection>
			<FooterSection>
				<Footer />
			</FooterSection>
			<PageGradient />
			<PageMountains />
		</>
	);
}
